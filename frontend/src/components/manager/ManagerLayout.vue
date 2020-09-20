<template>
  <b-row class="layout-manager-form" no-gutters>
  
    <b-col id="layout-content" :cols="responsiveColumns(modules)">
      <!-- COMPONENT -->
        <component :is="viewComponent"/>
    </b-col>

    <!-- BUTTONS -->
    <b-col 
    id="layout-menu-modules"
    v-if="modules.length > 0 && windowWidth()"
    cols="3"
    class="text-center py-4">
        <div
        v-for="(button, index) in modules"
        :key="button"
        class="division-buttons">

          <svg
          class="ml-auto svg-button"
          width="40"
          @click="moduleView = button"
          height="40">
            <circle 
            cx="20" 
            cy="20" 
            r="15"
            :fill="colorFill(button, moduleView)"
            stroke-width="5" 
            stroke="#757575"/>
          </svg>

          <!-- TEXT BUTTONS -->
          <span class="text-button">{{ button }}</span>
          <!-- DIVISION BUTTONS -->
          <div v-if="index < modules.length - 1" class="division-button"/>

        </div>
    </b-col>

    <b-col v-else cols=12>
      <b-button
      v-for="button in modules"
      :key="button"
      @click="moduleView = button">
        {{ button }}
      </b-button>
    </b-col>

  </b-row>
</template>

<script>
//ORIGIN => PAGE MANAGER


  export default {
    props: {
      modules: {
        type: Array,
        default: Array,
        required: true
      },
      managerView: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        componentView: null,
        moduleView: 'technology'
      }
    },
    computed: {
      viewComponent() {
        return this.setComponent(this.modules, this.managerView, this.moduleView)
      },
    },
    methods: {
      windowWidth() {
        this.setDropdownMenu()
        return this.$store.getters.windowWidth >= 1200
      },
      setComponent(modules, managerView, moduleView) {
        if(!modules.some( element => element == moduleView)) {
          moduleView = modules[0]
          this.moduleView = modules[0]
        }

        if(modules.length > 0) {
          for(let element of modules) {
            element = element.charAt(0).toUpperCase() + element.slice(1)
            if(element.toLowerCase() == moduleView) {
              return () => import(`./${managerView}/modules/${element}.vue`)
            }
          }

        } else {

          const managerViewUp = managerView.charAt(0).toUpperCase() + managerView.slice(1)
          return () => import(`./${managerView}/Manager${managerViewUp}.vue`)

        }
      },
      setDropdownMenu() {
        let value = []
        this.modules.forEach(element => {
          value.push({
            id: element,
            component: element,
            title: element
          })
        })
        this.$store.commit('dropdownMenu', value)

      },
      responsiveColumns(modules) {
        if(this.$store.getters.windowWidth < 1200) {
          
          return 12
        }
        if(modules.length > 0) return 9
        else return 12

      },
      colorFill(button, managerView) {

        if(button === managerView.toLowerCase()) return 'transparent'
        else return '#757575'

      }
    }
  }
</script>

<style lang="scss" scoped>
.layout-manager-form {
  height: max-content;
  min-height: 600px;
  .division-buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
  .text-button {
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    text-align: left;
    margin-left: 1em;
  }
  .division-button {
    border-left: 5px solid gray;
    height: 3em;
    margin-left: auto;
    margin-right: 17px;
    
  }
  .svg-button {
    cursor: pointer;
  }
  #layout-content {
    height: auto;
    background-color: rgb(241, 241, 241);
  }
  #layout-menu-modules {
    height: auto;
    background-color: rgb(224, 224, 224);
  }
}
</style>