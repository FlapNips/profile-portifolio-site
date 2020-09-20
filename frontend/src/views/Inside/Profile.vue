<template>
	<b-container id="layout-profile-main" fluid class="mx-auto p-0 pt-3">
		<div class="grid-division">
			<b-row no-gutters style="grid-area: content-area;">
				<b-col cols="12" xl="3" no-gutters>
					<Informations :listInformations="getInformations">

					</Informations>
				</b-col>
				<b-col cols="12" xl="9">
					<About :about="aboutUser"/>
				</b-col>
			</b-row>
		</div>
		<div class="grid-division">
			<Skills 
			:xlarger=3
			style="grid-area: content-area;"
			:listSkills="getSkillsId"/>
		</div>
		<div class="grid-division" style="background-color: gray;">
			<Education/>
		</div>
	</b-container>
</template>

<script>

	import Informations from '@/components/Personal/Informations'
	import About from '@/components/Personal/About'
	import Skills from '@/components/Personal/Skills'
	import Education from '@/components/Personal/Education'
	
	export default {
		components: {
			Skills,
			Informations,
			About,
			Education
		},
		computed: {
			getSkillsId() {
				return this.$store.getters.user.skillsId
			},
			getInformations() {
                return this.$store.getters.userContact
			},
			aboutUser() {
				return this.$store.getters.user.about
			},
		},
	}
</script>

<style lang="scss" scoped>
	#layout-profile-main {
		background-color: $color_black_5;
		width           : 100%;
		z-index: 0;
	}
</style>