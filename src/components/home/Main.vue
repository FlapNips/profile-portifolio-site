<template>
	<b-container id="content-main" fluid class="m-0 p-0">
		<b-row id="fixed-top" no-gutters style="background-color: #7dcce4">
			<b-col cols="10">
				<div class="content">BEM-VINDO !</div>
			</b-col>
			<b-col cols="10" class="text-center">
				<div class="content">Portifólio de Projetos</div>
			</b-col>
			<b-col cols="10">
				<div class="content"></div>
			</b-col>
		</b-row>
		<b-row v-for="project in projects" :style="`background-color: ${project.color}`" :key="project.name" no-gutters class="list-project">
			{{ project.name }}
		</b-row>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				projects: [
					{	name: 'Projetos',
						router: '',
						backgroundImg: '',
						color: '#00FFFF'
					},
					{	name: 'te',
						router: '',
						backgroundImg: '',
						color: '#7dcce4'
					},
					{	name: 'Prtestojetos',
						router: '',
						backgroundImg: '',
						color: '#00FFFF'
					}
				]
			
			}
		}
	}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Modak&display=swap');

$heightRow: 500px;

#content-main {
	overflow: hidden;
	min-height: 100vh;
	font-family: 'Modak', cursive;
	height: 100%;
	#fixed-top {
		height: $heightRow;
		width: 120%;
		font-size: 6em;
		transform: skewY(-3deg);
		transform-origin: top left;
	}
	.list-project {
		height: $heightRow;
		width: 120%;
		transform: skewY(-3deg);
		transform-origin: top left;
	}
	.content {
		transform: skewY(3deg);
		transform-origin: top left;
	}
}
</style>