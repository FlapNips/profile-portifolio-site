<template>
	<div class="text-center tecnologia">
		Presentes:
		<b-img v-for="icon in icons" :key="icon" width="60" height="60" class="mx-3" :src="icon"/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			icons: [
				this.getIcons().html5
			]
		}
	},
	methods: {
		getIcons() {
			return this.$store.state.icons
		}
	}
}
</script>

<style lang="scss">
.tecnologia { 
	grid-area: tecnologia;
	transform: skewY(2deg);
	transform-origin: top left;
}
</style>