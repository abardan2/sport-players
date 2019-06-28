// replace require by the ESM loader
require = require('esm')(module)
module.exports = require('./server')