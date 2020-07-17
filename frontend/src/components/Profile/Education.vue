<template>
	<b-row no-gutters style="grid-area: content-area;" class="pt-5">
		<b-col xl="3" class="tag-layout">
			<span v-textJSON="'menu.education'" class="text-inclination"/>
		</b-col>
		<b-col xl="9" class="line-division"/>
		<b-col cols="12">
			<div v-for="education in educations" :key="education.title" class="layout-education-list">
				<div class="marking">
					*
				</div>
				<h3 class="title">{{education.title}}</h3>
				<h4 class="duration">{{education.when}} - {{education.duration}} horas</h4>
				<p class="content-paragraph">{{education.content}}</p>
			</div>
		</b-col>
	</b-row>
</template>

<script>
export default {
	data() {
		return {
			educations: [
				{	title: 'teste',
					when: '20/01/2000',
					duration: 360,
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?'
				},
				{	title: 'teste',
					when: '20/01/2000',
					duration: 360,
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?'
				},
				{	title: 'teste',
					when: '20/01/2000',
					duration: 360,
					content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore id enim velit assumenda adipisci odit error quaerat! Reprehenderit quasi odit fuga magni illum, ad ipsum eaque nam repudiandae consequuntur?'
				},
			
			]
		}
	},
	computed: {
		getListTechnology() {
			return this.technologies.length
		}
	},
	methods: {
		getIcon(name) {
			return this.$store.getters.getIcon(name)
		},
		borderList(collapsed) {
			if(collapsed) return 'border: black 3px solid;';
			return
		}
	}
}
</script>

<style lang="scss" scoped>
.tag-layout {
	grid-area: content-area;
	background-color: rgb(86, 11, 116);
	height: max-content;
	color: white;
	transform: skewX(-20deg);
	transform-origin: left bottom;
	text-align: center;
		.text-inclination {
			transform: skewX(20deg);
			font-size: 1.5em;
			line-height: 1.5em;
		}
	}
.line-division {
	border-top: rgb(86, 11, 116) 5px solid;
	transform: skewX(-20deg);
	transform-origin: top left;
}
.layout-education-list {
	display: grid;
	grid-template-columns: 1fr 2fr 6fr;
	grid-template-areas:	"marking title duration"
							"marking content-paragraph content-paragraph";
	.marking {
		grid-area: marking;
	}
	.title {
		grid-area: title;
	}
	.duration {
		grid-area: duration;
	}
	.content-paragraph {
		grid-area: content-paragraph;
	}
}
</style>