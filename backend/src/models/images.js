const fs = require('fs')
const path = require('path')

module.exports = app => {

  function addSkillFile(fileTitle, file, userId) {
    try {
      const fileName = `${userId}_${fileTitle}${path.extname(file.filename)}`

      const pathFile = () => {
        if (process.env.NODE_ENV === 'test') {
          return `/__tests__/integration/skills/images/${fileName}`
        } else {
          return `/src/images/icons/${fileName}`
        }
      }
      fs.renameSync(
        file.path,
        path.join(process.cwd() + pathFile())
      )
      return fileName
    } catch (error) {
      console.error(error)
      throw 'Houve um erro na criação do arquivo.'
    }
  }
  function getSkillFile(fileName) {
    try {
    const pathFile = () => {
      if (process.env.NODE_ENV === 'test') {
        return `/__tests__/integration/skills/images/${fileName}`
      } else {
        return `/src/images/icons/${fileName}`
      }
    }
    const image = fs.readFileSync(path.join(process.cwd() + pathFile()), 'base64')
    return image
    } catch (error) {
      throw 'Houve um erro ao ler o arquivo.'
    }
  }

  function updateSkillFile(newTitle, oldFileName, file, userId) {
    try {
      
        const filePath = (oldName) => {
          if (process.env.NODE_ENV === 'test') {
            return `/__tests__/integration/skills/images/${oldName}`
          } else {
            return `/src/images/icons/${oldName}`
          }
        }
      if (file) {
        const newFileName = `${userId}_${newTitle}${path.extname(file.filename)}`

      
        fs.unlinkSync(path.join(process.cwd() + filePath(oldFileName)))
        fs.renameSync(
          file.path,
          path.join(process.cwd() + filePath(newFileName))
        )
        return newFileName

      } else {
        
        const newFileName = `${userId}_${newTitle}${path.extname(filePath(oldFileName))}`
        fs.renameSync(
            path.join(process.cwd() + filePath(oldFileName)),
            path.join(process.cwd() + filePath(newFileName))
        )
        return newFileName

      }

    } catch (error) {
      console.error(error)
      throw 'Houve um erro na atualização do arquivo.'
    }
  }
  function deleteSkillFile(fileName) {
    try {
      const pathFile = () => {
        if (process.env.NODE_ENV == 'test') {
          return `/__tests__/integration/skills/images/${fileName}`
        } else {
          return `/src/images/${fileName}`
        }
        fs.unlinkSync(process.cwd() + pathFile())
      }
    } catch (error) {
      throw 'Houve um erro ao deletar arquivo.'
    }
  }
  return { 
    addSkillFile,
    getSkillFile,
    updateSkillFile,
    deleteSkillFile
  }
}