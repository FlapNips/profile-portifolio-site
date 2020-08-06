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

        <b-form-group
        label="Icone SVG: Padrão 170x170px"
        label-for="teste">
          <b-form-file id="teste" @change="getImage"/>
        </b-form-group>
      </b-col>

      <b-col cols=5>
        <b-img
        v-show="defineImage || form.value"
        width="100"
        height="100"
        :src="defineImage"/>
      </b-col>

      </b-row>
    </b-col>
</template>

<script>

export default {
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
    }
  },
  watch: {
    '$store.getters.getManagerProfileTechnology'(value) {
      this.form = { ...value }
      this.imageResult = null
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

    }
  }
}
</script>

<style>

</style>