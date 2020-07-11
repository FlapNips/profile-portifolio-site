<template>
	<div>
		<b-form-group 
		v-for="(input, index) in formInput"
		:key="input.id">
			<label 
			:for="input.id" 
			:class="returnValueLevel(index)"
			class="pl-1">
				{{ labelList(index) }}
			</label>
			<b-form-input 
			:id="input.id"
			:placeholder="input.placeholder"
			:type="input.type"
			min="1"
			max="5"
			v-model="input.value"
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
					label: 'Título:'
				},
				{	value: 1,
					id: 'level',
					type: 'range',
				}
			],
		}
	},
	methods: {
		returnValueLevel(id) {
			if(id == 1) {
				let value = this.formInput[1].value
				return `label-background-${value}`
			}
		},
		getLevel(level) {
			switch(level) {
				case 1: { return 'Newbie' }
				case 2: { return 'begginer' }
				case 3: { return 'Intermediate' }
				case 4: { return 'Advanced' }
				case 5: { return 'Expert' }
			}
		},
		labelList(index) {
			if(index == 1) {
				let valueRange = parseInt(this.formInput[index].value)
				return `Level: ${this.getLevel(valueRange)}`
			}
			return this.formInput[index].label
		},
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

</style>