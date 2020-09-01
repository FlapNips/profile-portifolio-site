<template>

  <b-form 
  id="form-profile-contact"
  @submit.stop.prevent="onSubmit(formContact)"
  class="p-4"
  style="background-color: #f3f3f3;">

      <b-row
      class="h-100"
      align-v="center"
      no-gutters>

        <b-col 
        v-for="(contact, index) in formContact"
        :key="contact.id || 12"
        :xl="contact.xl || 12" 
        :lg="contact.lg || 12" 
        :md="contact.md || 12" 
        :sm="contact.sm || 12" 
        :cols="contact.cols || 12" 
        class="m-0 p-0">
          <b-form-group
          :label="contact.label"
          :laber-for="contact.id"
          class="mx-2">
              <b-input-group>

                  <b-form-input
                  :id="contact.id" 
                  :placeholder="contact.placeholder"
                  v-model="contact.newContent"
                  class="form-input"/>

                  <template v-slot:append >
                    <b-input-group-text :id="contact.id + index" class="append-input">
                      ?
                    </b-input-group-text>
                  </template>

                  <b-tooltip :target="contact.id + index">
                    Atual: {{ contact.contentCurrent }}
                  </b-tooltip>
                  

              </b-input-group>

          </b-form-group>
        </b-col>

        <b-col cols=12 class="text-right" align-self="end">
          <b-button type="submit">
            ATUALIZAR
          </b-button>
        </b-col>

      </b-row>
  </b-form>

</template>

<script>

export default {
  data() {
    return {
      // contentCurrent = database
      // newContent = V-MODEL
      formContact: [ 
        { id: 'phone',
          label: 'Celular',
          placeholder: 'Insira apenas os números com DDD.',
          xl: 6
        },
        { id: 'address',
          label: 'Endereço',
          placeholder: 'Pais, UF, Cidade, Região.',
          xl: 6   
        },
        { id: 'email',
          label: 'Email',
          placeholder: 'Insira o email completo.',
          xl: 6  
        },
        { id: 'link_github',
          label: 'GitHub',
          placeholder: 'Link completo do Github.',
          xl: 12   
        },
        { id: 'link_linkedin',
          label: 'Linkedin',
          placeholder: 'Link completo do linkedin.',
          xl: 12  
        },
        { id: 'link_facebook',
          label: 'Facebook',
          placeholder: 'Link completo do facebook.',
          xl: 12  
        },
      ],
      aboutMe: null,
      showValues: false
    }
  },
  computed: {
    showText() {
      return this.showValues == false ? 'MOSTRAR' : 'ESCONDER'
    }
  },
  methods: {
    getData() {
      this.$http.get('/aboutme').then( values => {

			const data = values.data
      
			this.formContact.forEach( (element, index) => {
        const formContact = this.formContact[index]
				this.$set(formContact, 'contentCurrent', `${data[formContact.id]}`)
			})

		})
    },
    onSubmit(event) {
      let data = {}
      event.forEach( element => {
        if(element.newContent) {
          data[element.id] = element.newContent
        }
      })
      this.$http.put('/aboutme', data)
      this.resetAll()
      this.getData()
    },
    resetAll() {
      this.formContact.forEach( element => {
        element.newContent = undefined
      })
    }
  },
  created() {
		this.getData()
  }
}
</script>

<style lang="scss">

#form-profile-contact {
  height: 100%!important;
}
.button-show-values {
  border: 0;
  background-color: transparent;
  color: blue;
  height: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: underline blue;
  }
}
.text {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.append-input {
  background-color: rgb(60, 11, 197);
  color: white;
  width: 100%;
  cursor: pointer;
}
</style>