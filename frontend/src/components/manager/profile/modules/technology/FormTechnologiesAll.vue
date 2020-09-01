<template>
    <b-col cols=12>
      <b-row no-gutters>

      <b-col cols=6>
        <b-form-group
        label="Nome do icone:"
        label-for="form-tecnology-name">
          <b-form-input 
          id="form-tecnology-name"
          v-model="form.name"
          autocomplete="off"
          placeholder="Padrão: tecnologia-icon"/>
        </b-form-group>

      </b-col>

      <b-col cols=5>
        <UploadFile :file="getFile"/>
      </b-col>

      </b-row>
    </b-col>
</template>

<script>
import UploadFile from '@/components/manager/UploadFile.vue'
export default {
  components: {
    UploadFile
  },
  data() {
    return {
      form: {},
      imageResult: null
    }
  },
  computed: {
    defineImage() {
      return this.imageResult === null ? 
                    this.form.value : 
                    this.imageResult
    },
    getFile() {
      return this.$store.getters.getManagerProfileTechnology
    }
  },
  watch: {
    '$store.getters.getManagerProfileTechnology'(value) {
      this.form = { ...value }
      this.imageResult = null
    },
    getFile(value) {
      console.log(value)
    }
  },
  methods: {
    getImage(value) {
      let image = value.target.files[0]
      let reader = new FileReader()

      reader.readAsDataURL(image)
      reader.onload = e => {
        this.imageResult = e.target.result
      }
    },
    formatFileName(files) {
      console.log(files)
      const teste =  `${this.form.name}-icon.svg`
      console.log(teste)
      return teste
    }
  }
}
</script>

<style>

</style>