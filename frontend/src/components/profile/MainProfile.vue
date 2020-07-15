<template>
	<div id="layout-profile-main" class="m-0 pt-3">
		<Contact/>
		<AboutMe/>
		<div class="tag-layout mx-auto">
			<div v-textJSON="'menu.skills'" class="text-inclination"/>
		</div>
		<Skills/>
	</div>
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
	display: grid;
	grid-template-columns: 2.1fr 2fr 4fr 2.1fr;
	grid-template-rows: max-content max-content 1fr;
	grid-template-areas:	"margin-left contact aboutme margin-right"
							"margin-left tagskills space margin-right"
							"margin-left skills skills margin-right";
	
		.tag-layout {
			grid-area: tagskills;
			width: 200px;
			background-color: rgb(86, 11, 116);
			height: max-content;
			margin: 20px 0;
			color: white;
			text-align: center;
			transform: skewX(-20deg);
				.text-inclination {
					transform: skewX(20deg);
					font-size: 1.5em;
					line-height: 1.5em;
				}
		}
}


</style>