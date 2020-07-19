module.exports = app => {
	const { existsOrError} = app.api.validator
	const getExperiences = (req, res) => {
		app.db('experiences_aboutme')
			.column('title', 'date_concluded', 'duration_experience', 'content_activity', 'content_technologies')
			.then(x => res.status(200).send(x))
			.catch(error => res.status(400).send(error))
	
	}
	const addExperience = (req, res) => {
		const add = { ... req.body }
		try {
			existsOrError(add.title, 'Defina um titulo.')
			existsOrError(add.dateConcluded, 'Defina a data concluído.')
			existsOrError(add.durationExperience, 'Defina a duração da experiência.')
			existsOrError(add.contentActivity, 'Descreva as atividades.')
			existsOrError(add.contentTechnologies, 'Escolhar as tecnologias usadas.')
		} catch(error) {
			res.status(400).send(error)
		}
	
	}
	const modifyExperience = (req, res) => {
	
	
	}
	const removeExperience = (req, res) => {
	
	}
	return { getExperiences }
}