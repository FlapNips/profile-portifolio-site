module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          existsValueForUpdate,
          objectValueOrError 
        } = app.api.validator

  const dbExperiences = () => {
    return eval('app.db("users_experiences")')
  }
  const dbEXS = () => {
    return eval('app.db("experiences_x_skills")')
  }
  const dbUsers = () => {
    return eval('app.db("users")')
  }

  /* -----------------------ADD EXPERIENCE----------------------- */
    const addExperience = async (req, res) => {
    const userId = req.params.user_id
    const data = req.body
    const existsUser = await dbUsers().where({ user_id: userId }).first()
    let skills = []

    try {

      if(isNaN(userId)) throw 'Insira o ID do usuário!'
      if(existsUser === undefined) throw 'Usuário não encontrado!'
      existsOrError(data.experienceTitle, 'Insira o título do projeto')
      existsOrError(data.experienceDateStart, 'Insira a data de início')
      existsOrError(data.experienceDateFinish, 'Insira a data de finalização')
      existsOrError(data.experienceAbout, 'Escreva um pouco sobre o projeto')
      existsOrError(data.experienceSkills, 'Escolha ao menos uma tecnologia.')

    } catch(error) {
      return res.status(400).send(error)
    }

    try {
      await app.db.transaction(async trans => {

        await dbExperiences()
        .insert({
          user_id: userId,
          experience_title: data.experienceTitle,
          experience_date_start: data.experienceDateStart,
          experience_date_finish: data.experienceDateFinish,
          experience_about: data.experienceAbout,
        })
        .transacting(trans)
        .then( async experienceId => {
          skills = data.experienceSkills.map(element => {
            return {experience_id: experienceId[0], skill_id: element}
          })
        })

        await dbEXS().insert(skills).transacting(trans)
        
      }).then( () => res.status(201).send('Experiência criada!'))

    } catch(error) {
      return res.status(500).send(error)
    } 

  }
  /* -----------------------GET EXPERIENCE FROM USER----------------------- */
  const getExperienceUser = async (req, res) => {
    const userId = req.params.user_id
    const existsExperience = await dbExperiences().where({user_id: userId}).first()

    try {
      if(isNaN(userId)) throw 'user_id tem que ser número'
      existsOrError(existsExperience, 'Usuário não possui experiência')
    } catch(error) {
      return res.status(400).send(error)
    }
  
    return dbExperiences().where({
            user_id: userId
            })
            .then( result => res.status(200).send(result))
            .catch( error => res.sendStatus(500).send(error))
  }
  /* -----------------------UPDATE EXPERIENCE----------------------- */
  const updateExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const experienceDB = await dbExperiences().where({ experience_id: experienceId }).first()
    const data = req.body
    let skills = []

    try {

      if(isNaN(experienceId)) throw 'project_id não é número'
      if(experienceDB === undefined) throw 'Experiência não encontrada!'
      objectValueOrError(data, 'Não pode existir campos vazios')
      existsValueForUpdate(data, experienceDB)
    } catch(error) {
      return res.status(400).send(error)
    }

    try {
      await app.db.transaction( async trans => {
        await dbExperiences().update({
          user_id: data.experienceUserId,
          experience_title: data.experienceTitle,
          experience_date_start: data.experienceDateStart,
          experience_date_finish: data.experienceDateFinish,
          experience_about: data.experienceAbout,
          })
          .where({ experience_id: experienceId })
          .transacting(trans)
          .then( async () => {

            if(data.experienceSkills != undefined) {
              skills = data.experienceSkills.map( element => {
                return { experience_id: experienceId, skill_id: element}
            })
              
              await dbEXS()
                .del()
                .where({ experience_id: experienceId})
                .transacting(trans)

              await dbEXS().insert(skills).transacting(trans)
            }
          })

        return res.status(202).send('Atualizado!')
      })

    } catch(error) {
      return console.log(error)
    }
  }
  /* -----------------------DELETE EXPERIENCE----------------------- */
  const deleteExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const experienceDB = await dbExperiences().where({ experience_id: experienceId}).first()

    try {

      if(isNaN(experienceId)) throw 'user_id não é número'
      if(experienceDB === undefined) throw 'Experiência não encontrada'

    } catch(error) {
      return res.status(400).send(error)
    }
    
    return dbExperiences()
      .where({ experience_id: experienceId })
      .del()
      .then( () => res.status(202).send('DELETADO!'))
      .catch( error => res.status(500).send(error))
  }



  return {
    addExperience,
    getExperienceUser,
    updateExperience,
    deleteExperience
  }
}