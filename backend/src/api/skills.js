
const fs = require('fs')
const path = require('path')



module.exports = app => {

  const { addFile,
          changePathDB } = app.api.images

  const db = app.api.dbNames

  const { existsOrError, 
          existsValueForUpdate } = app.api.validator

  /* -----------------------ADD SKILL WITH USER_ID----------------------- */
  const addSkill = async (req, res) => {
    const data = { ...req.body }
    const file = req.file

    //VALIDATION DATA
    try {
    
      existsOrError(data.skillName, 'Defina um nome!')

      const skillExists = await dbSkills().where({ skill_name: data.skillName }).first()
      existsOrError(skillExists, 'habilidade já cadastrada!')

      existsOrError(file, 'Escolha uma imagem!')

    } catch(error) {
      if(file) fs.unlinkSync(file.path)
      return res.status(406).send(error)
    }
    //

    //ADD THE DATABASE
    app.db.transaction( async trans => {
      await dbSkills().insert({
          skill_name: data.skillName,
          skill_path: addFile(data.skillName, file)
        })
        .transacting(trans)
    })
    .then( () => {
        return res.send('Criado com sucesso !')
    })
    .catch( error => {
      fs.unlinkSync(file.path)
      return res.status(500).send(error)
    })
        
  }
  /* -----------------------ADD SKILL WITH USER_ID----------------------- */
  const addSkillUser = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const usersDB = await dbUsers().where({ user_id: userId }).first()

    //VALIDATION DATA
    try {
    
      if(isNaN(userId)) throw 'O user_id deve ser númerico'
      existsOrError(data.skillId, 'Escolha uma habilidade! skillId')
      existsOrError(usersDB, 'Usuário não encontrado!')

      const skillsExists = await dbUXS().whereIn('skill_id', data.skillId).where({ user_id: userId}).first()
      existsOrError(skillsExists, '')

    } catch(error) {
      return res.status(406).send(error)
    }
    //object
    function insertObj(userId, skillId) {
      return skillId.map( element => {
        return { user_id: userId, skill_id: element }
      })
    }
    //ADD THE DATABASE
    app.db.transaction( async trans => {

      await dbUXS().insert(
          insertObj(userId, data.skillId)
        )
        .transacting(trans)

    })
    .then( () => {
        return res.send('Habilidade adicionada !! Ao usuário' + userId)
    })
    .catch( error => {
      return res.status(500).send(error)
    })
        
  }
  /* -----------------------GET SKILL DATA WITH SKILL_ID----------------------- */
  const getSkillData = async (req, res) => {
    const skillId = req.params.skill_id
    const skillDB = await dbSkills().where({ skill_id: skillId }).first() 

        try {

      if(isNaN(skillId)) throw 'Skill_id tem que ser numero'
      existsOrError(skillDB, 'ID Inválido!')

    } catch(error) {
      return res.status(400).send(error)
    }

    return dbSkills().where({
        skill_id: skillId
      }).first()
      .then( result => {

        return  res.status(202).send(result)
      })
      .catch( error => res.status(500).send(error))
  }
  /* -----------------------GET SKILL IMAGE WITH SKILL_ID----------------------- */
  const getSkillImage = async (req, res) => {
    const skillId = req.params.skill_id
    const skillDB = await dbSkills().where({ skill_id: skillId }).first() 

    try {

      if(isNaN(skillId)) throw 'Skill_id tem que ser numero'
      existsOrError(skillDB, 'ID Inválido!')

    } catch(error) {
      return res.status(400).send(error)
    }

    return dbSkills()
            .select('skill_path')
            .where({ skill_id: skillId })
            .first()
            .then( result => res.status(202).sendFile(result.skill_path))
            .catch( error => res.status(500).send(error))
  }
  /* -----------------------GET ALL SKILLS OF THE USER WITH USER_ID ----------------------- */
  const getSkillUser = async (req, res) => {
    const userId = req.params.user_id
    const uxsDB = await dbUXS().where({ user_id: userId })

    try {

      if(isNaN(userId)) throw 'Skill_id tem que ser numero'
      if(uxsDB.length === 0) throw 'Nenhuma habilidade encontrada deste usuário'

    } catch(error) {
      return res.status(400).send(error)
    }

    async function resultSelect() {
      return await dbUXS()
        .select([
          'users.user_Id',
          'users.username',
          app.db.raw('GROUP_CONCAT(users_x_skills.skill_percent) as skills_percent'),
          app.db.raw('GROUP_CONCAT(skills.skill_id) as skills_id'),
          app.db.raw('GROUP_CONCAT(skills.skill_name) as skills_name')
        ])
        .innerJoin('users', function() {
          this.on('users.user_id', '=', 'users_x_skills.user_id').onIn('users.user_id', [userId])
        })
        .innerJoin('skills', 'skills.skill_id', 'users_x_skills.skill_id')
        .first()
    }
    
    return resultSelect().then( result => {
      const skillsId = result.skills_id.split(',')
      const skillsName = result.skills_name.split(',')
      const skillsPercent = result.skills_percent.split(',')
      let skills = []

      for(let i = 0; i < skillsId.length; i++) {
        skills.push({
          skill_id: skillsId[i],
          skill_name: skillsName[i],
          skill_percent: skillsPercent[i]
        })
      }

      result = {
        user_id: result.user_id,
        username: result.username,
        skills: skills
      }
      res.send(result)
    })
    .catch( error => res.status(500).send(error))
  }
  /* -----------------------GET ALL SKILLS OF THE EXPERIENCE WITH EXPERIENCE_ID ----------------------- */
  const getSkillsExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const exsDB = await dbEXS().where({ experience_id: experienceId })

    try {

      if(isNaN(experienceId)) throw 'Skill_id tem que ser numero'
      if(exsDB.length === 0) throw 'Nenhuma habilidade encontrada desta experiência'

    } catch(error) {
      return res.status(400).send(error)
    }

    async function resultSelect() {
      return await dbEXS()
        .select([
          'users_experiences.experience_id',
          app.db.raw('GROUP_CONCAT(skills.skill_id) as skills_id'),
          app.db.raw('GROUP_CONCAT(skills.skill_name) as skills_name')
        ])
        .innerJoin('users_experiences', function() {
          this.on('users_experiences.experience_id', '=', 'experiences_x_skills.experience_id').onIn('users_experiences.experience_id', [experienceId])
        })
        .innerJoin('skills', 'skills.skill_id', 'experiences_x_skills.skill_id')
        .first()
    }
    
    return resultSelect().then( result => {
      const skillsId = result.skills_id.split(',')
      const skillsName = result.skills_name.split(',')
      let skills = []

      for(let i = 0; i < skillsId.length; i++) {
        skills.push({
          skill_id: skillsId[i],
          skill_name: skillsName[i],
        })
      }

      result = {
        experience_id: result.experience_id,
        skills: skills
      }
      res.send(result)
    })
    .catch( error => res.status(500).send(error))
  }
  /* -----------------------UPDATE SKILL (image and/or data) WITH SKILL_ID----------------------- */
  const updateSkill = async (req, res) => {
      const skillId = req.params.skill_id
      const skillDB = await dbSkills().where({ skill_id: skillId }).first()

      const data = req.body
      if(data.skillName) {
        var skillNameExists = await dbSkills().where({ skill_name: data.skillName }).first()
      }

      const file = req.file
      //VALIDATION 
      try {

        if(isNaN(skillId)) throw 'skillId tem que ser numero'
        existsOrError(skillDB, 'Habilidade não encontrada') 
        existsOrError(skillNameExists, '')
        if(file === undefined || data.length == 0) throw 'ERRO AQUI'

      } catch(error) {
        if(file) fs.unlinkSync(file.path)
        return res.status(406).send(error)
      }

      //UPDATE THE DATABASE
      app.db.transaction(async trans => {
        await dbSkills()
          .update({
            skill_name: data.skillName,
            skill_path: changePathDB(data.skillName || skillDB.skill_name, skillDB.skill_path, file)
          })
          .where({
            skill_id: skillId
          })
          .transacting(trans)             
      })
      .then( async () => {
        return res.status(202).send(await dbSkills().where({ skill_id: skillId }).first())
      })
      .catch( error => {

        return res.status(500).send(error)
      })

  }
  /* -----------------------DELETE SKILL WITH SKILL_ID----------------------- */
  const deleteSkill = async (req, res) => {
    const skillId = req.params.skill_id
    const skillDB = await dbSkills().where({ skill_id: skillId }).first()

    //VALIDATION 
    try {

      if(isNaN(skillId)) throw 'skillId tem que ser numero'
      existsOrError(skillDB, 'Habilidade não encontrada')

    } catch(error) {
      return res.status(406).send(error)
    }

    return app.db.transaction( async trans => {

      await dbSkills()
        .del()
        .where({
          skill_id: skillId
        })
        .transacting(trans)
        
      fs.unlinkSync(skillDB.skill_path)

    })
    .then( () => res.status(200).send('DELETADO'))
    .catch( error => {
      console.log(error)
      return res.status(500).send(error)
    })
  }

  return {

    addSkill,
    addSkillUser,

    getSkillData,
    getSkillImage,
    getSkillUser,
    getSkillsExperience,

    updateSkill,

    deleteSkill
  }
}