// @flow
module.exports = app => {

  const { existsOrError,
          existsValueForUpdate,
          contentObjectOrError } = app.models.validator

  const db = app.api.dbNames

  /* -----------------------ADD PROJECT----------------------- */
  const addProject = async (req, res) => {
    const userId = req.params.user_id
    const data = { ...req.body }
    const userExists = await db.Users().where({ id: userId }).first()

    //Verification to continue
    try {
      if (isNaN(userId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(userExists, 'Usuário não existe.')

      contentObjectOrError(data, 'Não pode existir campos vazios.')
      existsOrError(data.title, 'Insira um título.')
      existsOrError(data.subtitle, 'Insira um subtítulo.')

      existsOrError(data.list, 'Escreva as principais atividades.')
      if (!Array.isArray(data.list)) throw 'LIST deve ser um Array.'

      existsOrError(data.skills, 'Defina pelo menos uma habilidade.')
      if (!Array.isArray(data.skills)) throw 'SKILLS deve ser um Array.'

      existsOrError(data.about, 'Escreva um pouco sobre o projeto.')

      existsOrError(data.dateStart, 'Insira a data de início.')
      if (!new Date(data.dateStart).isDate()) throw 'Insira uma data de início válida.'

      existsOrError(data.dateFinish, 'Insira a data de finalização.')
      if (!new Date(data.dateFinish).isDate()) throw 'Insira uma data de finalização válida.'

    } catch(error) {
      return res.status(400).send(error)
    }

    //Transform array in text
    data.list = data.list.join(';')

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
        
        //Transform in object
        const result = data.skills.map( element => {
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
      return res.status(201).send('Criado com sucesso.')
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
      
      if (isNaN(projectId)) throw 'O parâmetro precisa ser numérico.'
     existsOrError(project, 'Nenhum projeto encontrado.')
      
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
      
      if (isNaN(projectId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(projectsUser, 'Nenhum projeto encontrado.')

      if (data.skills) {
        if (!Array.isArray(data.skills)) throw 'SKILLS precisa ser um Array.'
      }
      if (data.list) {
        if (!Array.isArray(data.list)) throw 'LIST precisa ser um Array.'
        //Transform Array in string.
        data.list = data.list.join(';')
      }

      existsValueForUpdate(data, projectsUser)
      contentObjectOrError(data, 'Não pode haver campos em branco.')

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
        
        //Transform in Object
        const skills = data.skills.map(element => {
          return {
            projects_id: projectId,
            skills_id: element
          }
        })
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

      if (isNaN(projectId)) throw 'O parâmetro precisa ser numérico.'
      existsOrError(project, 'Projeto não encontrado.')
      
    } catch(error) {
      return res.status(400).send(error)
    }

    
    //Delete project and skills in table TABLE TBX_SKILLS_PROJECTS
    return db.Projects()
      .del()
      .where({ id: projectId})
      .then(() => res.status(200).send('Deletado com sucesso.'))
      .catch( error => res.status(500).send('Erro 500 inesperado.'))
  }


  return {
    addProject,
    getProject,
    updateProject,
    deleteProject
  }
}