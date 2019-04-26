process.browser = false;
process.server = true;

require('@babel/register');
require('regenerator-runtime/runtime');
require('./src/server');
