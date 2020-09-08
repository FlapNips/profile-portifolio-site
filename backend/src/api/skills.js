const fs = require('fs')
const path = require('path')


module.exports = app => {

  const { addSkillFile,
    getSkillFile,
    updateSkillFile,
    deleteSkillFile} = app.models.images

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

    //VALIDATION DATA
    try {
    
      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'

      const userExists = await db.Users().where({ id: userId }).first()
      existsOrError(userExists, 'Usuário não existe.')

      existsOrError(data.title, 'Defina um título.')

      
      const skillExists = await db.Skills().where({ users_id: userId, title: data.title }).first()
      notExistsOrError(skillExists, 'Habilidade já cadastrada.')

      existsOrError(file, 'Escolha uma imagem.')

    } catch(error) {
      if (file) fs.unlinkSync(file.path)
      return res.status(400).send(error)
    }

    //Add Skill
    return db.Skills().insert({
        users_id: userId,
        fileName: addSkillFile(data.title, file, userId),
        title: data.title,
        percent: data.percent
      })
      .then( async() => res.status(201).send('Criado com sucesso.'))
      .catch( error => {
        console.error(error)
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

    return db.Skills()
      .where({
        id: skillId
      })
      .first()
      .then(result => {
        const image = getSkillFile(result.fileName)
        result.image = image
        return res.status(200).send(result)
      })
      .catch(error => {
        console.error(error)
        return res.status(500).send(error)
      })
  }

  /* -----------------------UPDATE SKILL (image and/or data)----------------------- */
  const updateSkill = async (req, res) => {
    const skillId = req.params.skill_id
    const data = { ...req.body }
    const file = req.file
    const skill = await db.Skills().where({ id: skillId }).first()

    //VALIDATION 
    try {

      if(isNaN(skillId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(skill, 'Habilidade não encontrada.') 

      contentObjectOrError(data, 'Não pode haver campos em branco.')
      if (!file) {
        existsValueForUpdate(data, skill)
      }
      
    } catch(error) {
      if(file) fs.unlinkSync(file.path)
      return res.status(400).send(error)
    }

    if (data.title === undefined) data.title = skill.title

    //UPDATE THE DATABASE
    return db.Skills()
      .update({
        title: data.title,
        fileName: updateSkillFile(data.title, skill.fileName, file, skill.users_id),
        percent: data.percent
      })
      .where({
        id: skillId
      })
      .then( async () =>  res.status(200).send('Atualizado com sucesso.'))
      .catch(error => {
        
        console.error(error)
        return res.status(500).send(error)
      })

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
        deleteSkillFile(skillExists.fileName)
        res.status(200).send('Deletado com sucesso.')
      })
      .catch( error => {
        console.error(error)
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