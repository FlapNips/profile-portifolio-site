<template>
	<div class="grid-division">
		<b-row class="tag-layout" no-gutters>
			<span v-textJSON="'experiences.title'" class="text-inclination"/>
		</b-row>
		<b-row style="grid-area: content-area;" no-gutters>
			<ExperienceList/>
		</b-row>
	</div>
</template>

<script>
import ExperienceList from '@/components/experiences/ExperiencesList'
export default {
	components: {
		ExperienceList
	}
}
</script>

<style lang="scss" scoped>
.tag-layout {
	grid-area: content-area;
	background-color: $color_blue_2;
	height: max-content;
	color: white;
	justify-content: center;
		.text-inclination {
			font-size: 1.5em;
			line-height: 1.5em;
		}
}
</style>