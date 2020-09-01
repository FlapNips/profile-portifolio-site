const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {

	app.use(bodyParser.json())
	app.use(cors())
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use(function (req, res, next) {
		
		const data = { ...req.body }

		Object.keys(data).forEach( newKey => {
			const oldKey = newKey
			newKey = newKey.split('_')
			newKey.forEach( (key, index) => {
				if (index > 0) {
					newKey[index] = key.charAt(0).toUpperCase() + key.slice(1)
				}
			})
			newKey = newKey.join('')
			if (oldKey !== newKey) {
				data[newKey] = data[oldKey]
				delete data[oldKey]
			}
		})
		req.body = data
		next()

	})
}