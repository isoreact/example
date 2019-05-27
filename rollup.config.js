import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import {terser} from 'rollup-plugin-terser';

const environment = process.env.NODE_ENV || 'development';

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
                    'node_modules/react/index.js': ['Component', 'createElement', 'cloneElement', 'createContext', 'useContext', 'useLayoutEffect', 'useRef', 'useState'],
                    'node_modules/react-is/index.js': ['isElement', 'isValidElementType', 'ForwardRef'],
                }
            }),
            babel({
                babelrc: false,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false,
                            targets: {
                                browsers: ['last 2 versions'],
                            },
                        },
                    ],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-object-rest-spread',
                    [
                        'babel-plugin-styled-components',
                        {
                            ssr: true,
                            displayName: true,
                            fileName: false,
                        },
                    ],
                    environment === 'production' && 'babel-plugin-transform-react-remove-prop-types',
                ].filter(Boolean),
                exclude: 'node_modules/**',
            }),
            replace({
                'process.browser': true.toString(),
                'process.server': false.toString(),
                'process.env.NODE_ENV': `"${environment}"`,
            }),
            environment === 'production' && terser(),
        ]
            .filter(Boolean),
        watch: {
            include: 'src/**',
            clearScreen: false,
        },
    },
];
