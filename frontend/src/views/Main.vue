<template>
	<div id="main-app">
		<div id="layout-text-fixed-top"
		v-if="getWindowWidth >= 1200">
			<div
			id="text-fixed-top-fullname"
			v-textJSON="'profile.fullname'"
			class="m-0 p-0"/>
			<div 
			id="text-fixed-top-profession"
			v-textJSON="'profile.profession'"
			class="m-0 p-0"/>
		</div>
		<MenuTop/>
		<router-view/>
	</div>
</template>
<script>

	import MenuTop from '@/components/MenuTop.vue'
	
export default {
	components: {
		MenuTop
	},
	computed: {
		getWindowWidth() {
			return this.$store.getters.getWindowWidth
		}
	},
	methods: {

		styleRouter() {

			if(this.getWindowWidth >= 1200) {

				return {
					paddingTop: '0em',
					zIndex: '-1',
				}

			} else {

				return {
					paddingTop: '2em',
					zIndex: '-1',
				}

			}
		},

		swipeSidebar(event) {
			console.log(event)
			this.$store.commit('changeSidebarVisible')
		}

	}
}
</script>
<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Squada+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

@media only screen and (max-width: 768px) {
	.grid-division {
			grid-template-columns: 10% 80% 10%!important;
			grid-template-areas  : ". content-area ."!important;
	}
}

.grid-division {
		display              : grid;
		width                : 100%;
		max-width            : 100vw;
		grid-template-columns: 20% 60% 20%;
		grid-template-areas  : ". content-area .";
}
#main-app {
	display           : grid;
	grid-template-rows: max-content max-content;
	min-height        : 100vh;
	width             : 100%;
	overflow-x        : hidden;
	#layout-text-fixed-top {
		display              : grid;
		height               : max-content;
		padding-top          : 1em;
		background-color     : $color_black_4;
		grid-template-columns: 2fr 5fr 2fr;
		grid-template-rows   : 5fr 2fr;
		#text-fixed-top-fullname {
			grid-area  : 1/2;
			text-align : center;
			font-family: 'Righteous', cursive;
			font-size  : 5.5em;
			line-height: 1;
			color      : $color_blue_1;
		}
		#text-fixed-top-profession {
			grid-area  : 2/2;
			text-align : center;
			font-family: 'Righteous', cursive;
			color      : $color_blue_1;
			font-size  : 1.5em;
			line-height: 1;
		}
	}
}
</style>
