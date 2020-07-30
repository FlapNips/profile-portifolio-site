<template>
  <b-col cols="4" class="mt-5">
    <b-form>

          <b-form-group
          v-for="contact in formContact"
          :key="contact.id"
          :label="contact.label"
          :label-for="contact.id">
            <b-form-input 
            :id="contact.id"
            v-model="contact.newContent"
            :placeholder="contact.contentCurrent"/>
          </b-form-group>

    </b-form>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      formContact: [
        { id: 'phone',
          label: 'Celular',
          contentCurrent: '',
          newContent: '',
        },
        { id: 'address',
          label: 'Endereço',
          contentCurrent: '',
          newContent: '',
        },
        { id: 'email',
          label: 'Email',
          contentCurrent: '',
          newContent: '',
        },
        { id: 'link_github',
          label: 'GitHub',
          contentCurrent: '',
          newContent: '',
        },
        { id: 'link_linkedin',
          label: 'Linkedin',
          contentCurrent: '',
          newContent: '',
        },
        { id: 'link_facebook',
          label: 'Facebook',
          contentCurrent: '',
          newContent: '',
        },

      ]
    }
  },
  created() {
		this.$http.get('/aboutme').then( array => {

			const data = array.data[0]

			this.formContact.forEach( (element, index) => {
				const content = this.formContact[index].id
				this.$set(this.formContact[index], 'contentCurrent', `Atual: ${data[content]}`)
			})

		})
  }
}
</script>

<style>

</style>