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
  </b-col>
</template>

<script>
export default {
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
      const data = this.$store.getters.getManagerProfileTechnology
      return  data === null ? '' : data
    }
  },
  methods: {
    clickIcon(icon) {
      if(this.technologySelected === icon.name) {
        this.$store.commit('setManagerProfileTechnology', null)    

      } else {
        this.$store.commit('setManagerProfileTechnology', { ...icon })
      }
    }
  }
}
</script>

<style>

</style>