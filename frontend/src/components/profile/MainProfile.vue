<template>
	<b-container id="layout-profile-main" fluid class="mx-auto p-0 pt-3">
		<div class="grid-division">
			<b-row style="grid-area: content-area;">
				<Contact/>
				<AboutMe/>
			</b-row>
		</div>
		<div class="grid-division">
			<b-row no-gutters style="grid-area: content-area;">
				<b-col cols="3" class="tag-layout">
					<span v-textJSON="'menu.skills'" class="text-inclination"/>
				</b-col>
				<b-col style="border-top: rgb(86, 11, 116) 5px solid;"/>
				<b-col cols="12" class="mt-4">
					<Skills/>
				</b-col>
			</b-row>
		</div>
		<div class="grid-division pt-5" style="background-color: gray;">
		</div>
	</b-container>
</template>

<script>
import Contact from './Contact'
import AboutMe from './AboutMe'
import Skills from './Skills'
export default {
	components: {
		Contact,
		AboutMe,
		Skills
	}
}
</script>

<style lang="scss" scoped>
#layout-profile-main {
	background-color: rgb(255, 255, 255);
	width: 100%;	
	.grid-division {
		display: grid;
		grid-template-columns: 2fr 6fr 2fr;
		grid-template-areas: ". content-area .";
	}
	.division-area {
		grid-area: content-area;
		border-top: rgb(86, 11, 116) 5px solid;
	}
		.tag-layout {
			grid-area: content-area;
			background-color: rgb(86, 11, 116);
			height: max-content;
			color: white;
			transform: skewX(-20deg);
			transform-origin: left bottom;
			text-align: center;
				.text-inclination {
					transform: skewX(20deg);
					font-size: 1.5em;
					line-height: 1.5em;
				}
		}
}


</style>