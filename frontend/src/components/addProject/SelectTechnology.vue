<template>
	<b-row>
		<b-button 
		v-for="(icon) in buttons" 
		:key="icon.id" 
		@click="icon.pressed = !icon.pressed"
		:class="{ 'button-selected': icon.pressed }"
		class="button-default m-2 p-0">
			<b-img width="100" height="100" :src="icon.value"/>
			<!--<b-img v-show="icon.pressed" src="@/assets/check-icon.svg" class="image-selected"/>-->
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
		}
	},
	created() {
		console.log('create foi')
		this.getIcons()
	}
}
</script>

<style lang="scss" scoped>
.button-selected {
	position: relative;
	box-shadow: 0 0 5px 2px black;
	opacity: 1!important;
	.image-selected {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		opacity: 0.5;
	}
}
.button-default {
	background-color: white;
	opacity: 0.5;

}

.button-default:active,
.button-default:hover,
.button-default:focus {
	box-shadow: 0 0 5px 3px black;
	background-color: white
}
</style>