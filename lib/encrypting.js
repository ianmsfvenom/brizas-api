
const crypto = require('crypto')
var keyHexFnf = Buffer.from('9jJVG96aaxdUPE%rsV3&yFqYphpKC67m')
var ivHexFnf = Buffer.from('v9rD$U%oHep6n@58')

const encryptHex = async (message) => {
    var cipher = await crypto.createCipheriv('aes-256-ctr', keyHexFnf, ivHexFnf)
    var encrypted = await cipher.update(message, 'utf-8', 'hex')
    encrypted += await cipher.final('hex')
    return encrypted;
}

const decryptHex =  async (message) => {
    var cipher = await crypto.createDecipheriv('aes-256-ctr', keyHexFnf, ivHexFnf)
    var decrypted = await cipher.update(message, 'hex', 'utf-8')
    decrypted += await cipher.final('utf-8')
    return decrypted;
}

module.exports = { encryptHex, decryptHex }