const fs = require('fs')
const path = require('path')



module.exports = app => {

  const { addSkillFile,
    getSkillFile,
    updateSkillFile,
    changePathDB } = app.api.images

  const db = app.api.dbNames

  const { existsOrError, 
    notExistsOrError,
    contentObjectOrError,
    existsValueForUpdate } = app.models.validator

  /* -----------------------ADD SKILL WITH USER_ID----------------------- */
  const addSkill = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const file = req.file

    console.log(file)
    //VALIDATION DATA
    try {
    
      existsOrError(data.title, 'Defina um nome.')
      const userExists = await db.Users().where({ id: userId }).first()
      const skillExists = await db.Skills().where({users_id: userId, title: data.title }).first()

      existsOrError(userExists, 'Perfil não encontrado.')
      notExistsOrError(skillExists, 'Habilidade já cadastrada.')

      existsOrError(file, 'Escolha uma imagem.')

    } catch(error) {
      if(file) fs.unlinkSync(file.path)
      return res.status(406).send(error)
    }

    //Add Skill
    return db.Skills().insert({
        users_id: userId,
        fileName: addSkillFile(data.title, file, userId),
        title: data.title,
        percent: data.percent
      })
      .then(() => res.send('Criado com sucesso.'))
      .catch( error => {
      
        fs.unlinkSync(file.path)
        return res.status(500).send(error)
      })
        
  }

  /* -----------------------GET SKILL ----------------------- */
  const getSkill = async (req, res) => {
    const skillId = req.params.skill_id
    const skillExists = await db.Skills().where({ id: skillId }).first() 

      try {

        if(isNaN(skillId)) throw 'O parâmetro precisa ser numérico.'
        existsOrError(skillExists, 'Habilidade não encontrada.')

      } catch(error) {
        return res.status(400).send(error)
      }

      return db.Skills().where({
          id: skillId
        })
        .first()
        .then(result => {
          const image = getSkillFile(result.fileName)
          result.image = image
          return res.status(202).send(result)
        })
        .catch(error => {
          return res.status(500).send(error)
        })
  }

  /* -----------------------UPDATE SKILL (image and/or data) WITH SKILL_ID----------------------- */
  const updateSkill = async (req, res) => {
    const skillId = req.params.skill_id
    const data = { ...req.body }
    const file = req.file
    const skillExists = await db.Skills().where({ id: skillId }).first()

    //VALIDATION 
    try {

      if(isNaN(skillId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(skillExists, 'Habilidade não encontrada.') 

      contentObjectOrError(data, 'Não pode haver campos em branco.')
      existsValueForUpdate(data, skillExists)

      if (data.title === undefined) data.title = skillExists.title
      
    } catch(error) {
      if(file) fs.unlinkSync(file.path)
      return res.status(406).send(error)
    }

    const pathFileOld = `../images/icons/${skillExists.fileName}`

    //UPDATE THE DATABASE
    return db.Skills()
      .update({
        title: data.skillName,
        fileName: updateSkillFile(data.title, file, skillExists.users_id, pathFileOld),
        percent: data.percent
      })
      .where({
        id: skillId
      })
    .then( async () =>  res.status(202).send('Atualizado com sucesso.'))
    .catch( error => res.status(500).send(error))

  }
  /* -----------------------DELETE SKILL WITH SKILL_ID----------------------- */
  const deleteSkill = async (req, res) => {
    const skillId = req.params.skill_id
    const skillExists = await db.Skills().where({ id: skillId }).first()

    //VALIDATION 
    try {

      if(isNaN(skillId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(skillExists, 'Habilidade não encontrada.')

    } catch(error) {
      return res.status(406).send(error)
    }

    return await db.Skills()
      .del()
      .where({
        id: skillId
      })
      .then(() => {
        fs.unlinkSync(path.join(__dirname, `../images/icons/${skillExists.fileName}`))
        res.status(200).send('Deletado com sucesso.')
      })
      .catch( error => {
        console.log(error)
        return res.status(500).send(error)
      })
  }

  return {
    addSkill,
    getSkill,
    updateSkill,
    deleteSkill
  }
}