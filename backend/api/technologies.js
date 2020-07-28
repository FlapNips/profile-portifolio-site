module.exports = app => {

	const { existsOrError } = app.api.validator

	const addTechnology = (req, res) => {

		const technologyInfo = { ...req.body }

		try {
			existsOrError(technologyInfo.icon, 'Qual o nome do icone ?')
			existsOrError(technologyInfo.img, 'Qual a imagem ?')
		} catch(error) {
			return res.status(400).send(error)
		}
	
		return app.db('all_technologies')
						.insert( {
							icon: technologyInfo.icon,
							img: technologyInfo.img
						})
						.then( () => res.sendStatus(201) )
						.catch( () => res.senStatus(400))
	}

	const getTechnology = (req, res) => {
		return app.db('all_technologies')
						.where({ id: req.params.id })
						.then( info => res.status(200).send(info) )
						.catch( error => res.sendStatus(400) )
	
	}

	const updateTechnology = (req, res) => {
		return app.db('all_technologies')
						.update({
							icon: req.body.icon,
							img: req.body.img
						})
						.where({ id: req.params.id })
						.then( () => res.sendStatus(202) )
						.catch( () => res.sendStatus(400) )

	}

	const deleteTechnology = (req, res) => {
		return app.db('all_technologia')
						.where({ id: req.params.id })
						.del()
						.then( () => res.sendStatus(201) )
						.catch( () => res.sendStatus(400) )
	}

	const getAllTechnologies = (req, res) => {
		return app.db('all_technologies')
						.select('icon', 'img')
						.then( elements => res.status(200).send(elements))
						.catch( error => console.log(error))
	}
	return { 
		addTechnology,
		getTechnology,
		updateTechnology,
		deleteTechnology,
		getAllTechnologies
	}
}