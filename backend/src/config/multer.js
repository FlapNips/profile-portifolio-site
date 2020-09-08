const multer = require('multer')
const path = require('path')

module.exports = {
  dest: path.join(__dirname, '..', '/images/temp'), //Caso destination não esteja setado
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      if (process.env.NODE_ENV === 'test') {
        return callback(null, path.join(`${process.cwd()}/__tests__/integration/skills/images`))
      }
      return callback(null, path.resolve(path.join(__dirname, '..', '/images/temp')))
    },
    filename: async (req, file, callback) => {
      let fileName = file.originalname.split('.')[0]
      fileName = fileName.replace(' ', '_')
      console.log('AQUI VEM')
      callback(null, `${Date.now()}-${fileName}${path.extname(file.originalname)}`)
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