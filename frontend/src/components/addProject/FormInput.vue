<template>
	<div>
		<b-form-group 
		v-for="(input, index) in formInput"
		:key="input.id"
		:label="labelList(index)"
		:label-for="input.id">
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

<style>

</style>