<template>
  <b-row class="mt-5">

    <b-col cols="6">
      <b-form>
        <div style="border: 5px solid black;" class="p-4">
          <h2>Contato</h2>
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
        </div>
      </b-form>
    </b-col>

    <b-col cols="6">
      <b-form>
        <div style="border: 5px solid black;" class="p-4">
          <h2>Contato</h2>
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
        </div>
      </b-form>
    </b-col>

  <button @click="teste()">TESTE</button>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      //contentCurrent = PLACEHOLDER
      // newContent = V-MODEL
      formContact: [ 
        { id: 'phone',          label: 'Celular'  },
        { id: 'address',        label: 'Endereço' },
        { id: 'email',          label: 'Email'    },
        { id: 'link_github',    label: 'GitHub'   },
        { id: 'link_linkedin',  label: 'Linkedin' },
        { id: 'link_facebook',  label: 'Facebook' },
      ],
      aboutMe: null
    }
  },
  created() {
		this.$http.get('/aboutme').then( values => {

			const data = values.data
      
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