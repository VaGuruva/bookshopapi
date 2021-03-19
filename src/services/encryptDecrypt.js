const config = require('../config')
const SimpleCrypto = require('simple-crypto-js').default
const simpleCrypto = new SimpleCrypto(config.encryptDecypt)

module.exports = simpleCrypto