const multer = require('multer')
const path = require('path')
//const crypto = require('crypto')  PARA CRIPTOGRAFAR E NAO REPETIR NOME DE IMAGEM

module.exports = {
  dest: path.join(__dirname, '..', '/images/temp'), //Caso destination não esteja setado
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(path.join(__dirname, '..', '/images/temp')))
    },
    filename: async (req, file, callback) => {
      const filename = file.originalname.split('.')[0]
      callback(null, `${Date.now()}-${filename}${path.extname(file.originalname)}`)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024 //2bts >  2kbts > 2mbts
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/svg+xml',
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/gif'
    ]

    if(allowedMimes.includes(file.mimetype)) {
       callback(false, true)
    } else {
      callback(new Error('TIPO INVALIDO DE IMAGEM'))
    }
  }

}