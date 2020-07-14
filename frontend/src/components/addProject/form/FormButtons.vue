<template>
	<b-row class="mt-3">
		<b-button 
		v-for="button in buttons" 
		:key="button.name" 
		@click="resetAll(button.name)" 
		class="button-reset mx-auto">
			{{button.title}}
		</b-button>
	</b-row>
</template>

<script>
export default {
	data() {
		return {
			buttons: [
				{	name: 'resetImage',
					title: 'Resetar Imagem',
					reset: ''
				},
				{	name: 'resetAll',
				title: 'Resetar Tudo',
					reset: ''
				}
			]
		}
	},
	methods: {
		resetAll(name) {
			this.$store.commit(name)
		}
	}
}
</script>