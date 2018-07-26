import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';

export default [
    {
        input: './src/client/index.js',
        output: {
            format: 'umd',
            sourcemap: true,
            file: './dist/client-bundle.js',
        },
        plugins: [
            sourceMaps(),
            nodeResolve({browser: true}),
            commonjs({
                include: 'node_modules/**',
                namedExports: {
                    'node_modules/react/index.js': ['Component', 'cloneElement', 'createElement'],
                    'node_modules/react-is/index.js': ['isValidElementType'],
                }
            }),
            babel({
                babelrc: false,
                presets: [
                    [
                        'env',
                        {
                            modules: false,
                            targets: {
                                browsers: ['last 2 versions'],
                            },
                        },
                    ],
                    'react',
                ],
                plugins: [
                    'transform-object-rest-spread',
                    'transform-class-properties',
                    'external-helpers',
                    [
                        'styled-components',
                        {
                            ssr: true,
                            displayName: true,
                            fileName: false,
                        },
                    ],
                ].filter(Boolean),
                exclude: 'node_modules/**',
            }),
            replace({
                'process.browser': true.toString(),
                'process.server': false.toString(),
                'process.env.NODE_ENV': '"development"',
            }),
        ],
    }
];
