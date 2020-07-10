<template>
	<div class="text-left tecnologia pl-2">
		PRINCIPAIS:
		<b-img 
			v-for="(icons, index, name) in verifyIcons()" :key="name"
			width="60" height="60" 
			class="mx-3" 
			:src="getIcons(icons)"/>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
			required: true,
		}
	},
	data() {
		return {
			iconsProject: [
				{	id: 1,
					icons: [
						'html5',
						'css3',
						'javascript',
						'bootstrap',
						'vuejs',
						'api',
						'json',
					]
				},
				{	id: 2,
					icons: [
						'api',
						'docker',
						'json',
						'bootstrap',
					]
				}
			]
		}
	},
	methods: {
		verifyIcons() {
			try {
				return this.iconsProject.find(x => x.id == this.id).icons
			} catch(error) {
				console.log('Icone não encontrado ! Projeto ID: '+ this.id)
				return ['empty']
			}
		},
		getIcons(icon) {
			return this.$store.state.icons[icon]
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