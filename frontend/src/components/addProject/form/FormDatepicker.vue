<template>
	<b-form-datepicker 
	v-model="datePicker"
	placeholder="Escolha a data finalizada!" 
	class="my-3"/>
</template>

<script>
export default {
	data() {
		return {
			value: ''
		}
	},
	computed: {
		datePicker: {
			get() {
				return this.$store.getters.getDate
			},
			set(value) {
				this.$store.commit('setDate', value)
			}
		}
	}
}
</script>

<style>

</style>