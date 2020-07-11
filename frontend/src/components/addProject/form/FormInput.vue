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
					{{ getLevel }}
				</span>
			</label>
			<b-form-input 
			:id="input.id"
			:placeholder="input.placeholder"
			:type="input.type"
			v-model="input.value"
			@input="commitAttributes(index, input.value)"
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
				{	value: '',
					id: 'title',
					placeholder: 'Digite o título.',
					type: 'text',
					label: 'Título: ',
				},
				{	value: 1,
					id: 'level',
					type: 'range',
					label: 'Nível: ',
				}
			],
		}
	},
	computed: {
		getTitle() {
			return this.$store.getters.getTitle
		},
		getLevel() {
			return this.$store.getters.getLevel
		}
	},
	methods: {
		returnClassLevel(id) { //RETORNA A CLASSE DO LABEL DO NÍVEL
			if(id == 1) {
				let value = this.formInput[1].value
				return `label-background-${value}`
			}
		},
		transformLevelInName(level) { //TRANSFORMAR EM NOME
			const newLevel = parseInt(level)
			switch(newLevel) {
				case 1: { return 'Newbie' }
				case 2: { return 'begginer' }
				case 3: { return 'Intermediate' }
				case 4: { return 'Advanced' }
				case 5: { return 'Expert' }
			}
		},
		commitAttributes(index, value) { //DEFINE O MUTATION EM STORE
			if(index == 0) { //TITLE
				value = value.replace(/\s/g, '_')
				const newValue = `#${value}`
				this.$store.commit('setTitle', newValue)
				if(value == "") this.$store.commit('setTitle', '')
				return
			}
			if(index == 1) { // RANGE
				const newValue = this.transformLevelInName(value)
				this.$store.commit('setLevel', newValue)
				return
			}
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