const jwt = require('jsonwebtoken')
const config = require('../config')
const simpleCrypto = require('../services/encryptDecrypt')

const getPayload = token => {
  try {
    const payload = jwt.verify(token.split(' ')[1], config.secret)
    return simpleCrypto.decrypt(payload.user)
  } catch (err) {
    return null
  }
}

module.exports = {
  getPayload
}
