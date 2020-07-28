const bcrypt = require('bcrypt')

module.exports = app => {
  const { existsOrError } = app.api.validator

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
  const addUser = async (req, res) => {
    const username = req.body.username
    let password = req.body.password
    const permission = req.body.permission

    try {
      existsOrError(username, 'Insira o usuário')
      existsOrError(password, 'Insira a senha')
      existsOrError(permission, 'Insira o nível de permissão')
      if(permission != "admin") {
        if(permission != "user") {
          throw 'Insira uma permissão válida!'
        }
      }
    } catch(error) {
      return res.send(400).send(error)
    }

    password = encryptPassword(password)

    return app.db('users')
            .insert({
              username,
              password,
              permission
              })
            .then(() => res.send(201).send('USUARIO CRIADO !'))
            .catch( error => res.send(400).send('ERRO AO CRIAR USUARIO'))

  }
  const getUser = (req, res) => {
    const userId = req.body.userId
    const username = req.body.username
    if(userId) {
      const userSelected = app.db('users')
                      .where({id: userId})
                      .then( data => res.send(201).send(data) )
                      .catch( error => res.send(400).send(error) )
      return userSelected 
    } else if(username) {
      const userSelected = app.db('users')
                      .where({username: username})
                      .then( data => res.send(201).send(data) )
                      .catch( error => res.send(400).send(error) )
      return userSelected 
    } else {
      return res.send(400).send('Insira o ID do usuário ou o nome !')
    }
  }
  const updateUser = async (req, res) => {

    const userId = req.body.userId
    const username = req.body.username
    let newPassword = req.body.password
    const permission = req.body.permission

    if(userId) {
      newPassword = encryptPassword(newPassword)
      const updateUser = await app.db('users')
                            .update({
                              username: username,
                              password: newPassword,
                              permission: permission
                            })
                            .where({
                              id: userId
                            })
      return updateUser
    } else {
      res.send(400).send('É necessário o ID do usuário !')
    }
  }
  const deleteUser = (req, res) => {
    const userId = req.params.id
    return app.db('users')
            .where({ id: userId })
            .del()
            .then( () => res.send(200).send('DELETADO !'))
            .catch( error => res.send(400).send('ERRO !'))
  }

  return {
    addUser,
    getUser,
    updateUser,
    deleteUser
  }
}