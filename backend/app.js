const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
//const mongose = require('mongose')

//Configuração
	//bodyParser
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json)
//Rotas

//Outros
app.listen(3000, () => {
	console.log('Servidor Iniciado!')

})