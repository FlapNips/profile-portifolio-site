<template>
	<b-row no-gutters style="grid-area: content-area;">
		<b-col xl="3" class="tag-layout">
			<span v-textJSON="'menu.skills'" class="text-inclination"/>
		</b-col>
		<b-col xl="9" class="line-division"/>
		<b-col cols="12" class="mt-4" id="layout-profile-skills">
			<carousel
			:autoplay="true"
			:navigationEnabled="true"
			paginationActiveColor="red"
			paginationColor="green"
			:paginationSize="15"
			:perPage="4">
				<slide id="slide-row" v-for="technology in sortTechnologies" :key="technology.icon">
					<div class="box">
						<svg  viewBox="0 0 110 110">
							<circle 
							cx="55" 
							cy="55" 
							r="50"/>
							<circle
							:style="setStyle(technology.percent)"
							cx="55" 
							cy="55" 
							r="50"/>
						</svg>
						{{technology.percent}}
						<b-img :src="getIcon(technology.icon)" width="100" height="100" class="icon"/>
					</div>
				</slide>
			</carousel>
		</b-col>
	</b-row>
</template>

<script>
export default {
	data() {
		return {
			swiperOption: {
				perPage: 4,
			},
			technologies: [],
			techImages: []
		}
	},
	computed: {
		getListTechnology() {
			return this.technologies.length
		},
		sortTechnologies() {
			return this.technologies.filter((element, index) => {
				return this.technologies.lastIndexOf(element) === index
			}).sort((a, b) => {
				return a.percent > b.percent ? -1 : 1
			})
		}
	},
	methods: {
		getIcon(name) {
			for(const value of this.techImages) {
				if(value.icon === name) return require(`../../${value.img}`)
			}
		},
		borderList(collapsed) {
			if(collapsed) return 'border: black 3px solid;'
			return
		},
		setStyle(percent) {
				return `stroke-dashoffset: calc(315 - (315 * ${percent}) / 100 );`

		}
	},
	created() {
		this.$http.get('/teste').then( x => {
			x.data.forEach((value, index) => {
				this.$set(this.technologies, index, value)
			})
		}).catch(error => console.log(error))
		this.$http.get('alltechnologies').then( x => {
				x.data.forEach((value, index) => {
					this.$set(this.techImages, index, value)
				})
			})
	}
}
</script>

<style lang="scss" scoped>
#layout-profile-skills {
	position: relative;
	grid-area: content-area;
	max-width: 100%!important;
	.swiper {
		height: 200px;
		width: 100%;

		.swiper-slide {
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-weight: bold;
			font-size: 2em;
		}
	}
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
#slide-row {
	height: 300px;
	.box {
		position: relative;
		width: 170px;
		height: 170px;
		text-align: center;
		.icon {
			position: absolute;
			margin: auto;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
		}
		svg {
			circle {
				stroke-miterlimit: 0;
				transform: rotate(-90);
				translate: (-100 0);
				fill: none;
				stroke: black;
				stroke-width: 5;
				stroke-linecap: round;
				stroke-dasharray: 315;
				stroke-dashoffset: 50;
				&:nth-child(1) {
					stroke-dashoffset: 0;
					stroke: #f3f3f3;
				}
				&:nth-child(2) {
					stroke: red;
				}
			}
		}
	}
}
.percent {
	font-size: 2.5em;
}
.line-division {
	border-top: rgb(86, 11, 116) 5px solid;
	transform: skewX(-20deg);
	transform-origin: top left;
}
</style>