<template>
	<b-row no-gutters style="grid-area: content-area;">
		<b-col cols="12" xl="3" no-gutters>
			<Contact/>
		</b-col>
		<b-col cols="12" xl="9">
			<AboutMe/>
		</b-col>
	</b-row>
</template>

<script>
import Contact from './Informations/Contact'
import AboutMe from './Informations/AboutMe'

export default {
	components: {
		Contact,
		AboutMe
	}
}
</script>

<style lang="scss" scoped>

</style>