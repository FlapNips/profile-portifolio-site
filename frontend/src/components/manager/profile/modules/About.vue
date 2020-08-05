<template>

  <b-form 
  id="form-profile-about" 
  @submit.stop.prevent="onSubmit(data)" 
  class="p-4"
  style="background-color: #f3f3f3;">

    <b-row
    class="h-100"
    no-gutters>

      <b-col cols="12">
        <b-form-textarea
        rows="5"
        max-rows="6"
        v-model="data">
        
        </b-form-textarea>
      </b-col>

      <b-col id="layout-aboutme-current" cols="12" class="mt-1">
        <hr class="hr-text" data-content="Sobre Mim"/>
        <h4>{{ aboutMe }}</h4>
      </b-col>

        <b-col cols=12 class="text-right" align-self="end">
          <b-button class="ml-auto" type="submit">
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
      aboutMe: '',
      data: null
    }
  },
  methods: {
    getData() {
      this.$http.get('/aboutme').then( res => {
        this.aboutMe = res.data.about
      })
    },
    onSubmit(data) {
      const teste = { about: data }
      this.$http.put('/aboutme', teste).then( () => {
        this.resetAll()
        this.getData()
      })
    },
    resetAll() {
      this.data = null
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">

#form-profile-about {
  height: 100%;

  #layout-aboutme-current {
    padding: 0.5em 1em;
    h4 {
      font-size: 1em;
    }
  }
}

.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #1b1b19, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;

    padding: 0 .5em;
    line-height: 1.5em;
    color: black;
    background-color: #fcfcfa;
  }
}
</style>