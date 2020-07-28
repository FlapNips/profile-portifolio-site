module.exports = app => {
	const { existsOrError} = app.api.validator

	const addExperience = (req, res) => {
		const experience = { ... req.body }
		try {
			existsOrError(experience.title, 'Defina um titulo.')
			existsOrError(experience.dateConcluded, 'Defina a data concluído.')
			existsOrError(experience.durationExperience, 'Defina a duração da experiência.')
			existsOrError(experience.contentActivity, 'Descreva as atividades.')
			existsOrError(experience.contentTechnologies, 'Escolhar as tecnologias usadas.')
		} catch(error) {
			res.status(400).send(error)
		}
	
	}

	const getExperience = (req, res) => {
	
	}

	const updateExperience = (req, res) => {
	
	
	}

	const deleteExperience = (req, res) => {
	
	}
	const getAllExperiences = (req, res) => {
		app.db('experiences_aboutme')
			.column('title', 'date_concluded', 'duration_experience', 'content_activity', 'content_technologies')
			.then(x => res.status(200).send(x))
			.catch(error => res.status(400).send(error))
	
	}
	return {
		addExperience,
		getExperience,
		updateExperience,
		deleteExperience,
		getAllExperiences
		}
}