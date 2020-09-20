<template>
	<b-col>

		<div class="tag-layout">
			<div class="text-inclination">
				Contato
			</div>
		</div>

		<b-row id="contact-content">
			<b-col cols=12 v-for="contact in menuContact" :key="contact.id" no-gutters>
				<div class="separator text-center my-3">
					{{ defineTags(contact.id) }}
				</div>
				<div v-if="render" class="text-center">
					<a :href="linkContact(contact)" target="blank">
						{{ contact.content }}
					</a>
				</div>
				<div v-else class="text-center">
					<b-spinner small label="Small Spinner"></b-spinner>
				</div>
			</b-col>
		</b-row>

		<b-row class="social my-3 mx-auto" align-h="center">
			<b-button 
			v-for="buttonSocial in buttonsSocial"
			:id="buttonSocial.id"
			:key="buttonSocial.id"
			:href="buttonSocial.to"
			target="blank"
			class="m-3 p-0 button-social">
				<b-img width="50px" :src="buttonSocial.icon"/>
				<b-tooltip 
				:target="buttonSocial.id"
				placement="bottom">
					{{ buttonSocial.tooltip }}
				</b-tooltip>
			</b-button>
		</b-row>
		
	</b-col>
</template>

<script>
	export default {
		props: {
			listInformations: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				render: false,
				menuContact: [
					{ id:"address",
						to: 'https://www.google.com.br/search?q=',
						content: undefined
					},
					{ id:"phone",
						to: 'https://wa.me/55',
						content: undefined
					},
					{ id:"email",
						to: 'mailto:',
						content: undefined
					},
				],
				buttonsSocial: [
					{	id: 'github',
						icon: require('@/assets/icons/github-icon.svg'),
						to: undefined,
						tooltip: 'Github'
					},
					{	id: 'linkedin',
						icon: require('@/assets/icons/linkedin-icon.svg'),
						to: undefined,
						tooltip: 'Linkedin'
					},
					{	id: 'facebook',
						icon: require('@/assets/icons/facebook-icon.svg'),
						to: undefined,
						tooltip: 'Facebook'
					}
				],
			}
		},
		methods: {
			linkContact(menu) {
				if(menu.to) {
					return `${menu.to}${menu.content}`
				}
			},
			defineTags(locale) {
				if (locale === 'address') return 'Endereço'
				else if (locale === 'phone') return 'Celular'
				else if( locale === 'email') return 'Email'
			}
		},
		beforeMount() {
			const details = this.listInformations

			//* Define Content in menuContact
			this.menuContact.forEach( (element, index) => {
				this.$set(this.menuContact[index], 'content', details[element.id])
			})

			//* Define TO in buttonSocial (link)
			this.buttonsSocial.forEach( (element, index) => {
				this.$set(this.buttonsSocial[index], 'to', details[element.id])
			})
			this.render = true
		}
	}
</script>

<style lang="scss" scoped>
.tag-layout {
		width: 200px;
		background-color: rgb(86, 11, 116);
		height: max-content;
		color: white;
		margin: 0 auto;
		text-align: center;
		transform: skewX(-20deg);
	.text-inclination {
		transform: skewX(20deg);
		font-size: 1.5em;
		line-height: 1.5em;
	}
}
#contact-content {
	font-family: 'Times New Roman', Times, serif;
	font-weight: 100;
	.contact-bold-text {
		
		font-weight: 600;
	}

}
.button-social {
	border-radius: 50%;
	background-color: transparent;
	border: 0;
		&:hover {
			box-shadow: 0px 0px 10px black;
		}
}
</style>