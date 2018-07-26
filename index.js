process.browser = false;
process.server = true;

require('babel-register');
require('./src/server');
