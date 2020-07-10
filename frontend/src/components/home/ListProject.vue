<template>
	<div>
		<div
		id="division-project"
		v-for="(project, index) in projects" 
		:style="`background-color: ${setColor(index)}`" 
		:key="project.id"
		no-gutters>
				<!-- FIRST COLUMN -->
				<div class="title title-project ml-2">
					{{ project.name }}
				</div>
				<ButtonsListProject/>
				<!-- SECOND COLUMN -->
				<div class="introduction my-auto mx-auto">
					Introdução
				</div>
				<div class="content-intro p-2">
					{{ project.introductionText }}
				</div>
				<!-- THIRD COLUMN -->
				<div class="learning my-auto mx-auto">
					Aprendizado
				</div>
				<div class="content-learning p-2">
					{{ project.learningText }}
				</div>
				<div class="footer mt-auto ml-auto mx-2">
					Finalizado em: {{ project.date }}
				</div>
				<!-- ICONS LIST PROJECT -->
				<TechnologyIcons :id="project.id"/>
		</div>
	</div>
</template>

<script>

import ButtonsListProject from './ButtonsListProject.vue'
import TechnologyIcons from './TechnologyIcons.vue'

export default {
	components: {
		ButtonsListProject,
		TechnologyIcons
	},
	data() {
		return {
			projects: [
				{	name: '#DESAFIO_DOG',
					id: 1,
					router: '',
					color: '',
					introductionText: 'Introdução Conteudo',
					learningText: 'Aprendizado Conteudo',
					date: '20/20/20'
				},
				{	name: '#PROJETO 2',
					id: 2,
					router: '',
					color: '#2aadd5',
					introductionText: '',
					learningText: '',
					date: ''
				},
				{	name: '#PROJETO 3',
					id: 3,
					router: '',
					color: '#3fb5d9',
					introductionText: '',
					learningText: '',
					date: ''
				},
				{	name: '#PROJETO 4',
					id: 4,
					router: '',
					color: '',
					introductionText: '',
					learningText: '',
					date: ''
				},
				{	name: '#PROJETO 5',
					id: 5,
					router: '',
					color: '',
					introductionText: '',
					learningText: '',
					date: ''
				},
			]
		}
	},
	methods: {
		setColor(index) {
			const projectLength = 1/this.projects.length
			let transparentColor = 1 - ( projectLength * index )
			return `rgba(38, 156, 192, ${transparentColor})`
		}
	}
}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@500&display=swap');

#division-project {
	display: grid;
	grid-template-areas:	"title introduction learning"
							"buttons content-intro content-learning"
							"tecnologia tecnologia footer";
	grid-template-columns: 2fr 2fr 2fr;
	grid-template-rows: 1fr 3fr 1fr;
	margin: 0;
	padding: 0;
	height: 500px;
	transform: skewY(-2deg);
	transform-origin: top left;
	.title { 
		grid-area: title; 
		transform: skewY(2deg); 
		transform-origin: top left;
	}
	.introduction { 
		grid-area: introduction;
		font-size: 3em;
		transform: skewY(2deg); 
		transform-origin: top left;
	}
	.learning { 
		grid-area: learning;
		font-size: 3em;
		transform: skewY(2deg); 
		transform-origin: top left;
		
	}

	.content-intro { 
		grid-area: content-intro;
		transform: skewY(2deg); 
		font-family: 'Heebo', sans-serif;
		transform-origin: top left;
		border-left: 2px solid black;

	}
	.content-learning { 
		grid-area: content-learning;
		transform: skewY(2deg); 
		font-family: 'Heebo', sans-serif;
		transform-origin: top left;
		border-left: 2px solid black;

	}
	.footer { 
		grid-area: footer;
		font-size: 2em;
	}
	.title-project {
		font-size: 4em;
		vertical-align: center;
	}

}
.list-project {
	height: 500px;
	width: 120%;
	transform: skewY(-2deg);
	transform-origin: top left;

}
</style>