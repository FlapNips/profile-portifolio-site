module.exports = app => {
	const getTechnologies = (req, res) => {
		app.db('technology_aboutme')
			.select("icon")
			.select("percent")
			.then( data => res.status(200).send(data))
			.catch(error => res.status(400).send(error))
	}
	const addTechnologies = (req, res) => {
		const body = { ...req.body }
		let resultado = []
		Object.values(body).forEach(value => {
			resultado.push(value)
		})

		try {
			resultado.forEach( value => {
				switch(value.name) {
					case "": throw "Nome não pode ser vazio!"
					case null: throw "Não pode ser nulo!"
					case undefined: throw "Defina um nome!"
				}
			})
		} catch(error) {
			res.status(400).send(error)
		}
		resultado.forEach( value => {
			app.db('technology_aboutme')
				.insert({ icon: value.name, percent: value.percent})
				.then(() => res.redirect('/teste'))
				.catch(error => res.status(400).send(error))	
		})
	}

	return { getTechnologies, addTechnologies }
}