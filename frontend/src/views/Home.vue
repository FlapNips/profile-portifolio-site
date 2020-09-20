<template>
	<header id="main-app">

		<HeaderDesktop 
		v-if="windowWidth >= 1200"/>

		<HeaderMobile v-else/>

		<router-view class="pb-5"/>
	</header>
</template>
<script>

	import HeaderDesktop from '@/components/Header/Desktop.vue'
	import HeaderMobile from '@/components/Header/Mobile.vue'
	
export default {
	components: {
		HeaderDesktop,
		HeaderMobile
	},
	computed: {
		windowWidth() {
			return this.$store.getters.windowWidth
		}
	}
}
</script>
<style lang="scss">

	@import url('https://fonts.googleapis.com/css2?family=Squada+One&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

	@media only screen and (max-width: 1200px) {
		.grid-division {
				grid-template-columns: 10% 80% 10%!important;
				grid-template-areas  : ". content-area ."!important;
		}
	}
	@media only screen and (max-width: 768px) {
		.grid-division {
				grid-template-columns: 0% 100% 0%!important;
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
