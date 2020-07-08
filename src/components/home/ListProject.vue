<template>
	<div>
		<b-row 
		v-for="project in projects" 
		:style="`background-color: ${project.color};`" 
		:key="project.name" 
		no-gutters
		class="list-project">
			<b-col cols="6">
				<b-col cols="12" class="m-0 p-0 content">
					<div class="ml-auto title-project">{{ project.name }}</div>
				</b-col>
				<b-col cols="6" class="text-center m-0 p-0 ">
					<b-button :id="project.name" class="my-auto">
						<div>Preview</div>
					</b-button>
					<b-tooltip :target="project.img" placement="right">
						<b-img src="@/assets/challege-dog.jpg"/>
					</b-tooltip>
				</b-col>
				<b-col cols="6" class="text-center m-0 p-0 ">
					<b-button>
						<div>Join Test</div>
					</b-button>
				</b-col>
			</b-col>
		</b-row>
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
					color: '#269cc0'
				},
				{	name: 'te',
					router: '',
					img: '',
					color: '#2aadd5'
				},
				{	name: 'teste1',
					router: '',
					img: '',
					color: '#3fb5d9'
				},
				{	name: 'teste2',
					router: '',
					img: '',
					color: '#55bddd'
				},
				{	name: 'teste3',
					router: '',
					img: '',
					color: '#55bddd'
				},
				{	name: 'teste4',
					router: '',
					img: '',
					color: '#7fcee6'
				},
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.list-project {
	height: 500px;
	width: 120%;
	transform: skewY(-2deg);
	transform-origin: top left;
	.title-project {
		font-size: 4em;
	}
	.content {
		transform: skewY(2deg);
		transform-origin: top left;
	}
}
</style>