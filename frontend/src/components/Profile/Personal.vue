<template>
	<b-row no-gutters style="grid-area: content-area;">
		<Contact/>
		<AboutMe/>
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