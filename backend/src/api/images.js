const fs = require('fs')
const path = require('path')

module.exports = app => {

  function addSkillFile(fileTitle, file, userId) {
    const rename = `${userId}_${fileTitle}${path.extname(file.filename)}`
    try {
      fs.renameSync(
        file.path,
        path.join(__dirname, '../images/icons/', rename)
      )
      return rename
    } catch(error) {
      throw 'Houve um erro na criação do arquivo.'
    }
  }

  function updateSkillFile(fileTitle, file, userId, updateSkillFile) {
    const rename = `${userId}_${fileTitle}${path.extname(file.filename)}`
    try {
      fs.unlinkSync(path.join(__dirname, updateSkillFile))
      fs.renameSync(
        file.path,
        path.join(__dirname, '../images/icons/', rename)
      )
      return rename
    } catch(error) {
      throw 'Houve um erro na criação do arquivo.'
    }
  }

  function getSkillFile(fileName) {
    const directory = `../images/icons/${fileName}`
    const image = fs.readFileSync(path.join(__dirname, directory))
    return image.toString('base64')
    
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
    addSkillFile,
    getSkillFile,
    updateSkillFile,
    changePathDB
  }
}