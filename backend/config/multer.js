const multer = require('multer')
const path = require('path')
//const crypto = require('crypto')  PARA CRIPTOGRAFAR E NAO REPETIR NOME DE IMAGEM

module.exports = {
  dest: path.resolve(__dirname, '..', 'images'), //Caso destination não esteja setado
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      console.log('foia qui')
      callback(null, path.resolve(__dirname, '..', 'images'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024 //bts >  kbts > mbts
  },
  fileFilter: (req, file, callback) => {
    console.log('erro aqui')
    const allowedMimes = [
      'image/svg+xml'
    ]

    if(allowedMimes.includes(file.mimetype)) {
       callback(null, true)
    } else {
      callback(new Error('TIPO INVALIDO DE IMAGEM'))
    }
  }

}