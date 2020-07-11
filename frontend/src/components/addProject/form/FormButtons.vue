<template>
	<b-row>
		<b-button 
		v-for="button in buttons" 
		:key="button.name" 
		@click="button.reset" 
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
	}
}
</script>