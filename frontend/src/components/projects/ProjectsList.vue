<template>
	<b-col no-gutters class="pt-5">
		<b-row v-for="education in educations" :key="education.title" no-gutters class="layout-education-list">
			<b-col cols="1" class="marking">
				*
			</b-col>
			<b-col cols="11">
				<b-row no-gutters>
					<b-col cols="5">
						<h3 class="title">{{education.title}}</h3>
					</b-col>
					<b-col cols="7">
						<h4 class="duration">{{education.when}} - {{education.duration}} horas</h4>
					</b-col>
				</b-row>
				<b-row no-gutters>
					<p class="content-paragraph">{{education.contentActivity}}</p>
				</b-row>
			</b-col>
		</b-row>
	</b-col>
</template>

<script>
export default {
	data() {
		return {
			educations: [
				{	title: 'Teste de Titulo',
					when: '20/01/2000',
					duration: 360,
					contentActivity: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?',
					tecnologies: []
				},
				{	title: 'tesbbbbte',
					when: '20/01/2000',
					duration: 360,
					contentActivity: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?',
					tecnologies: []
				},
				{	title: 'tescccte',
					when: '20/01/2000',
					duration: 360,
					contentActivity: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?',
					tecnologies: []
				},
			
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 2em;
}
.when, .duration {
	font-size: 2em;
}
</style>