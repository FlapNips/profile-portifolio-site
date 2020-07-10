<template>
	<b-row>
		<b-button 
		v-for="(icon) in buttons" 
		:key="icon.id" 
		@click="icon.pressed = !icon.pressed"
		:class="{ buttonteste: icon.pressed }"
		class="button-default m-2 p-0">
			<b-img width="50" height="50" :src="icon.value"/>
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
		getIcons() {
			const icons = this.$store.state.icons
			const lengthIcons = Object.keys(icons).length
			for(let i = 0; i < lengthIcons; i++) {
				this.$set(this.buttons, i, {
					'id': i,
					'pressed': false,
					'name': Object.keys(icons)[i],
					'value': Object.values(icons)[i]
				})
			}
			//this.$set(this.buttons, 0, teste)
			console.log(this.buttons)
		}
	},
	created() {
		console.log('create foi')
		this.getIcons()
	}
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