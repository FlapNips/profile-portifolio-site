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
	},
	data() {
		return {
			projects: []
		}
	}
}
</script>

<style lang="scss" scoped>
.tag-layout {
	grid-area: content-area;
	background-color: rgb(86, 11, 116);
	height: max-content;
	color: white;
	justify-content: center;
		.text-inclination {
			font-size: 1.5em;
			line-height: 1.5em;
		}
}
.line-division {
	border-top: rgb(86, 11, 116) 5px solid;
	transform: skewX(-20deg);
	transform-origin: top left;
}
.grid-division {
		display: grid;
		width: 100%;
		max-width: 100vw;
		grid-template-columns: 20% 60% 20%;
		grid-template-areas: ". content-area .";
}
</style>