<template>
	<div>
		<b-form-group 
		v-for="(input, index) in formInput"
		:key="input.id">
			<label 
			:for="input.id" 
			:class="returnClassLevel(index)"
			class="pl-1">
				{{ input.label }} 
				<span v-if="index == 0" class="label-dynamic">
					{{ getTitle }}
				</span>
				<span v-if="index == 1">
					{{ getLevelName }}
				</span>
			</label>
			<b-form-input 
			:id="input.id"
			:placeholder="input.placeholder"
			:type="input.type"
			:value="returnValue(input.id)"
			@input="commitAttributes(input.id, $event)"
			min="1"
			max="5"
			class="my-3"/>
		</b-form-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formInput: [
				{	id: 'Title',
					placeholder: 'Digite o título.',
					type: 'text',
					label: 'Título: ',
				},
				{	id: 'Level',
					type: 'range',
					label: 'Nível: ',
				}
			],
		}
	},
	computed: {
		getTitle() {
			return this.transformTextTitle(this.$store.getters.getTitle)
		},
		getLevelName() {
			return this.transformLevelInName(this.$store.getters.getLevel)
		},
		getLevelNumber() {
			return this.$store.getters.getLevel
		}
	},
	methods: {
		returnValue(id) {
			return eval(`this.$store.getters.get${id}`)
		},
		returnClassLevel(id) { //RETORNA A CLASSE DO LABEL DO NÍVEL
			if(id == 1) {
				let value = this.getLevelNumber
				return `label-background-${value}`
			}
		},
		transformLevelInName(level) { //TRANSFORMAR EM NOME
			switch(level) {
				case 1: { return 'Newbie' }
				case 2: { return 'begginer' }
				case 3: { return 'Intermediate' }
				case 4: { return 'Advanced' }
				case 5: { return 'Expert' }
			}
		},
		transformTextTitle(text){ //TRANSFORMA EM TÍTULO (#TITLE_EXAMPLE)
			if(text.length === 0) return ''
			const value = text.replace(/\s/g, '_')
			return `#${value}`
		},
		commitAttributes(id, value) { //DEFINE O MUTATION EM STORE
			this.$store.commit(`set${id}`, value)
			console.log(this.$store.state.project)
		}
	}
}
</script>

<style lang="scss">

$newbie: rgb(0, 255, 0);
$begginer: rgb(0, 255, 200);
$intermediate: rgb(217, 255, 0);
$advanced: rgb(255, 187, 0);
$expert: rgb(255, 0, 0);

@function color($index) {
		$color: $newbie;
		@if $index == 1 { $color: $newbie }
		@else if $index == 2 { $color: $begginer }
		@else if $index == 3 { $color: $intermediate }
		@else if $index == 4 { $color: $advanced }
		@else { $color: $expert }
		@return $color
};
@for $i from 1 through 5 {
	.label-background-#{$i} {
		width: 100%;
		background-color: color($i);
	}
};
.custom-range::-webkit-slider-thumb {
	background: black;
}
.label-dynamic {
	color: rgb(92, 92, 92);
}

</style>