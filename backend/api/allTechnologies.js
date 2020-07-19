module.exports = app => {
	const getAllTechnologies = (req, res) => {
		app.db('all_technologies')
			.select('icon')
			.select('img')
			.then( elements => res.status(200).send(elements))
			.catch( error => console.log(error))
	}
	const addAllTechnologies = (req, res) => {
	
	
	}
	const modifyAllTechnologies = (req, res) => {
	
	
	}
	return { getAllTechnologies }
}