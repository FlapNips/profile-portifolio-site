const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db.js')
//const mongose = require('mongose')
app.db = db
//Configuração
consign()
	.then('./config/middlewares.js')
	.then('./api/validator.js')
	.then('./api')
	.then('./config/routes.js')
	.into(app)
//Rotas

//Outros
app.listen(3000, () => {
	console.log('Servidor Iniciado na porta 3000! ')
})