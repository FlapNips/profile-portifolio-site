<template>
	<div class="buttons-list-project mx-auto my-auto text-center">
		<div
		v-for="button in buttons" :key="button.id">
			<b-button :id="button.id" class="button-project">
				{{ button.text }}
			</b-button>
			<b-tooltip v-if="button.tooltip" :target="button.id" placement="right">
				<b-img :src="button.tooltip"/>	
			</b-tooltip>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			buttons: [
				{	id: 'button-join',
					text: 'VISITAR PROJETO',
				},
				{	id: 'button-preview',
					text: 'PREVIEW',
					tooltip: require('@/assets/challege-dog.jpg')
				},
			
			]
		}
	}
}
</script>

<style lang="scss">
.buttons-list-project { 
	grid-area: buttons; 
	transform: skewY(2deg); 
	transform-origin: top left;
	.button-project {
	background-color: black;
	font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		&:hover {
			background-color: white;
			color: black;
		}
	}
}
</style>