<template>
	<b-row>
		<b-button 
		v-for="(icon, index) in getIcons()" 
		:key="icon.id" 
		@click="setPressed(icon.id)"
		:class="teste = icon.id"
		class="button-default m-2 p-0">
			<b-img width="50" height="50" :src="setIcons(icon[index].name)"/>
		</b-button>
	</b-row>
</template>

<script>

export default {

	data() {
		return {
			buttons: []
		}
	},
	methods: {
		setPressed(id) {
			this.buttons[id].pressed.$set(true)
		},
		setIcons(icon) {
			console.log('ICON')
			console.log(icon)
			return this.$store.state.icons[icon]
		},
		getIcons() {
			const icons = this.$store.state.icons
			const iconsLength = Object.keys(icons).length
			for(let i = 0; i < iconsLength; i++) {
				let informations = { 
					'id': i, 
					name: Object.keys(icons)[i], 
					pressed: false
				}

				this.$set(this.buttons, `icon${i}`, informations)
			}
			console.log(this.buttons)
			return this.buttons
		}
	},
}
</script>

<style lang="scss">
.button-default {
	background-color: transparent;
	border: 0!important;
}
.buttonteste {
	background-color: black!important;

}
</style>