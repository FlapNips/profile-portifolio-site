<template>
	<div class="grid-division">
		<b-row class="tag-layout" no-gutters>
			<span v-textJSON="'menu.projects'" class="text-inclination"/>
		</b-row>
		<b-row style="grid-area: content-area;" no-gutters>
			<ProjectList/>
		</b-row>
	</div>
</template>

<script>
import ProjectList from '@/components/Project/ProjectList'
export default {
	components: {
		ProjectList
	}
}
</script>

<style lang="scss" scoped>
.tag-layout {
	grid-area       : content-area;
	background-color: $color_blue_2; //TAG PROJECTS BACKGROUND COLOR
	height          : max-content;
	color           : white;
	justify-content : center;
		.text-inclination {
			font-size  : 1.5em;
			line-height: 1.5em;
		}
}
.grid-division {
		display              : grid;
		width                : 100%;
		max-width            : 100vw;
		grid-template-columns: 20% 60% 20%;
		grid-template-areas  : ". content-area .";
}
</style>