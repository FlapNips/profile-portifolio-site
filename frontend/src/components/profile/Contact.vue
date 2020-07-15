<template>
	<b-container style="grid-area: contact;">
		<div class="tag-layout">
			<div v-textJSON="'menu.contact'" class="text-inclination"/>
		</div>
		<b-row id="contact-content">
			<b-col cols=12 v-for="contact in menuContact" :key="contact.id" no-gutters>
				<div v-textJSON="`profile.tags.${contact.id}`" class="separator text-center my-3"/>
				<div v-textJSON="`profile.${contact.id}`" class="text-center"/>
			</b-col>
		</b-row>
		<b-row class="social my-3 mx-auto" align-h="center">
			<b-button 
			v-for="buttonSocial in buttonsSocial"
			:id="buttonSocial.name"
			:key="buttonSocial.name"
			class="m-3 p-0 button-social">
				<b-img width="50px" :src="buttonSocial.icon"/>
				<b-tooltip 
				:target="buttonSocial.name"
				placement="bottom">
					{{ buttonSocial.tooltip }}
				</b-tooltip>
			</b-button>
		</b-row>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			menuContact: [
				{ id:"address" },
				{ id:"phone" },
				{ id:"email" },
			],
			buttonsSocial: [
				{	name: 'github',
					icon: require('@/assets/icons/github-icon.svg'),
					tooltip: 'Github'
				},
				{	name: 'linkedin',
					icon: require('@/assets/icons/linkedin-icon.svg'),
					tooltip: 'Linkedin'
				},
				{	name: 'facebook',
					icon: require('@/assets/icons/facebook-icon.svg'),
					tooltip: 'Facebook'
				}
			],
		}
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