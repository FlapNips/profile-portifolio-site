<template>
  <b-col 
  id="buttons-layout"
  cols="12" 
  class="m-0">
    <b-button 
    v-for="icon in buttonsNotRegisted" 
    :id="icon.name"
    :key="icon.name" 
    @click="clickIcon(icon)"
    :class="{ 'button-selected' :technologySelected.name == icon.name }"
    class="button-default m-2 p-0">
      <div class="box-button">

        <b-img width="100" height="100" :src="icon.value" class="image-button"/>

        <div 
        v-if="icon.percent" 
        class="percent-button">
          {{ getLevel(icon.percent) }}
        </div>

        <b-tooltip
        noninteractive
        triggers="hover"
        :target="icon.name" 
        :title="tooltipButtons(icon)"/>

      </div>
    </b-button>
  <!-- FORM -->
    <form-technologies-all/>

  </b-col>
</template>

<script>

  import FormTechnologiesAll from './FormTechnologiesAll.vue'

  export default {
    components: {
      FormTechnologiesAll
    },
    props: {
      buttonsNotRegisted: {
        type: Array,
        required: true
      },
      tooltipButtons: {
        type: Function,
        required: true
      },
      getLevel: {
        type: Function,
        required: true
      }
    },
    computed: {
      technologySelected() {
        const data = this.$store.getters.managerProfileTechnology
        return  data === null ? '' : data
      }
    },
    methods: {
      clickIcon(icon) {
        if(this.technologySelected === icon.name) {
          this.$store.commit('managerProfileTechnology', null)    

        } else {
          this.$store.commit('managerProfileTechnology', { ...icon })
        }
      }
    }
  }
</script>

<style>

</style>