<template>
	<b-col>

		<div class="tag-layout">
			<div v-textJSON="'profile.tags.contact'" class="text-inclination"/>
		</div>

		<b-row id="contact-content">
			<b-col cols=12 v-for="contact in menuContact" :key="contact.id" no-gutters>
				<div v-textJSON="`profile.tags.${contact.id}`" class="separator text-center my-3"/>
				<div class="text-center">
					<a :href="linkContact(contact)" target="blank">
						{{ contact.content }}
					</a>
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
	data() {
		return {
			menuContact: [
				{ id:"address",
					content: null,
					to: 'https://www.google.com/maps/place/Vila+Marieta,+S%C3%A3o+Paulo+-+SP,+Brasil/@-23.5154015,-46.5266787,16z/data=!4m5!3m4!1s0x94ce5e2f427a5523:0x4d8b96ecbb92fb38!8m2!3d-23.5176585!4d-46.5222792',
					contentCurrent: null
				},
				{ id:"phone",
					content: null,
					to: 'https://wa.me/55',
					contentCurrent: null
				},
				{ id:"email",
					content: null,
					to: 'mailto:',
					contentCurrent: null
				},
			],
			buttonsSocial: [
				{	id: 'link_github',
					icon: require('@/assets/icons/github-icon.svg'),
					to: null,
					tooltip: 'Github'
				},
				{	id: 'link_linkedin',
					icon: require('@/assets/icons/linkedin-icon.svg'),
					to: null,
					tooltip: 'Linkedin'
				},
				{	id: 'link_facebook',
					icon: require('@/assets/icons/facebook-icon.svg'),
					to: '',
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
		}
	},
	created() {
		this.$http.get('/aboutme').then( values => {
			const data = values.data
			this.menuContact.forEach( (element, index) => {
				const menuId = this.menuContact[index].id
				this.$set(this.menuContact[index], 'content', data[menuId])
			});
			
			this.buttonsSocial.forEach( (element, index) => {
				const socialId = this.buttonsSocial[index].id
				this.$set(this.buttonsSocial[index], 'to', data[socialId])
			})

		})
		
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
.separator {
	display: flex;
	align-items: center;
	width: 100%;
	text-align: center;
		&::before, &::after {
		content: '';
		flex: 1;
		margin: 0 0.5em;
		border-bottom: 1px solid rgba(112, 112, 112, 0.466);	
		}
}
</style>