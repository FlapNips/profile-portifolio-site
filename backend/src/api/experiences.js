// @flow
module.exports = app => {

  const { existsOrError,
          existsValueForUpdate,
          contentObjectOrError } = app.models.validator

  const db = app.api.dbNames
  
  const filter = app.models.filters

  /* -----------------------ADD EXPERIENCE----------------------- */
  const addExperience = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const userExperience = await db.Users().where({ id: userId }).first()

    //Verification to continue
    try {
      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(userExperience, 'Usuário não existe.')

      contentObjectOrError(data, 'Não pode existir campos vazios.')

      existsOrError(data.title, 'Insira um título.')
      existsOrError(data.subtitle, 'Insira um subtítulo.')

      existsOrError(data.list, 'Escreva as principais atividades.')
      if (!Array.isArray(data.list)) throw 'LIST deve ser um Array.'
      
      existsOrError(data.skills, 'Defina pelo menos uma habilidade.')
      if (!Array.isArray(data.skills)) {
        throw 'SKILLS deve ser um Array.'
        //Transform Array in string.
        data.skills = data.skills.join(';')
      }

      existsOrError(data.about, 'Escreva um pouco sobre a experiência.')
      
      existsOrError(data.dateStart, 'Insira a data de início.')
      if (!new Date(data.dateStart).isDate()) throw 'Insira uma data de início válida.'

      existsOrError(data.dateFinish, 'Insira a data de finalização.')
      if (!new Date(data.dateFinish).isDate()) throw 'Insira uma data de finalização válida.'

    } catch(error) {
      return res.status(400).send(error)
    }

    //Check all operations is success or undo operations
    app.db.transaction(async trans => {
      
      //Add DATA to experiences
      const experienceId = await db.Experiences()
        .transacting(trans)
        .insert({
          users_id: userId,
          title: data.title,
          subtitle: data.subtitle,
          about: data.about,
          list: data.list,
          image: data.image,
          date_start: new Date(data.dateStart),
          date_finish: new Date(data.dateFinish),
        })
      
      //Add skills in TBX_SKILLS_EXPERIENCES only if exists
      if (data.skills) {
        
        //Transform Array in Object.
        const result = data.skills.map( element => {
            return {
              experiences_id: experienceId[0],
              skills_id: element
            }
          })
        await db.SXE()
          .transacting(trans)
          .insert(result)  
      }
    
      
    })
    .then( () => {
      return res.status(201).send('Criado com sucesso.')
    })
    .catch(error => {
      console.warn(error)
      return res.status(500).send('Erro 500 inesperado.')
    });
  }

  
/* -----------------------GET EXPERIENCE----------------------- */
  
  const getExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const experience = await db.Experiences().where({ id: experienceId}).first()

    
    //Verification to continue
    try {
      
      if (isNaN(experienceId)) throw 'O parâmetro precisa ser numérico.'
     existsOrError(experience, 'Experiência não encontrada.')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    //Return DATA of the experiences + skills

    return db.Experiences()
      .select([
        'tb_experiences.*',
        app.db.raw('GROUP_CONCAT(tbx_skills_experiences.skills_id) as skills')
      ])
      .leftJoin('tbx_skills_experiences', function () {
        this.on('tb_experiences.id', 'tbx_skills_experiences.experiences_id')
          .onIn('tbx_skills_experiences.experiences_id', experienceId)
      })
      .where('tb_experiences.id', experienceId)
      .groupBy('tb_experiences.id')
      .first()
      .then(result => {
        
        //Transform in Array if exists
        if (result.list) result.list = result.list.split(';')
        if (result.skills) result.skills = result.skills.split(',')

        console.log(result.skills)
        result = filter.changeUnderlineToUpperCase(result)

        res.status(200).send(result)
      })
      .catch(error => {
        return res.status(500).send(error)
      })
  }
  

/* -----------------------UPDATE EXPERIENCE----------------------- */
  
  const updateExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const data = { ...req.body }
    const experience = await db.Experiences().where({ id: experienceId}).first()

    //Verification DATA to continue
    try {
      
      if (isNaN(experienceId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(experience, 'Nenhuma experiência encontrada.')

      if (data.list) {
        if (!Array.isArray(data.list)) throw 'LIST precisa ser um Array.'
        //Transform Array in string.
        data.list = data.list.join(';')
      }

      if (data.skills) {
        if (!Array.isArray(data.skills)) throw 'SKILLS precisa ser um Array.'
      }
      contentObjectOrError(data, 'Não pode haver campos em branco.')

      existsValueForUpdate(data, experience)

    } catch(error) {
      return res.status(400).send(error)
    }


    //Check all operations is success or undo operations
    return app.db.transaction(async trans => {
      
      //Update experience
      await db.Experiences()
        .transacting(trans)
        .update({
          title: data.title,
          subtitle: data.subtitle,
          about: data.about,
          list: data.list,
          link: data.link,
          date_start: data.dateStart,
          date_finish: data.dateFinish,
          })
        .where({ id: experienceId })
      
      //Update skills in TBX_SKILLS_EXPERIENCES only if exists alteration
      if (data.skills) {
        const skills = data.skills.map(element => {
          return {
            experiences_id: experienceId,
            skills_id: element
          }
        })
        console.log(skills)
        await db.SXE().del().where({ experiences_id: experienceId }).transacting(trans)
        await db.SXE().insert(skills).transacting(trans)
      }

    })
    .then( () => res.status(200).send('Atualizado com sucesso.'))
    .catch(error => {
      console.log(error)
      return res.status(500).send('Erro 500 inesperado.')
    })

  }
  /* -----------------------DELETE EXPERIENCE----------------------- */
  const deleteExperience = async (req, res) => {
    const experienceId = req.params.experience_id
    const experience = await db.Experiences().where({ id: experienceId }).first()

    
    //Verification DATA to continue
    try {

      if (isNaN(experienceId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(experience, 'Experiência não encontrada.')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    
    //Delete experience and skills in table TABLE TBX_SKILLS_EXPERIENCES
    return db.Experiences()
      .del()
      .where({ id: experienceId })
      .then(() => res.status(200).send('Deletado com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  return {
    addExperience,
    getExperience,
    updateExperience,
    deleteExperience
  }
}