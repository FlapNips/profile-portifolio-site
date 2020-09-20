<template>
	<div class="grid-division">

		<b-row 
		class="tag-layout" 
		v-if="render"
		no-gutters>

			<!--  TITLE -->
			<b-col cols=12 class="header-text">
				<span>
					Experiências
				</span>
			</b-col>

			<!-- CONTENT -->
			<b-col 
			xlg=8
			lg=8
			cols=12>

					<FormContent
					:content="content"/>
					<!-- <loading/> -->
					
			</b-col>

			<!-- BUTTONS -->
			<b-col cols=4>

				<Buttons
				@button-selected="buttonSelected"
				:listButtons="getListButtons"/>

			</b-col>
			

		</b-row>

		<!-- LOADING ALL -->
		<!-- <loading v-else/> -->

	</div>
</template>

<script>

	import Buttons from '@/components/List/Buttons.vue'
	import FormContent from '@/components/List/FormContent.vue'

	// import Loading from '@/components/Loadings/Default.vue'

	export default {
		components: {
			Buttons,
			FormContent,
			// Loading
		},
		data() {
			return {
				experiences: [],
				experienceSelectedId: 0,

				totalItemsButton: Number,
				page: '1',
				
				render: false,
			}
		},
		methods: {
			buttonSelected(experienceId) {
				this.experienceSelectedId = experienceId
			}
		},
		computed: {
			content() {
				return this.experiences[this.experienceSelectedId]
			},
			getListButtons() {
				return this.experiences
			}
		},
		async beforeMount() {
			const experiencesData = this.$store.getters.user.experiencesId

			const experiences = experiencesData.map( async (element, index) => {

					await this.$http.get(`/experience/${element}`).then( x => {
						if (x.data.skills === null) x.data.skills = []
						this.$set(this.experiences, index, { ...x.data })
					})

				})
			await Promise.all(experiences)
			this.render = true
		}
	}
</script>

<style lang="scss" scoped>
.tag-layout {
	position: relative;
	grid-area: content-area;
	height: max-content;
	color: white;
	justify-content: center;
		.header-text {
			background-color: $color_blue_2;
			font-size: 1.5em;
			line-height: 1.5em;
			text-align: center;
		}
	.layout-experience {
		grid-area: content-area;
		display: grid;
		grid-template-columns: 70% 30%;
		grid-template-rows: 1fr;
		background-color: green;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
		height: 100%;
	}
}

</style>