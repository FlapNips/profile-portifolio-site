module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          objectValueOrError 
        } = app.api.validator

  const dbUsers = () => {
    return eval('app.db("users")')
  }
  const dbContact = () => {
    return eval('app.db("users_contact")')
  }

  /* -----------------------ADD CONTACT----------------------- */
  const addContact = async (req, res) => {
    const userId = req.params.user_id
    const data = req.body
    const existsUser = await dbUsers().where({user_id: userId}).first()
    const existsContact = await dbContact().where({user_id: userId}).first()

    try {

      existsOrError(existsUser, 'Usuário não existe')
      objectValueOrError(data, 'Não pode existir campos vazios')
      notExistsOrError(existsContact, 'Contato já cadastrado')

      existsOrError(data.address, 'Insira o endereço')
      existsOrError(data.phone, 'Insira o celular')
      if(isNaN(data.phone)) throw 'Apenas números'
      existsOrError(data.email, 'Insira o email')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return dbContact().insert({
        user_id: userId,
        address: data.address,
        phone: data.phone,
        email: data.email,
        github: data.github,
        linkedin: data.linkedin,
        facebook: data.facebook,
      })
      .where({user_id: userId})
      .then( () => res.status(201).send('Criado!'))
      .catch( error => res.sendStatus(500))
  }
  /* -----------------------GET CONTACT----------------------- */
  const getContact = async (req, res) => {
    const userId = req.params.user_id
    const existsContact = await dbContact().where({user_id: userId}).first()

    try {
      if(isNaN(userId)) throw 'user_id tem que ser número'
      existsOrError(existsContact, 'Usuário não encontrado')
    } catch(error) {
      return res.status(400).send(error)
    }
  
    return dbContact().where({
        user_id: userId
      })
      .first()
      .then( result => res.status(200).send(result))
      .catch( error => res.sendStatus(500))
  }
  /* -----------------------UPDATE CONTACT----------------------- */
  const updateContact = (req, res) => {
    const userId = req.params.user_id
    const data = req.body

    try {

      if(isNaN(userId)) throw 'user_id não é número'
      objectValueOrError(data, 'Não pode existir campos vazios')

    } catch(error) {
      return res.status(400).send(error)
    }

    return dbContact().update({
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
    addContact,
    getContact,
    updateContact
  }
}