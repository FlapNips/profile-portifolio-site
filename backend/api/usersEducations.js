module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          objectValueOrError 
        } = app.api.validator

  const dbUsers = () => {
    return eval('app.db("users")')
  }
  const dbEducations = () => {
    return eval('app.db("users_educations")')
  }

  /* -----------------------ADD EDUCATION----------------------- */
  const addEducation = async (req, res) => {
    const userId = req.params.user_id
    const data = req.body
    const existsUser = await dbUsers().where({user_id: userId}).first()
    const existsEducation = await dbEducations().where({user_id: userId}).first()

    try {

      existsOrError(existsUser, 'Usuário não existe')
      objectValueOrError(data, 'Não pode existir campos vazios')
      notExistsOrError(existsEducation, 'Contato já cadastrado')

      existsOrError(data.title, 'Insira o título')
      existsOrError(data.duration, 'Insira a duração')
      if(isNaN(data.duration)) throw 'Apenas números'
      existsOrError(data.dateStart, 'Insira a data de inicio')
      existsOrError(data.dateFinish, 'Insira a data de finalização')
      existsOrError(data.about, 'Escreva um pouco do aprendizado.')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return dbEducations().insert({
            user_id: userId,
            education_title: data.title,
            education_duration: data.duration,
            education_date_start: data.dateStart,
            education_date_finish: data.dateFinish,
            education_about: data.about,
            })
            .where({user_id: userId})
            .then( () => res.status(201).send('Criado!'))
            .catch( error => res.sendStatus(500))
  }
  /* -----------------------GET EDUCATION----------------------- */
  const getEducation = async (req, res) => {
    const userId = req.params.user_id
    const existsEducation = await dbEducations().where({user_id: userId}).first()

    try {
      if(isNaN(userId)) throw 'user_id tem que ser número'
      existsOrError(existsEducation, 'Usuário não encontrado')
    } catch(error) {
      return res.status(400).send(error)
    }
  
    return dbEducations().where({
            user_id: userId
            })
            .first()
            .then( result => res.status(200).send(result))
            .catch( error => res.sendStatus(500))
  }
  /* -----------------------UPDATE EDUCATION----------------------- */
  const updateEducation = (req, res) => {
    const userId = req.params.user_id
    const data = req.body

    try {

      if(isNaN(userId)) throw 'user_id não é número'
      objectValueOrError(data, 'Não pode existir campos vazios')

    } catch(error) {
      return res.status(400).send(error)
    }

    return dbEducations().update({
                address: data.address,
                phone: data.phone,
                email: data.email,
                github: data.github,
                linkedin: data.linkedin,
                facebook: data.facebook,
                })
                .where({ user_id: userId })
                .then( () => res.status(200).send('FOI'))
                .catch( error => res.status(500).send(error))
  }



  return {
    addEducation,
    getEducation,
    updateEducation
  }
}