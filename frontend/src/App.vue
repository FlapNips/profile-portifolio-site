<template>
	<div id="main-app">
		<div id="layout-text-fixed-top">
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
	}
}
</script>
<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Squada+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

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
