<template>
	<b-container id="layout-profile-main" fluid class="mx-auto p-0 pt-3">
		<div class="grid-division">
			<Personal/>
		</div>
		<div class="grid-division">
			<Skills/>
		</div>
		<div class="grid-division">
			<Experience/>
		</div>
		<div class="grid-division" style="background-color: gray;">
			<Education/>
		</div>
	</b-container>
</template>

<script>
import Skills from './Skills'
import Personal from './Personal'
import Experience from './Experience'
import Education from './Education'
export default {
	components: {
		Skills,
		Personal,
		Experience,
		Education
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
}
</style>