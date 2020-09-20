module.exports = app => {

  const {
      existsOrError,
      notExistsOrError,
      existsValueForUpdate,
      validateDate,
      contentObjectOrError 
    } = app.models.validator

  const db = app.api.dbNames

    const filter = app.models.filters
  /* -----------------------ADD EDUCATION----------------------- */
  const addEducation = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const existsUser = await db.Users().where({ id: userId }).first()
    
    try {

      if(isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(existsUser, 'Usuário não existe.')
      contentObjectOrError(data, 'Não pode existir campos vazios.')

      existsOrError(data.title, 'Insira um título.')

      existsOrError(data.about, 'Escreva um pouco do aprendizado.')

      existsOrError(data.duration, 'Insira a duração.')
      if(isNaN(data.duration)) throw 'Apenas números.'


      existsOrError(data.dateStart, 'Insira a data de início.')
      if(!new Date(data.dateStart).isDate()) throw 'Insira a data de início válida.'

      existsOrError(data.dateFinish, 'Insira a data de finalização.')
      if(!new Date(data.dateFinish).isDate()) throw 'Insira a data de finalização válida.'
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Educations()
            .insert({
              users_id: userId,
              title: data.title,
              duration: data.duration,
              date_start: new Date(data.dateStart),
              date_finish: new Date(data.dateFinish),
              about: data.about,
            })
            .then( () => res.status(201).send('Criado com sucesso.'))
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }
  /* -----------------------GET EDUCATION----------------------- */
  const getEducation = async (req, res) => {
    const educationId = req.params.education_id
    const existsEducation = await db.Educations().where({ id: educationId }).first()

    try {

      if(isNaN(educationId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(existsEducation, 'Educação não encontrada.')
      
    } catch(error) {
      return res.status(400).send(error)
    }
  
    return db.Educations()
        .where({
            id: educationId
        })
        .first()
        .then(result => {
        
            result = filter.changeUnderlineToUpperCase(result)

            res.status(200).send(result)
        })
        .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }
  /* -----------------------UPDATE EDUCATION----------------------- */
  const updateEducation = async (req, res) => {
    const educationId = req.params.education_id
    const data = { ...req.body }
    const existsEducation = await db.Educations().where({ id: educationId }).first()

    try {
      if(isNaN(educationId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(existsEducation, 'Educação não encontrada.')

      existsValueForUpdate(data, existsEducation)
      contentObjectOrError(data, 'Não pode haver campos em branco.')
      

    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Educations()
              .update({
                title: data.title,
                duration: data.duration,
                about: data.about,
                date_start: data.dateStart,
                date_finish: data.dateFinish
              })
              .where({ id: educationId })
              .then( () => res.status(200).send('Atualizado com sucesso.'))
              .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }

  /* -----------------------DELETE EDUCATION----------------------- */
  const deleteEducation = async (req, res) => {
    const educationId = req.params.education_id
    const existsEducation = await db.Educations().where({ id: educationId }).first()

    try {
      if(isNaN(educationId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(existsEducation, 'Educação não encontrada.')

    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Educations()
      .del()
      .where({ id: educationId })
      .then( () => res.status(200).send('Deletado com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }



  return {
    addEducation,
    getEducation,
    updateEducation,
    deleteEducation
  }
}