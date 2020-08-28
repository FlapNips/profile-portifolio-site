module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          contentObjectOrError 
        } = app.api.validator

  const db = app.api.dbNames


  /* -----------------------ADD CONTACT----------------------- */

  const addContact = async (req, res) => {

    const userId = req.params.user_id
    const data = { ...req.body }
    const existsUser = await db.Users().where({ id: userId }).first()
    const existsContact = await db.Contacts().where({ users_id: userId }).first()

    try {

      if(isNaN(userId)) throw 'Parâmetro precisa ser númerico!'
      existsOrError(existsUser, 'Usuário não existe')
      existsOrError(existsContact, 'Informação já criada. Atualize!')

      contentObjectOrError(data, 'Não pode existir campos vazios')

      existsOrError(data.address, 'Insira o endereço')

      existsOrError(data.phone, 'Insira o celular')
      if(isNaN(data.phone)) throw 'Apenas números'
      
      existsOrError(data.email, 'Insira o email')
      
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
            .then( () => res.status(201).send('Informações criadas com sucesso!'))
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  /* -----------------------GET CONTACT----------------------- */

  const getContact = async (req, res) => {

    const userId = req.params.contact_id
    const existsContact = await db.Contacts().where({ users_id: userId }).first()

    try {
      if(isNaN(userId)) throw 'Parâmetro precisa ser númerico!'
      existsOrError(existsContact, 'Usuário não encontrado')

    } catch(error) {
      return res.status(400).send(error)
    }
  
    return db.Contacts()
            .where({
              users_id: userId
            })
            .first()
            .then( result => {
              return res.status(200).send(result)
            })
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  /* -----------------------UPDATE CONTACT----------------------- */

  const updateContact = (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }

    try {

      if(isNaN(userId)) throw 'user_id não é número'
      contentObjectOrError(data, 'Não pode existir campos vazios')

    } catch(error) {
      return res.status(400).send(error)
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
            .then( () => res.status(200).send('Atualizado com sucesso!'))
            .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }



  return {
    addContact,
    getContact,
    updateContact
  }
}