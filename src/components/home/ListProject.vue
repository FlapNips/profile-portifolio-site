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
export default {
	data() {
		return {
			projects: [
				{	name: 'DESAFIO DOG',
					router: '',
					img: 'teste',
					color: '#269cc0',
					icons: [
						require('@/assets/vuejs-icon.svg'),
						require('@/assets/javascript-icon.svg')
					],
					content: 'Conteudo1'
				},
				{	name: 'te',
					router: '',
					img: '',
					color: '#2aadd5',
					icons: '',
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
		transform-origin: top left;
	}
	.tecnologia { 
		grid-area: tecnologia;
		transform: skewY(2deg);
		width: 50px;
		height: 50px;
		transform-origin: top left;
	}
	.footer { grid-area: footer; }
	.title-project {
		font-size: 5em;
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