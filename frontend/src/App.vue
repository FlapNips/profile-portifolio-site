<template>
		<router-view></router-view>
</template>
<script>
export default {
	methods: {
		updateWidthWindow() {
			this.$store.commit('updateWidthWindow', innerWidth)
		}
	},
	created() {
		this.$store.commit('updateWidthWindow', window.innerWidth)
		window.addEventListener('resize', this.updateWidthWindow)
	},
	destroyed() {
		window.removeEventListener('resize', this.updateWidthWindow)
	}
}
</script>