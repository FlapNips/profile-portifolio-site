require('dotenv').config({
	path:
		process.env.NODE_ENV === 'development' ? '.env' : `.env.${process.env.NODE_ENV}`
})

const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db.js')

app.db = db

//Consign Config
const options = {
	locale: 'pt-br',
	cwd: 'src',
	verbose: process.env.NODE_ENV === 'test' ? false : true
}
//Config
consign(options)
	.then('./config/middlewares/global.js')
	.then('./api/dbNames.js')
	.then('./config/db.js')
	.then('./models')
	.then('./api')
	.then('./config/middlewares/afterRequestGet.js')
	.then('./config/routes.js')
	.into(app)

module.exports = app