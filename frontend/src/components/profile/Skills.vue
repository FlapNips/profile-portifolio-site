<template>
	<b-row no-gutters style="grid-area: content-area;">
		<b-col xl="3" class="tag-layout">
			<span v-textJSON="'menu.skills'" class="text-inclination"/>
		</b-col>
		<b-col xl="9" class="line-division"/>
		<b-col cols="12" class="mt-4" id="layout-profile-skills">
			<flickity ref="flickity" :options="flickityOptions" class="mb-5">
				<div v-for="icon in technologies" :key="icon.id" class="carousel-cell">
					<div class="box">
						<svg>
							<circle cx="70" cy="70" r="70"/>
							<circle cx="70" cy="70" r="70"/>
						</svg>
						<b-img :src="getIcon(icon.id)" width="90" height="90" class="icon"/>
					</div>
						<div class="percent">
							90%
						</div>
				</div>
			</flickity>
		</b-col>
	</b-row>
</template>

<script>
import Flickity from 'vue-flickity';
export default {
	components: {
		Flickity
	},
	data() {
		return {
			flickityOptions: {
				initialIndex: 2,
				prevNextButtons: true,
				pageDots: true,
				wrapAround: false
			},
			technologies: [
				{	id: 'vuejs',
					level: 20,
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
	position: relative;
	grid-area: content-area;

}
.tag-layout {
	grid-area: content-area;
	background-color: rgb(86, 11, 116);
	height: max-content;
	color: white;
	transform: skewX(-20deg);
	transform-origin: left bottom;
	text-align: center;
		.text-inclination {
			transform: skewX(20deg);
			font-size: 1.5em;
			line-height: 1.5em;
		}
	}
.carousel-cell {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;;
	width: 200px;
	height: max-content;
	text-align: center;
	
	.box {
		position: relative;
		margin: 0 auto;
		right: 0;
		top: 0;
		left: 0;
		width: 150px;
		height: 150px;
		.icon {
			position: absolute;
			margin: auto;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
		svg {
			width: 150px;
			height: 150px;
			circle {
				width: 150px;
				height: 150px;
				fill: none;
				stroke: black;
				stroke-width: 10;
				stroke-linecap: round;
				transform: translate(5px, 5px);
				stroke-dasharray: 440;
				stroke-dashoffset: 440;
				&:nth-child(1) {
					stroke-dashoffset: 0;
					stroke: #f3f3f3;
				}
				&:nth-child(2) {
					stroke-dashoffset: calc(440 - (440 * 90) / 100 );
					stroke: red;
				}
					
			}
		}
	}
	.percent {
		font-size: 2.5em;
	}
}
.line-division {
	border-top: rgb(86, 11, 116) 5px solid;
	transform: skewX(-20deg);
	transform-origin: top left;
}
</style>