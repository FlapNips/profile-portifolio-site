<template>

	<b-row no-gutters style="grid-area: content-area;">

		<b-col xl="3" class="tag-layout">
			<div v-textJSON="'profile.tags.skills'" class="text-inclination"/>
		</b-col>

		<b-col xl="9" class="line-division"/>

		<b-col cols="12" class="mt-5" id="layout-profile-skills">
			<carousel
			:autoplay="false"
			:navigationEnabled="true"
			paginationActiveColor="red"
			paginationColor="green"
			:paginationSize="15"
			:perPage="listIconPerWindow()">
				<slide
				v-for="technology in skills" 
				:id="technology.skill_name"
				class="slide-button"
				:key="technology.skill_name">
					<div class="box">
						<svg  viewBox="0 0 110 110" >
							<circle 
							cx="55" 
							cy="55" 
							r="50"/>
							<circle
							:style="setStyle(technology.skill_percent)"
							cx="55" 
							cy="55" 
							r="50"/>
						</svg>
						{{technology.skill_percent}}%
						<b-img :src="technology.skill_image" width="100" height="100" class="icon"/>
					</div>
					<b-tooltip :target="technology.skill_name" triggers="hover">
						{{ getLevel(technology.skill_percent) }}
					</b-tooltip>
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
			skills: []
		}
	},
	computed: {
		getWindowWidth() {
			return this.$store.getters.getWindowWidth
		},
	},
	methods: {
		sortSkills() {
			this.skills.sort((a, b) => {
				return a.skill_percent > b.skill_percent ? -1 : 1
			})
			return this.skills
		},
		getLevel(percent) {
			if(percent > 100) return 'Nível Experiente'
			if(percent > 75) return 'Nível Avançado'
			if(percent > 50) return 'Nível Intermediário'
			else return 'Nível Básico'
		},
		getIcon(urlImage) {
			return require(`@/${urlImage}`)
		},
		borderList(collapsed) {
			if(collapsed) return 'border: black 3px solid;'
			return
		},
		setStyle(percent) {
				return `stroke-dashoffset: calc(315 - (315 * ${percent}) / 100 );`
		},
		listIconPerWindow() {
			if(this.getWindowWidth >= 1200) return 4
			else if(this.getWindowWidth >= 900) return 3
			else if(this.getWindowWidth >= 600) return 2
			else return 1
		}
	},
	async beforeMount() {


		this.$http.get('/skill/user/1')
		.then( async x => {
			const skills = x.data.skills
				const result = await Promise.all(skills.map( async value => {

					const response = await this.$http.get(`/skill/image/${value.skill_id}`)	
					const header = response.headers['content-type']
					const data = response.data

					value.skill_image = `data:${header};utf8,${data}`
					return value
					// this.$set(this.skills, index, value)
				})
			)
			this.skills = result
		})
		.catch( x => console.log('>>>>>>' + x))

	}
}
</script>

<style lang="scss" scoped>
.VueCarousel-slide {
	display        : flex;
	justify-content: center;
}
#layout-profile-skills {
	position : relative;
	grid-area: content-area;
	max-width: 100%!important;
	.swiper {
		height: 200px;
		width : 100%;

		.swiper-slide {
			display        : flex;
			justify-content: center;
			align-items    : center;
			text-align     : center;
			font-weight    : bold;
			font-size      : 2em;
		}
	}
}
.tag-layout {
	grid-area       : content-area;
	background-color: rgb(86, 11, 116);
	height          : max-content;
	color           : white;
	transform       : skewX(-20deg);
	transform-origin: left bottom;
	text-align      : center;
		.text-inclination {
			transform  : skewX(20deg);
			font-size  : 1.5em;
			line-height: 1.5em;
		}
	}
.slide-button {
	height: 200px;
	:hover {
		border-radius: 50%;
		cursor: pointer;
		background-color: #dadada;
	}
	.box {
		position  : relative;
		width     : 170px;
		height    : 170px;
		text-align: center;
		.icon {
			position: absolute;
			margin  : auto;
			top     : 0;
			bottom  : 0;
			left    : 0;
			right   : 0;
			border-radius: 0!important;
		}
		svg {
			circle {
				stroke-miterlimit: 0;
				transform        : rotate(-90);
				translate        : (-100 0);
				fill             : none;
				stroke-width     : 5;
				stroke-linecap   : round;
				stroke-dasharray : 315;
				stroke-dashoffset: 50;
				&:nth-child(1) {
					stroke-dashoffset: 0;
					stroke           : #f3f3f3;
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
	border-top      : rgb(86, 11, 116) 5px solid;
	transform       : skewX(-20deg);
	transform-origin: top left;
}
</style>