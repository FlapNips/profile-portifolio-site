<template>
  <div class="grid-division mt-3">
    <div style="grid-area: 1/2;">

      <b-row class="row-menu" no-gutters>
        <b-button 
          v-for="button in menuManager" 
          :key="button.id"
          :style="`width: calc(1/${menuManager.length}*100%)`"
          class="button-manager"
          @click="componentManager = button.id">
          {{ button.title }}
        </b-button>
      </b-row>

        <ManagerLayout 
        :modules="findListModules(menuManager)" 
        :managerView="componentManager"/>

    </div>
  </div>
</template>

<script>
//ORIGIN => APP
  import ManagerLayout from '@/components/manager/ManagerLayout.vue'

export default {
  components: {
    ManagerLayout,
  },
  data() {
    return {
      componentManager: null,
      modules: []
    }
  },
  computed: {
    menuManager() {
      const menu = this.$store.getters.getMenu
      return menu.filter( x => x.manager == true)
    },
  },
  methods: {
    //RETURN MODULES === COMPONENT VIEW
    findListModules(menuManager) {
      return menuManager.find( element => element.id === this.componentManager ).submenu
    },
  },
  created() {
    this.componentManager = this.$store.getters.getComponentManager
  }
}
</script>

<style lang="scss" scoped>
.grid-division {
  //MAIN.VUE
    .row-buttons {
      background-color: $color_black_3;
      display: flex;
      justify-content: space-between;

      .button-manager {
        border: 0;
        border-radius: 0;
        background-color: $color_black_3;
        &:hover {
        background-color: $color_black_2;
        
        }
      }
    }
}
</style>