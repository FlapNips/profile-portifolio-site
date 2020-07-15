<template>
	<div id="main-app">
		<div id="layout-text-fixed-top">
			<b-row
			id="text-fixed-top-fullname"
			v-textJSON="'profile.fullname'"
			style="grid-area: 1/2"
			class="m-0 p-0"/>
			<b-row 
			id="text-fixed-top-profession"
			v-textJSON="'profile.profession'"
			style="grid-area: 2/2"
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
	display: grid;
	grid-template-rows: max-content max-content 1fr;
	min-height: 100vh;
	overflow-x: hidden;
	width: 100%;
	#layout-text-fixed-top {
		display: grid;
		height: max-content;
		padding-top: 1em;	
		background-color: rgb(209, 209, 209);
		grid-template-columns: 2fr 5fr 2fr;
		grid-template-rows: 5fr 2fr;
		#text-fixed-top-fullname {
			display: flex;
			align-self: flex-end;
			font-family: 'Righteous', cursive;
			font-size: 5.5em;
			line-height: 100%;	
			color: rgb(42, 1, 66);
		}
		#text-fixed-top-profession {
			display: flex;
			align-self: flex-start;
			font-family: 'Righteous', cursive;
			color: rgb(81, 11, 122);
			font-size: 1.5em;
			line-height: 100%;
		}
	}
}
</style>
