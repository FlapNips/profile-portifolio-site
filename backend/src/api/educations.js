module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          validateDate,
          contentObjectOrError 
        } = app.api.validator

  const db = app.api.dbNames


  /* -----------------------ADD EDUCATION----------------------- */
  const addEducation = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const existsUser = await db.Contacts().where({users_id: userId}).first()
    

    try {

      if(isNaN(userId)) throw 'O parâmetro precisa ser númerico.'
      existsOrError(existsUser, 'Perfil não encontrado.')
      contentObjectOrError(data, 'Não pode existir campos vazios')

      existsOrError(data.title, 'Insira um título.')

      existsOrError(data.duration, 'Insira a duração.')
      if(isNaN(data.duration)) throw 'Apenas números'

      existsOrError(data.about, 'Escreva um pouco do aprendizado.')

      existsOrError(data.dateStart, 'Insira a data de inicio')
      if(!new Date(data.dateStart).isDate()) throw 'Insira um mês de início válido.'

      existsOrError(data.dateFinish, 'Insira a data de finalização')
      if(!new Date(data.dateFinish).isDate()) throw 'Insira um mês de início válido.'
      
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
            .then( () => res.status(201).send('Criado com sucesso!'))
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }
  /* -----------------------GET EDUCATION----------------------- */
  const getEducation = async (req, res) => {
    const educationId = req.params.education_id
    const existsEducation = await db.Educations().where({id: educationId}).first()

    try {

      if(isNaN(educationId)) throw 'O parâmetro precisa ser númerico.'
      existsOrError(existsEducation, 'Educação não encontrada.')
      
    } catch(error) {
      return res.status(400).send(error)
    }
  
    return db.Educations()
            .where({
              id: educationId
            })
            .first()
            .then( result => res.status(200).send(result))
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }
  /* -----------------------UPDATE EDUCATION----------------------- */
  const updateEducation = (req, res) => {
    const contactId = req.params.contact_id
    const data = { ...req.body }
    const existsEducation = db.Educations().where({ id: contactId }).first()

    try {

      if(isNaN(contactId)) throw 'O parâmetro precisa ser númerico.'
      existsOrError(existsEducation, 'Educação não encontrada.')
      contentObjectOrError(data, 'Não pode existir campos vazios')

    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Educations()
              .update({
                address: data.address,
                phone: data.phone,
                email: data.email,
                github: data.github,
                linkedin: data.linkedin,
                facebook: data.facebook,
              })
              .where({ id: contactId })
              .then( () => res.status(200).send('Atualizado com sucesso.'))
              .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }



  return {
    addEducation,
    getEducation,
    updateEducation
  }
}