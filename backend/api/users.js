const bcrypt = require('bcrypt')

module.exports = app => {

  const { existsOrError,
          notExistsOrError,
          existsValueForUpdate,
          objectValueOrError } = app.api.validator

  const db = () => {
    return eval('app.db("users")')
  }

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  /* -----------------------ADD USER----------------------- */

  const addUser = async (req, res) => {
  
    const data = req.body
    const existsUsername = await db().where({username: data.username}).first()

    try {

      existsOrError(data.username, 'Insira o usuário')
      existsOrError(data.password, 'Insira a senha')
      existsOrError(data.fullName, 'Insira o nome completo')
      existsOrError(data.profession, 'Qual sua profissão ?')
      existsOrError(data.about, 'Escreva sobre você')
      
      notExistsOrError(existsUsername, 'Usuário já existe !')

    } catch(error) {
      return res.status(406).send(error)
    }

    data.password = encryptPassword(data.password)

    return db().insert({
              username: data.username,
              password: data.password,
              full_name: data.fullName,
              profession: data.profession,
              avatar: data.avatar,
              about: data.about
              })
            .then(() => res.status(201).send('USUARIO CRIADO !'))
            .catch( error => res.status(400).send('ERRO AO CRIAR USUARIO'))

  }

  /* -----------------------GET USER----------------------- */
  
  const getUser = async (req, res) => {
    const userId = req.params.user_id
    
      const existsUser = 
        await db().where({
          user_id: userId
        }).first()

      try {
        if(existsUser === undefined) throw 'Usuário não encontrado!'
      } catch(error) {
        return res.status(404).send(error)
      }

      return res.status(200).send(existsUser)
  }

  /* -----------------------UPDATE USER----------------------- */

  const updateUser = async (req, res) => {
    const userId = req.params.user_id
    const data = req.body
    const userData = await db().where({user_id: userId}).first()
    
    //validation

    try {
      if(isNaN(userId)) throw 'O user_id precisa ser número!'
      existsValueForUpdate(data, userData)
      existsOrError(userData, 'Usuário não existe')
      objectValueOrError(data, 'Não deixe campos vazios!')

      if(data.password) {
        if(bcrypt.compareSync(data.password, userData.password)){
          data.newPassword = bcrypt.hashSync(data.newPassword, 10)
        } else throw 'Senha errada!'
      } else data.newPassword = undefined
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return db().update({
              password: data.newPassword,
              full_name: data.fullName,
              profession: data.profession,
              permission: data.permission,
              avatar: data.avatar,
              about: data.about,
            })
            .where({
              user_id: userId
            })
            .then( () => res.status(200).send('Atualizado!'))
            .catch( error => res.status(500).send(error))
  }
  /* -----------------------DELETE USER----------------------- */
  const deleteUser = async (req, res) => {

    const userId = req.params.user_id
    const userData = await db().where({ user_id: userId }).first()

    try {
      if(userData === undefined) throw 'Usuário não existe!'
    } catch(error) {
      return res.status(400).send(error)
    }

    return db().where({ user_id: userId })
            .first()
            .del()
            .then( () => res.status(200).send('DELETADO !'))
            .catch( error => res.status(400).send(error))
            
  }

  return {
    addUser,
    getUser,
    updateUser,
    deleteUser
  }
}