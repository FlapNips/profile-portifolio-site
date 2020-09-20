<template>
	<b-row no-gutters>
		<b-col v-if="listSkills.length > 0" cols=12>
			<slot/>
		</b-col>
		<b-col 
		v-if="skills.length > 0 && render" 
		cols="12" 
		class="mt-5" 
		id="layout-profile-skills">
			<carousel
			:autoplay="false"
			:navigationEnabled="true"
			paginationActiveColor="red"
			paginationColor="green"
			:paginationSize="15"
			:touchDrag="true	"
			:perPage="listIconPerWindow">
				<slide
				v-for="skill in skills" 
				class="slide-button"
				:key="`skill${skill.id}`">
					<div class="box" 
					:id="`skill${skill.id}`"
					>
						<svg  viewBox="0 0 110 110" >
							<circle 
							cx="55" 
							cy="55" 
							r="50"/>
							<!--Function style circle.  -->
							<circle
							:style="setStyle(skill.percent)"
							cx="55" 
							cy="55" 
							r="50"/>
						</svg>
						{{ skill.percent }}%
						<!-- Function set image. -->
						<b-img :src="skill.image" width="100" height="100" class="icon"/>
					</div>
					<b-tooltip :target="`skill${skill.id}`" triggers="hover">
						<!--Function percent transform in level.  -->
						{{ getLevel(skill.percent) }}
					</b-tooltip>
				</slide>
			</carousel>
		</b-col>
		<Loading v-else-if="listSkills.length !== 0"/>

	</b-row>

</template>

<script>

	import Loading from '@/components/Loadings/Default.vue'

	export default {
		components: {
			Loading
		},
		props: {
			listSkills: {
				type: Array,
				required: true
			},
			xlarger: {
				type: Number,
				required: false,
				default: 4
			},
			larger: {
				type: Number,
				required: false,
				default: 3
			},
			medium: {
				type: Number,
				required: false,
				default: 3
			},
			small: {
				type: Number,
				required: false,
				default: 2
			},
			xsmall: {
				type: Number,
				required: false,
				default: 1
			}
		},
		data() {
			return {
				render: false,
				skills: []
			}
		},
		watch: {
			listSkills: {
				immediate: true,
				async handler(newSkills) {
					if (newSkills.length === 0) return this.skills = []
					this.render = false

					const promise = newSkills.map( async (element, index) => {
						await this.$http.get(`/skill/${element}`).then( x => {
							x.data.image =  `data:image/svg+xml;base64,${x.data.image}`
							this.$set(this.skills, index, x.data)
						})
					})
					await Promise.all(promise)
					if(newSkills.length === 0) this.skills = []
					this.render = true
				}
			}
		},
		computed: {
			//* Define number of the skills in column slider.
			windowWidth() {
				return this.$store.getters.windowWidth
			},
			//* Defines number the column in skill slider.
			listIconPerWindow() {
				if(this.windowWidth >= 1200) return this.xlarger
				if(this.windowWidth >= 992) return this.larger
				else if(this.windowWidth >= 768) return this.medium
				else if(this.windowWidth >= 576) return this.small
				else return this.xsmall
			}
		},
		methods: {
			//* Organize skills in percent bigger to smaller.
			sortSkills() {
				this.skills.sort((a, b) => {
					return a.skill_percent > b.skill_percent ? -1 : 1
				})
				return this.skills
			},
			//* Transform percent in string.
			getLevel(percent) {
				if(percent > 100) return 'Nível Experiente'
				if(percent > 75) return 'Nível Avançado'
				if(percent > 50) return 'Nível Intermediário'
				else return 'Nível Básico'
			},
			//* Style circle percent
			setStyle(percent) {
					return `stroke-dashoffset: calc(315 - (315 * ${percent}) / 100 );`
			},
		}
	}
</script>

<style lang="scss">
	.VueCarousel {
		position: relative;
		width: 85%;
		margin: 0 auto;
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