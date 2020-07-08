<template>
	<div>
		<div
		id="division-project"
		v-for="project in projects" 
		:style="`background-color: ${project.color};`" 
		:key="project.name" 
		no-gutters>
				<div class="titulo title-project ml-5">
					{{ project.name }}
				</div>
				<div class="introducao my-auto">
					Introdução
				</div>
				<div class="botoes mx-auto my-auto">
					<b-button class="mx-5 botao">
						<div>VISITAR PROJETO REAL</div>
					</b-button>
					<b-button :id="project.name" class="mx-5 botao">
						<div>PREVIEW</div>
					</b-button>
					<b-tooltip :target="project.name" placement="right">
						<b-img :src="project.img"/>
					</b-tooltip>
				</div>
				<div class="conteudo">
					{{ project.content }}
				</div>
				<div class="text-center">
					Tecnologias:
					<b-img v-for="icon in project.icons" :key="icon" class="tecnologia mx-3" :src="icon"/>
				</div>
				<div class="footer mt-auto">
					footeraaaaaaaaaaaaaaaa
				</div>
		</div>
	</div>
</template>

<script>

const vuejs = require('@/assets/vuejs-icon.svg')
const javascript = require('@/assets/javascript-icon.svg')
const api = require('@/assets/api-icon.svg')
const nodejs = require('@/assets/nodejs-icon.svg')
const mysql = require('@/assets/mysql-icon.svg')
const psql = require('@/assets/postgresql-icon.svg')
const firebase = require('@/assets/firebase-icon.svg')
const bootstrap = require('@/assets/bootstrap-icon.svg')
const docker = require('@/assets/docker-icon.svg')
const html5 = require('@/assets/html5-icon.svg')
const css3 = require('@/assets/css3-icon.svg')
const sass = require('@/assets/sass-icon.svg')

export default {
	data() {
		return {
			
			projects: [
				{	name: '# DESAFIO DOG',
					router: '',
					img: 'teste',
					color: '#269cc0',
					icons: [
						vuejs,
						javascript,
						api,
						html5,
						css3,
						sass
					],
					content:	'Objetivo: Permitir a criação de uma imagem com um nome estilizado selecionando uma raça.'
				},
				{	name: 'te',
					router: '',
					img: '',
					color: '#2aadd5',
					icons: [
						nodejs,
						mysql,
						psql,
						firebase,
						bootstrap,
						docker,
						html5,
						css3,
						sass
					],
					content: 'Conteudo2'
				},
				{	name: 'teste1',
					router: '',
					img: '',
					color: '#3fb5d9',
					icons: '',
					content: 'Conteudo'
				},
				{	name: 'teste2',
					router: '',
					img: '',
					color: '#55bddd',
					icons: '',
					content: 'Conteudo'
				},
				{	name: 'teste3',
					router: '',
					img: '',
					color: '#55bddd',
					icons: '',
					content: 'Conteudo'
				},
				{	name: 'teste4',
					router: '',
					img: '',
					color: '#7fcee6',
					icons: '',
					content: 'Conteudo'
				},
			]
		}
	}
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap');

#division-project {
	display: grid;
	grid-template-areas:	"titulo introducao"
							"botoes conteudo"
							"tecnologia footer";
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 3fr 1fr;
	margin: 0;
	padding: 0;
	height: 500px;
	transform: skewY(-2deg);
	transform-origin: top left;
	.titulo { 
		grid-area: titulo; 
		transform: skewY(2deg); 
		transform-origin: top left;
	}
	.introducao { 
		grid-area: introducao;
		font-size: 3em;
		transform: skewY(2deg); 
		transform-origin: top left;
	}
	.botoes { 
		grid-area: botoes; 
		transform: skewY(2deg); 
		transform-origin: top left;
	}
	.conteudo { 
		grid-area: conteudo;
		transform: skewY(2deg); 
		font-family: 'Heebo', sans-serif;
		transform-origin: top left;
	}
	.tecnologia { 
		grid-area: tecnologia;
		transform: skewY(2deg);
		width: 70px;
		height: 70px;
		transform-origin: top left;
	}
	.footer { grid-area: footer; }
	.title-project {
		font-size: 4em;
		vertical-align: center;
	}
	.botao {
		background-color: black;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		&:hover {
			background-color: white;
			color: black;
		}
	}
}
.list-project {
	height: 500px;
	width: 120%;
	transform: skewY(-2deg);
	transform-origin: top left;

}
</style>