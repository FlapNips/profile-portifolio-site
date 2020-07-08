<template>
	<b-container id="content-main" fluid class="m-0 p-0">
		<b-row id="fixed-top" no-gutters style="background-color: #2aadd5">
			<b-col 
			v-for="content in contentTop"
			:key="content.name"
			:style="`font-family: ${content.font} font-size: ${content.fontSize}`"
			cols="10"
			class="mx-auto"
			:class="`text-${content.align} ${content.margin}`">
				<div
				:class="`${content.inclination}`">
					{{ content.text }}
				</div>
			</b-col>
			<b-col cols="2" class="content">
				<b-button 
				v-for="buttonSocial in buttonsSocial" 
				:key="buttonSocial.name"
				class="m-2 p-0 button-social">
					<b-img width="50px" :src="buttonSocial.icon"/>
				</b-button>
			</b-col>
		</b-row>
		<ListProject/>
	</b-container>
</template>

<script>
import ListProject from './ListProject.vue'

	export default {
		components: {
			ListProject
		},
		data() {
			return {
				contentTop: [
					{	name: 'welcome',
						text: 'BEM-VINDO !',
						font: 'Bangers, cursive;',
						fontSize: '6em',
						align: 'center',
						margin: 'm-0',
						inclination: 'content'
					},
					{	name: 'slogan',
						text: 'Portifólio de Projetos',
						font: 'Bangers, cursive;',
						fontSize: '5em',
						align: 'left',
						margin: 'ml-2',
						inclination: 'content'
					},
					{	name: 'create',
						text: 'Create by: Bruno Alfieri',
						font: 'Bangers, cursive;',
						fontSize: '2em',
						align: 'right',
						margin: 'mt-auto',
						inclination: ''
					},
				],
				buttonsSocial: [
					{	name: 'icon1',
						icon: require('@/assets/github-icon.svg')
					},
					{	name: 'icon2',
						icon: require('@/assets/linkedin-icon.svg')
					},
					{	name: 'icon3',
						icon: require('@/assets/facebook-icon.svg')
					}
				],
			
			}
		}
	}
</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

$heightRow: 500px;

#content-main {
	overflow: hidden;
	min-height: 100vh;
	font-family: 'Bangers', cursive;
	height: 100%;
	#fixed-top {
		height: $heightRow;
		max-width: 100%;
		color: black;
		overflow: hidden!important;
		width: 120%;
		transform: skewY(-2deg);
		transform-origin: top left;
		.button-social {
			border-radius: 50%;
			background-color: transparent;
		}
	}

	.content {
		transform: skewY(2deg);
		transform-origin: top left;
	}
}
</style>