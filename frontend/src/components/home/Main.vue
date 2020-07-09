<template>
	<b-container id="content-main" fluid class="m-0 p-0">
		<div id="fixed-top" no-gutters style="background-color: #2aadd5">
			<div 
			v-for="content in contentTop"
			:key="content.name"
			:style="`font-size: ${content.fontSize}`"
			class="mx-2"
			:class="`text-${content.align} ${content.margin} ${content.area}`">
				<div :class="content.inclination">
					{{ content.text }}
				</div>
			</div>
			<div class="buttons ml-auto">
				<b-button id="adicionar" class="p-0 button-manager m-2">
					<b-img src="@/assets/add-icon.svg" fluid-grow/>
				</b-button>
				<b-button id="remover" class="p-0 button-manager m-2">
					<b-img src="@/assets/remove-icon.svg" fluid-grow/>
				</b-button>
				<b-tooltip target="adicionar">
					Adicionar
				</b-tooltip>
				<b-tooltip target="remover">
					Remover
				</b-tooltip>
			</div>
			<div class="social mt-auto ml-auto">
				<b-button 
				v-for="buttonSocial in buttonsSocial" 
				:key="buttonSocial.name"
				class="m-2 p-0 button-social">
					<b-img :id="buttonSocial.name" width="50px" :src="buttonSocial.icon"/>
				</b-button>
				<b-tooltip :target="buttonSocial.name">
					{{ buttonSocial.tooltip }}
				</b-tooltip>
			</div>
		</div>
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
						area: 'bem-vindo',
						fontSize: '6em',
						margin: 'm-2',
						align: 'center',
					},
					{	name: 'slogan',
						text: 'Portifólio de Projetos',
						area: 'title',
						fontSize: '5em',
						margin: 'm-2',
						align: 'left',
					},
					{	name: 'create',
						text: 'Create by: Bruno Alfieri',
						area: 'footer',
						fontSize: '2em',
						margin: 'mt-auto',
						align: 'right',
					},
				],
				buttonsSocial: [
					{	name: 'github',
						icon: require('@/assets/github-icon.svg'),
						tooltip: 'Github'
					},
					{	name: 'linkedin',
						icon: require('@/assets/linkedin-icon.svg'),
						tooltip: 'Linkedin'
					},
					{	name: 'facebook',
						icon: require('@/assets/facebook-icon.svg'),
						tooltip: 'Facebook'
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
	overflow: hidden!important;
	min-height: 100vh;
	font-family: 'Bangers', cursive;
	height: 100%;

	#fixed-top {
		height: $heightRow;
		max-width: 100%;
		overflow: hidden!important;
		display: grid;
		align-items: start;
		grid-template-rows: 3fr 4fr 1fr;
		grid-template-columns: 5fr 1fr;
		grid-template-areas:	"bem-vindo buttons"
								"title social"
								" footer footer";
		color: black;
		transform: skewY(-2deg);
		transform-origin: top left;

		.bem-vindo{ 
			grid-area: bem-vindo;
			transform: skewY(2deg);
			align-self: flex-end;
		}
		.buttons{ 
			grid-area: buttons;
			transform: skewY(2deg);
			transform-origin: top left;
			align-self: flex-end;
			.button-manager {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				background-color: transparent;
				&:hover {
					box-shadow: 0px 0px 10px black;
				}
			}
		}
		.title{ 
			grid-area: title;
			transform: skewY(2deg);
		}
		.social{ 
			grid-area: social;
			transform: skewY(2deg);
			.button-social {
				border-radius: 50%;
				background-color: transparent;
				&:hover {
					box-shadow: 0px 0px 10px black;
				}
			}
		}
		.footer{ grid-area: footer;}

	}
}
</style>