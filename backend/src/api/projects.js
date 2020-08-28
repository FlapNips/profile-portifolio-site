// @flow
module.exports = app => {

  const { existsOrError,
          existsValueForUpdate,
          contentObjectOrError } = app.api.validator

  const db = app.api.dbNames

  /* -----------------------ADD PROJECT----------------------- */
  const addProject = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const userProject = await db.Users().where({ id: userId }).first()

    //Verification to continue
    try {
      if (isNaN(userId)) throw 'Insira o ID do usuário!'
      existsOrError(userProject, 'Usuário não encontrado!')
      existsOrError(data.title, 'Insira o título do projeto')
      existsOrError(data.subtitle, 'Insira o subtítulo do projeto')
      existsOrError(data.list, 'Escreva as principais atividades.')
      if (!Array.isArray(data.skills)) throw 'Escolha ao menos uma habilidade.'
      existsOrError(data.about, 'Escreva um pouco sobre o projeto')
      
      existsOrError(data.dateStart, 'Insira a data de início')
      if (!new Date(data.dateStart).isDate()) throw 'Insira uma data de início válida.'

      existsOrError(data.dateFinish, 'Insira a data de finalização')
      if (!new Date(data.dateFinish).isDate()) throw 'Insira uma data de finalização válida.'

    } catch(error) {
      return res.status(400).send(error)
    }

    //Check all operations is success or undo operations
    app.db.transaction(async trans => {
      
      //Add DATA to projects
      const projectId = await db.Projects()
        .transacting(trans)
        .insert({
          users_id: userId,
          title: data.title,
          subtitle: data.subtitle,
          about: data.about,
          list: data.list,
          date_start: new Date(data.dateStart),
          date_finish: new Date(data.dateFinish),
        })
      
      //Add skills in TBX_SKILLS_PROJECTS only if exists
      if (data.skills) {
        data.skills = data.skills.map( element => {
            return {
              projects_id: projectId[0],
              skills_id: element
            }
          })
        await db.SXP()
          .transacting(trans)
          .insert(result)
      }
    
      
    })
    .then( () => {
      return res.status(200).send('Projeto adicionado com sucesso.')
    })
    .catch( error => {
      return res.status(500).send('Erro 500 inesperado.')
    });
  }

  
/* -----------------------GET PROJECT----------------------- */
  
  const getProject = async (req, res) => {
    const projectId = req.params.project_id
    const project = await db.Projects().where({ id: projectId}).first()

    
    //Verification to continue
    try {
      
      if (isNaN(projectId)) throw 'O parâmetro precisa ser númerico.'
     existsOrError(project, 'Nenhum projeto encontrado!')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    //Return DATA to project + skills
    return db.Projects()
      .select([
        'tb_projects.*',
        app.db.raw('GROUP_CONCAT(tbx_skills_projects.skills_id) as skills')
      ])
      .leftJoin('tbx_skills_projects', function () {
        this.on('tb_projects.id', 'tbx_skills_projects.projects_id')
          .onIn('tbx_skills_projects.projects_id', projectId)
      })
      .first()
      .then(result => {
        
        //Transform in Array if exists
        if (result.list) result.list = result.list.split(';')
        if (result.skills) result.skills = result.skills.split(';')
  
        res.status(200).send(result)
      })
      .catch(error => res.status(500).send(error))
  }
  

/* -----------------------UPDATE PROJECT----------------------- */
  
  const updateProject = async (req, res) => {
    const projectId = req.params.project_id
    const data = { ...req.body }
    const projectsUser = await db.Projects().where({ id: projectId}).first()

    //Verification DATA to continue
    try {
      
      if (isNaN(projectId)) throw 'O parâmetro precisa ser númerico'
      existsOrError(projectsUser, 'Nenhum projeto encontrado!')
      if (!Array.isArray(data.skills)) throw 'Skills precisa ser um Array.'
      contentObjectOrError(data, 'Não pode existir campos vazios')
      existsValueForUpdate(data, projectsUser)

    } catch(error) {
      return res.status(400).send(error)
    }


    //Check all operations is success or undo operations
    return app.db.transaction(async trans => {
      
      //Update project
      await db.Projects()
        .transacting(trans)
        .update({
          title: data.title,
          subtitle: data.subtitle,
          about: data.about,
          list: data.list,
          link: data.link,
          date_start: data.dateStart,
          date_finish: data.dateFinish,
          })
        .where({ id: projectId })
      
      //Update skills in TBX_SKILLS_PROJECTS only if exists alteration
      if (data.skills) {
        const skills = data.skills.map(element => {
          return { projects_id: projectId, skills_id: element}
        })
        console.log(skills)
        await db.SXP().del().where({ projects_id: projectId }).transacting(trans)
        await db.SXP().insert(skills).transacting(trans)
      }

    })
    .then( () => res.status(200).send('Atualizado com sucesso.'))
    .catch(error => {
      console.log(error)
      return res.status(500).send('Erro 500 inesperado.')
    })

  }
  /* -----------------------DELETE PROJECT----------------------- */
  const deleteProject = async (req, res) => {
    const projectId = req.params.project_id
    const project = await db.Projects().where({ id: projectId}).first()

    
    //Verification DATA to continue
    try {

      if (isNaN(projectId)) throw 'O project_id precisa ser número'
      existsOrError(project, 'Projeto não encontrado!')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    
    //Delete project and skills in table TABLE TBX_SKILLS_PROJECTS
    return db.Projects()
      .del()
      .where({ id: projectId})
      .then(() => res.status(200).send('Projeto deletado com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  return {
    addProject,
    getProject,
    updateProject,
    deleteProject
  }
}