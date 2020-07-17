<template>
	<b-row v-if="experiences.length > 0" no-gutters style="grid-area: content-area;">
		<b-col cols="12" xl="3" class="tag-layout">
			<span v-textJSON="'menu.experience'" class="text-inclination"/>
		</b-col>
		<b-col cols="12" xl="9" class="line-division"/>
	</b-row>
</template>

<script>
export default {
	data() {
		return {
			experiences: []
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
	transform: skewX(-20deg);
	transform-origin: left bottom;
	text-align: center;
		.text-inclination {
			transform: skewX(20deg);
			font-size: 1.5em;
			line-height: 1.5em;
		}
}
.line-division {
	border-top: rgb(86, 11, 116) 5px solid;
	transform: skewX(-20deg);
	transform-origin: top left;
}
</style>