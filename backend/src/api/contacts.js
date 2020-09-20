module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          contentObjectOrError,
          existsValueForUpdate
        } = app.models.validator

  const db = app.api.dbNames

    const filter = app.models.filters   

  /* -----------------------ADD CONTACT----------------------- */

  const addContact = async (req, res) => {

    const userId = req.params.user_id
    const data = { ...req.body }

    try {

      if(isNaN(userId)) throw 'Parâmetro precisa ser numérico.'
      const existsUser = await db.Users().where({ id: userId }).first()
      const existsContact = await db.Contacts().where({ users_id: userId }).first()

      existsOrError(existsUser, 'Usuário não existe.')
      notExistsOrError(existsContact, 'Informação já criada. Atualize.')

      contentObjectOrError(data, 'Não pode existir campos vazios.')

      existsOrError(data.address, 'Insira o endereço.')
      existsOrError(data.phone, 'Insira o celular.')
      if(isNaN(data.phone)) throw 'O celular deve ter apenas números.'
      existsOrError(data.email, 'Insira o email.')
      
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Contacts()
      .insert({
        users_id: userId,
        address: data.address,
        phone: data.phone,
        email: data.email,
        github: data.github,
        linkedin: data.linkedin,
        facebook: data.facebook,
        update_time: new Date().toLocaleString()
      })
      .then( () => res.status(201).send('Informações criadas com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  /* -----------------------GET CONTACT----------------------- */

  const getContact = async (req, res) => {

    const userId = req.params.user_id

    try {
      if(isNaN(userId)) throw 'Parâmetro precisa ser numérico.'
      const existsContact = await db.Contacts().where({ users_id: userId }).first()

      existsOrError(existsContact, 'Usuário não existe.')

    } catch(error) {
      return res.status(400).send(error)
    }
  
    return db.Contacts()
      .where({
        users_id: userId
      })
      .first()
      .then(result => {
      
        result = filter.changeUnderlineToUpperCase(result)

        return res.status(200).send(result)
      })
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  /* -----------------------UPDATE CONTACT----------------------- */

  const updateContact = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }

    try {

      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      
      const existsContact = await db.Contacts().where({ users_id: userId }).first()
      existsOrError(existsContact, 'Usuário não encontrado.')

      existsValueForUpdate(data, existsContact)
      contentObjectOrError(data, 'Não pode haver campos em branco.')
      

    } catch(error) {
      return res.status(406).send(error)
    }

    return db.Contacts()
      .update({
        address: data.address,
        phone: data.phone,
        email: data.email,
        github: data.github,
        linkedin: data.linkedin,
        facebook: data.facebook,
        update_time: new Date().toLocaleString()
      })
      .where({ users_id: userId })
      .then( () => res.status(200).send('Atualizado com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }



  return {
    addContact,
    getContact,
    updateContact
  }
}