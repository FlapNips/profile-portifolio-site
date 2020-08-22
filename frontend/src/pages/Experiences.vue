<template>
	<div class="grid-division">

		<b-row 
		class="tag-layout" 
		no-gutters
		v-if="!loading">

			<!--  TITLE -->
			<b-col cols=12 class="header-text">
				<span>
					Experiências
				</span>
			</b-col>

			<!-- CONTENT -->
			<b-col cols=8>
				<transition name="slide-top" mode="out-in">

					<FormContent
					v-if="!contentLoading"
					:content="content"/>
					
				</transition>
			</b-col>

			<!-- BUTTONS -->
			<b-col cols=4>
				<transition name="fade">
					<buttons
					v-if="!loadingButtons"
					:buttonSelected="buttonSelected"
					:clickButton="experienceContent"
					:buttons="getListButtons"/>
				</transition>

			</b-col>
			
			<!-- PAGES -->
			<b-col 
			offset=8 
			cols=4>
				<b-pagination-nav
				v-model="page"
				base-url="#"
				use-router
				align="center"
				class="mx-auto"
				:number-of-pages="pagesTotal"/>
			</b-col>

		</b-row>

		<!-- LOADING ALL -->
		<loading v-else/>

	</div>
</template>

<script>

	import Buttons from '@/components/experiences/Buttons.vue'
	import FormContent from '@/components/experiences/FormContent.vue'

	import Loading from '@/components/loadings/Default.vue'

	export default {
		components: {
			Buttons,
			FormContent,
			Loading
		},
		data() {
			return {
				content: Object,
				buttonSelected: String,

				totalItemsButton: Number,
				page: 1,
				
				loading: true,
				contentLoading: true,
				loadingButtons: true
			}
		},
		computed: {
			experienceSelected() {
				return this.$store.getters.getExperienceSelected
			},
			getListButtons() {
				return this.$store.getters.getListButtons
			},
			pagesTotal() {
        return Math.round(this.totalItemsButton / 5 + 1)
      }
		},
		watch: {
			'$route.hash': {	
				immediate: true,
				handler: 'listButtons',
			},
		},
		methods: {

		//BUTTON CONFIG

			async listButtons(page = Number) {

				this.loadingButtons = true
				page = page.replace('#', '')
				if(page == '') page = 1
				this.page = page

				await this.$http.get(`/experience/user/${1}?page=${page}`)
					.then( async response => {
						const listButtons = response.data.map( element => {
							return {
								id: element.experience_id,
								title: element.experience_title,
								subtitle: element.experience_office,
								img: element.experience_img
							}
						})

						this.$store.commit('setListButtons', listButtons)
						this.buttonSelected = listButtons[0].id
						this.experienceContent(this.buttonSelected)
						this.loadingButtons = false

					})
			},

			// CONTENT MAIN CONFIG

			async experienceContent(experienceId) {

				this.buttonSelected = experienceId
				this.contentLoading = true

				await this.$http.get(`/experience/${experienceId}`)
				.then( async response => {
			
					const data = response.data

					this.content = {
						title: data.experience_title,
						subtitle: data.experience_office,
						contract: data.experience_contract,
						img: data.experience_img,
						list: data.experience_list_about.split(';'),
						about: data.experience_about,
						dateStart: data.experience_date_start,
						dateFinish: data.experience_date_finish,
						skills: await this.setSkills(experienceId)
					}
					this.contentLoading = false
				})

			},
			async setSkills(experienceId) {
				return await this.$http.get(`/skill/experience/${experienceId}`)
					.then(async response => {

						const data = response.data

						const obj = data.skills.map(async element => {

							const imgResponse = await this.$http.get(`/skill/image/${element.skill_id}`)	
							const imgHeader = imgResponse.headers['content-type']
							const imgData = imgResponse.data
							const img = `data:${imgHeader};utf8,${imgData}`

								return {
									id: element.skill_id,
									name: element.skill_name,
									img: img 
								}
						})
						return await Promise.all(obj)
					})
					.catch( () => [])
			},

			// PAGES

			async totalPages(userId) {
				await this.$http.get(`/totalexperience/user/${userId}`)
					.then( response => {
						this.totalItemsButton = response.data.total
					})
			}
		},
		async beforeMount() {
		
			await Promise.all([
				this.experienceContent(1),
				this.totalPages(1)
			])
			this.loading = false
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


.slide-top-enter-active {
  animation: slide-top 0.5s;
}
.slide-top-leave-active {
  animation: slide-top 0.5s reverse;
}

@keyframes slide-top {
  0% {
    -webkit-transform: rotateX(-100deg);
            transform: rotateX(-100deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateX(0deg);
            transform: rotateX(0deg);
    -webkit-transform-origin: top;
            transform-origin: top;
    opacity: 1;
  }
}

</style>