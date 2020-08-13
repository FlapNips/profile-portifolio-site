const fs = require('fs')
const path = require('path')

module.exports = app => {

  function addFile(fileName, file) {
    try {
      fs.renameSync(
        file.path,
        path.join(__dirname, '../images/icons/', `${fileName}${path.extname(file.filename)}`)
      )
      return path.join(__dirname, '../images/icons/', `${fileName}${path.extname(file.filename)}`)
    } catch(error) {
      throw 'Houve um erro na criação do arquivo.'
    }
  }

  function changePathDB(newFileName, oldFilePath, file) {
    try {
      //change image name
      const fileObj = path.parse(oldFilePath)
      fileObj.name = newFileName
      delete fileObj.base


      if(file) {
        fileObj.ext = path.extname(file.filename)        
        fs.renameSync(file.path, oldFilePath)

      }
      const newFilePath = path.format(fileObj)

      fs.renameSync(oldFilePath, newFilePath)
      return newFilePath

    } catch(error) {
      throw 'Houve um erro na atualização do arquivo.'
    }
  }

  return { 
    addFile,
    changePathDB
  }
}