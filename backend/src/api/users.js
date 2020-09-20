

module.exports = app => {

    
  
  const User = app.models.user
    
  const { existsOrError,
          notExistsOrError,
          existsValueForUpdate,
          contentObjectOrError } = app.models.validator

  const db = app.api.dbNames

  const filter = app.models.filters




  /* -----------------------ADD USER----------------------- */

  const addUser = async (req, res) => {
  
    const data = { ...req.body }
    
    try {

      existsOrError(data.username, 'Insira o usuário.')
      existsOrError(data.password, 'Insira a senha.')
      existsOrError(data.fullName, 'Insira o nome completo.')
      existsOrError(data.profession, 'Qual sua profissão ?')
      existsOrError(data.about, 'Escreva sobre você.')
      
      //if exists data.username
      notExistsOrError(await new User().exists(data.username), 'Nome do perfil já cadastrado!')

    } catch(error) {
      return res.status(406).send(error)
    }
    data.password = new User().encrypt(data.password)
    
    return await new User(data).add()
      .then(() => res.status(201).send('Perfil criado com sucesso!'))
      .catch(error => {
        console.log(error)
        res.status(500).send('Erro ao criar perfil. Erro:500')
      })

  }

  /* -----------------------GET USER----------------------- */
  
  const getUser = async (req, res) => {
    const userId = req.params.user_id

    try {
      
      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(await new User().exists(userId), 'Usuário não encontrado!') 

    } catch(error) {
      return res.status(404).send(error)
    }

    return new User().get(userId)
      .then( result => {

          if (result.experiences_id != null) {
            result.experiences_id = result.experiences_id.split(',')
          }
          if (result.skills_id != null) {
            result.skills_id = result.skills_id.split(',')
          } 
          if (result.projects_id != null) {
            result.projects_id = result.projects_id.split(',')
          }
          if (result.educations_id != null) {
            result.educations_id = result.educations_id.split(',')
          }
        result = filter.changeUnderlineToUpperCase(result)
        
        return res.status(200).send(result)
      
      })
      .catch(error => {
        console.error(error)
        return res.status(500).send(error)
      })

  }

  /* -----------------------UPDATE USER----------------------- */

  const updateUser = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const userData = await db.Users().where({ id: userId }).first()

    try {

      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(userData, 'Usuário não encontrado.')

      existsValueForUpdate(data, userData)
      contentObjectOrError(data, 'Não deixe campos vazios.')

      if (data.password) {

        existsOrError(data.newPassword, 'Escolha uma nova senha.')

        if (new User().compareEncrypt(data.password, userData.password)) {
          data.newPassword = await new User().encrypt(data.newPassword)
        } else throw 'Senha errada!'

      } else data.newPassword = undefined

      
    } catch(error) {
      return res.status(406).send(error)
    }

    return db.Users().update({
              password: data.newPassword,
              full_name: data.fullName,
              profession: data.profession,
              permission: data.permission,
              avatar: data.avatar,
              about: data.about,
            })
            .where({
              id: userId
            })
            .then( () => res.status(200).send('Usuário atualizado com sucesso.'))
            .catch( error => res.status(500).send(error))
  }
  /* -----------------------DELETE USER----------------------- */
  const deleteUser = async (req, res) => {

    const userId = req.params.user_id
    const userData = await db.Users().where({ id: userId }).first()

    try {
      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(userData, 'Usuário não existe.')
    } catch(error) {
      return res.status(400).send(error)
    }

    return db.Users()
            .where({ id: userId })
            .first()
            .del()
            .then( () => res.status(200).send('Todas as informações deste perfil foram excluidos.'))
            .catch( error => res.status(400).send('Erro 500 inesperado.'))
            
  }

  return {
    addUser,
    getUser,
    updateUser,
    deleteUser
  }
}