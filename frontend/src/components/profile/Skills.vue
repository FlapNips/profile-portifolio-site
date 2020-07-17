<template>
	<b-col id="layout-profile-skills">
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
		<b-row
		v-for="icon in technologies"
		:key="icon.id"
		class="list-technology my-2 mx-auto w-75"
		:style="borderList(icon.collapsed)">
			<b-collapse :id="icon.id" v-model="icon.collapsed" accordion="unique-active">
				<div id="layout-list-technology">
					<div class="icon">
						<b-img :src="getIcon(icon.id)" width="150" height="150"/>
					</div>
					<div class="content">
						<p>{{ icon.description }}</p>
					</div>
					<div class="level">
						<b-progress 
						:value="icon.level"
						variant="success"
						striped
						animated>
							<b-progress-bar :value="icon.level" :label="`${icon.level} %`"/>
						</b-progress>
					</div>
				</div>
			</b-collapse>
		</b-row>
		<b-row>
			
		</b-row>
	</b-col>
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
	.list-technology {
		background-color: wheat;
	}
	#layout-list-technology {
		display: grid;
		grid-template-rows: 200px 50px;
		grid-template-columns: 1fr 4fr;
		grid-template-areas:	"icon content"
								"icon level";
	}
	.icon { 
	grid-area: icon;
	margin: auto;
	
	}
	.content { grid-area: content}
	.level {
		grid-area: level
		
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
</style>