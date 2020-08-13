

module.exports = app => {

  const { existsOrError,
          existsValueForUpdate,
          objectValueOrError } = app.api.validator

  const dbProjects = () => {
    return eval('app.db("users_projects")')
  }
  const dbUsers = () => {
    return eval('app.db("users")')
  }
  const dbPXS = () => {
    return eval('app.db("projects_x_skills")')
  }
  /* -----------------------ADD PROJECT----------------------- */
  const addProject = async (req, res) => {
    const userId = req.params.user_id
    const data = req.body
    const existsUser = await dbUsers().where({ user_id: userId }).first()

    try {

      if(isNaN(userId)) throw 'Insira o ID do usuário!'
      if(existsUser === undefined) throw 'Usuário não encontrado!'
      existsOrError(data.projectTitle, 'Insira o título do projeto')
      existsOrError(data.projectDateStart, 'Insira a data de início')
      existsOrError(data.projectDateFinish, 'Insira a data de finalização')
      existsOrError(data.projectAbout, 'Escreva um pouco sobre o projeto')
      existsOrError(data.projectSkills, 'Escolha ao menos uma tecnologia.')

    } catch(error) {
      return res.status(400).send(error)
    }

    await dbProjects()
    .insert({
      user_id: userId,
      project_title: data.projectTitle,
      project_date_start: data.projectDateStart,
      project_date_finish: data.projectDateFinish,
      project_about: data.projectAbout,
    })
    .then( async lastIncrements => {

      const skills = data.projectSkills.map(element => {
        return {project_id: lastIncrements[0], skill_id: element}
      })

      await dbPXS().insert(skills)
      return res.send('Projeto criado com sucesso!')
    
    })
    .catch( error => console.log(error))
  }
  /* -----------------------GET PROJECT WITH USER----------------------- */
  const getProjectsUser = async (req, res) => {
    const userId = req.params.user_id
    const userData = await dbUsers().where({ user_id: userId}).first()
    const projectsUser = await dbProjects().where({ user_id: userId})

    try {
      if(isNaN(userId)) throw 'O user_id precisa ser número'
      if(userData === undefined) throw 'Usuário não existe!'
      if(projectsUser.length === 0) throw 'Nenhum projeto encontrado!'
    } catch(error) {
      return res.status(400).send(error)
    }
    
    return dbProjects()
    .select([
      'users_projects.project_id',
      'users_projects.project_title',
      'users_projects.project_date_start',
      'users_projects.project_date_finish',
      'users_projects.project_about',
      'users.username',
      app.db.raw('GROUP_CONCAT(skills.skill_name) as skills')
    ])
    .innerJoin('users', function() {
      this.on('users_projects.user_id', '=', 'users.user_id').onIn('users.user_id', [userId])
    })
    .innerJoin('projects_x_skills', 'projects_x_skills.project_id', 'users_projects.project_id')
    .innerJoin('skills', 'skills.skill_id', 'projects_x_skills.skill_id')
    .groupBy('project_id')
    .then( result => res.status(200).send(result))
    .catch( error => res.status(500).send(error))

  }
  /* -----------------------GET PROJECT----------------------- */
  const getProject = async (req, res) => {
    const projectId = req.params.project_id
    const projectsUser = await dbProjects().where({ project_id: projectId})

    try {
      if(isNaN(projectId)) throw 'O project_id precisa ser número'
      if(projectsUser.length === 0) throw 'Nenhum projeto encontrado!'
    } catch(error) {
      return res.status(400).send(error)
    }

    return dbProjects()
    .select([
      'users_projects.project_id',
      'users_projects.project_title',
      'users_projects.project_date_start',
      'users_projects.project_date_finish',
      'users_projects.project_about',
      'users.username',
      app.db.raw('GROUP_CONCAT(skills.skill_name) as skills')
    ])
    .innerJoin('projects_x_skills', 'projects_x_skills.project_id', 'users_projects.project_id')
    .innerJoin('users', function() {
      this.on('users_projects.user_id', '=', 'users.user_id')
        .onIn('users_projects.project_id', [projectId])
    })
    .innerJoin('skills', 'skills.skill_id', 'projects_x_skills.skill_id')
    .groupBy('project_id')
    .first()
    .then( result => res.status(200).send(result))
    .catch( error => res.status(500).send(error))

  }
  /* -----------------------UPDATE PROJECT----------------------- */
  const updateProject = async (req, res) => {
    const projectId = req.params.project_id
    const data = req.body
    const projectsUser = await dbProjects().where({ project_id: projectId}).first()

    try {
      if(isNaN(projectId)) throw 'O project_id precisa ser número'
      if(projectsUser === undefined) throw 'Nenhum projeto encontrado!'
      objectValueOrError(data, 'Não pode existir campos vazios')
      existsValueForUpdate(data, projectsUser)
    } catch(error) {
      return res.status(400).send(error)
    }

    if(data.projectSkills) {
      data.projectSkills = data.projectSkills.map(element => {
        return { project_id: projectId, skill_id: element}
      })
    }


    try {
      await app.db.transaction( async trans => {
        await dbProjects().update({
            user_id: data.userId,
            project_title: data.projectTitle,
            project_date_start: data.projectDateStart,
            project_date_finish: data.dateProjectDateFinish,
            project_about: data.projectAbout
          })
          .where({ project_id: projectId })
          .transacting(trans)
        await dbPXS().del().where({ project_id: projectId }).transacting(trans)
        await dbPXS().insert(data.projectSkills).transacting(trans)

      return res.send('Atualizado')

      })
    } catch(error) {
      return res.send('Erro, tudo desfeito!')
    }

  }
  /* -----------------------DELETE PROJECT----------------------- */
  const deleteProject = async (req, res) => {
    const projectId = req.params.project_id
    const existsProject = await dbProjects().where({ project_id: projectId}).first()

    try {

      if(isNaN(projectId)) throw 'O project_id precisa ser número'
      if(existsProject === undefined) throw 'Projeto não encontrado!'
      
    } catch(error) {
      return res.status(400).send(error)
    }

    return dbProjects()
      .del()
      .where({ project_id: projectId})
      .then(() => res.status(200).send('Deletado!'))
      .catch( error => res.status(500).send(error))
  }


  return {
    addProject,
    getProjectsUser,
    getProject,
    updateProject,
    deleteProject
  }
}