<template>
	<div id="layout-menu" no-gutters align-h="between">

		<b-navbar v-if="windowWidth >= 1200" id="menu-desktop" no-gutters>
			<b-nav-item 
			class="menu-item-desktop"
			v-for="button in menu"
			:to="button.router"
			:style="`width: calc(1/${menu.length}*100%)`"
			:key="button.id">
				<h4 class="text-button">{{ button.title }}</h4>
			</b-nav-item>
		</b-navbar>

		<div 
		v-else
		style="z-index: 10" 
		v-click-outside="onClose">
			<b-button class="button-sidemenu" @click="changeVisibleSidebar(true)">
				<b-icon icon="list"/>
			</b-button>
				<sidebar :menu="menu" :changeVisibleSidebar="changeVisibleSidebar"/>
		</div>

	</div>
</template>

<script>

import TextString from '@/../public/textPTBR.json'
import Sidebar from '@/components/sidebar/Sidebar.vue'

export default {
	components: {
		Sidebar
	},
	data() {
		return {
			sidebarVisible: false,
		}
	},
	computed: {
		windowWidth() {
			return this.$store.getters.getWindowWidth
		},
		menu() {
			return	this.$store.getters.getMenu
		}
	},
	methods: {
		changeVisibleSidebar() {
			this.$store.commit('changeSidebarVisible')
		},
		onClose() {
			this.$store.commit('changeSidebarVisible', false)
		}
	},
	created() {
		const menu = TextString.menu
		let contentMenu = []
		Object.entries(menu).forEach( (element,index) => {
			const [key, value] = element
			if(value.submenu) {

				contentMenu[index] = {	
					id: key,
					router: `/${key}`,
					title: value.name,
					manager: value.manager,
					submenu: value.submenu
				}

			} else {

				contentMenu[index] = {	
					id: key,
					router: `/${key}`,
					title: value.name,
					manager: value.manager
				}

			}
		});
		this.$store.commit('setMenu', contentMenu)
	}
}
</script>

<style lang="scss" scoped>

@media only screen and (min-width: 1200px) {
	#row-menu {
		transform: skewX(-20deg);
	}
	.layout-menu {
		flex: 0 0 max-content;
	}
}
@media only screen and (max-width: 1199px) {
	.text-button {
		transform: skewX(0deg)!important;
	}
	#layout-menu {
		height: 0!important;
		padding: 0!important;
	}

}

#layout-menu {
	display              : grid;
	height               : max-content;
	padding-top          : 30px;
	padding-bottom       : 30px;
	width                : 100%;
	grid-template-columns: 2fr 5fr 2fr;
	background-color     : $color_black_4;  //COLOR BACKGROUND MENUTOP
	#menu-desktop {
		grid-area       : 1/2;
		transform       : skewX(-20deg);
		background-color: $color_blue_2;  //COLOR BACKGROUND BUTTONS
		justify-content : space-between;
		text-decoration : none;
		padding         : 0;
	}
	.menu-item-desktop {
		border    : 0;
		padding   : 0;
		margin    : 0;
		text-align: center;
		display   : block;
		color     : $color_black_1!important;
		.router-link-active {
			background-color: $color_black_1;  //COLOR BACKGROUND ROUTER LINK ACTIVE
		}
		a {
			color: $color_black_5;
		}
		:hover {
			background-color: $color_blue_1;  //MENU HOVER BACKGROUND COLOR
		}
		.text-button {
			transform : skewX(20deg);
			font-size : 1em;
			margin    : 0;
			text-align: center;
		}
	}
	.button-sidemenu {
		position: fixed;
		top     : 10px;
		left    : 10px;
	}
}

</style>