require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env'
})

const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db.js')

//const mongose = require('mongose')
app.db = db

//Consign
const options = {
	locale: 'pt-br',
	cwd: 'src',
	verbose: process.env.NODE_ENV === 'test' ? false : true
}
//Configuração
consign(options)
	.then('./config/middlewares.js')
	.then('./api/validator.js')
	.then('./api/dbNames.js')
	.then('./models')
	.then('./api')
	.then('./config/routes.js')
	.into(app)

module.exports = app