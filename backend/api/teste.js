module.exports = app => {
	const teste = (req, res) => {
		res.send('Teste foi')
	}

	return { teste }
}