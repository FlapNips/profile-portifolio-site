<template>
	<div id="layout-profile-skills">
		<flickity ref="flickity" :options="flickityOptions" class="mb-5">
			<div v-for="icon in technologies" :key="icon.id" class="carousel-cell">
				<b-button 
				@click="icon.collapsed = !icon.collapsed"
				class="mx-3">
					<b-img :src="getIcon(icon.id)" width="150" height="150"/>
				</b-button>
			</div>
		</flickity>
		<b-row 
		v-for="icon in technologies" 
		:key="icon.id" 
		class="list-technology my-2" 
		:style="borderList(icon.collapsed)">
			<b-collapse :id="icon.id" v-model="icon.collapsed" accordion="unique-active">
				<b-col cols="2" class="m-3">
					<b-img :src="getIcon(icon.id)" width="150" height="150"/>
				</b-col>
				<b-col cols="8">
					<p>{{ icon.description }}</p>
				</b-col>
				<b-col>
					<span>{{ icon.level }}</span>
				</b-col>
			</b-collapse>
		</b-row>
	</div>
</template>

<script>
import Flickity from 'vue-flickity';
export default {
	components: {
		Flickity
	},
	data() {
		return {
			currentPage: 1,
			perPage: 3,
			flickityOptions: {
				initialIndex: 3,
				prevNextButtons: true,
				pageDots: true,
				wrapAround: false
			},
			technologies: [
				{	id: 'vuejs',
					level: '',
					collapsed: false,
					description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti laborum mollitia, repellat pariatur quaerat! Expedita, provident. Molestiae nostrum quisquam est ut iste dolores pariatur. Numquam asperiores eaque eum delectus!'
				},
				{	id: 'html5',
					level: '',
					collapsed: false,
					description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti laborum mollitia, repellat pariatur quaerat! Expedita, provident. Molestiae nostrum quisquam est ut iste dolores pariatur. Numquam asperiores eaque eum delectus!'
				},
				{	id: 'css3',
					level: '',
					collapsed: false,
					description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti laborum mollitia, repellat pariatur quaerat! Expedita, provident. Molestiae nostrum quisquam est ut iste dolores pariatur. Numquam asperiores eaque eum delectus!'
				},
				{	id: 'javascript',
					level: '',
					collapsed: false,
					description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti laborum mollitia, repellat pariatur quaerat! Expedita, provident. Molestiae nostrum quisquam est ut iste dolores pariatur. Numquam asperiores eaque eum delectus!'
				},
				{	id: 'sass',
					level: '',
					collapsed: false,
					description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio deleniti laborum mollitia, repellat pariatur quaerat! Expedita, provident. Molestiae nostrum quisquam est ut iste dolores pariatur. Numquam asperiores eaque eum delectus!'
				},
				{	id: 'bootstrap',
					level: '',
					collapsed: false,
					description: ''
				},
				{	id: 'docker',
					level: '',
					collapsed: false,
					description: ''
				},
				{	id: 'api',
					level: '',
					collapsed: false,
					description: ''
				},
				{	id: 'json',
					level: '',
					collapsed: false,
					description: ''
				},
			
			]
		}
	},
	computed: {
		getListTechnology() {
			return this.technologies.length
		}
	},
	methods: {
		getIcon(name) {
			return this.$store.getters.getIcon(name)
		},
		borderList(collapsed) {
			if(collapsed) return 'border: black 3px solid;';
			return
		}
	}
}
</script>

<style lang="scss" scoped>
#layout-profile-skills {
	grid-area: skills;
	.list-technology {
		background-color: wheat;
	}
}
</style>