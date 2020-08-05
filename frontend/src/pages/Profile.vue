<template>
	<b-container id="layout-profile-main" fluid class="mx-auto p-0 pt-3">
		<div class="grid-division">
			<Personal/>
		</div>
		<div class="grid-division">
			<Skills/>
		</div>
		<div class="grid-division" style="background-color: gray;">
			<Education/>
		</div>
	</b-container>
</template>

<script>

	import Personal from '@/components/Profile/Personal'
	import Skills from '@/components/Profile/Skills'
	import Education from '@/components/Profile/Education'
	
	export default {
		components: {
			Skills,
			Personal,
			Education
		}	
	}
</script>

<style lang="scss" scoped>
#layout-profile-main {
	background-color: $color_black_5;
	width           : 100%;
	z-index: 0;
}
</style>