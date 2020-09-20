<template>
    <b-sidebar
    id="teste-sidebar"
    :visible="menuMobileVisible"
    no-header-close
    no-close-on-esc
    no-close-on-backdrop>

        <b-nav id="sidebar-nav" vertical>

        <div
        v-for="button in menu"
        :key="button.id">

            <b-nav-item-dropdown
            v-if="button.submenu"
            :to="button.router"
            :text="button.title"
            class="sidebar-nav-item">

            <b-dropdown-item 
            v-for="item in button.submenu"
            :key="item.id"
            @click="setComponentManager(item.component)">
                {{ item.title }}
            </b-dropdown-item>
            
            </b-nav-item-dropdown>

            <b-nav-item
            v-else
            :to="button.router"
            class="sidebar-nav-item">
            {{ button.title }}
            </b-nav-item>

        </div>

        </b-nav>

        <template v-slot:footer>
            <b-button @click.stop="closeMenuMobile" class="w-100 mb-1">FECHAR</b-button>
        </template>
        
    </b-sidebar>

</template>

<script>

    export default {
        computed: {
            menu() {
                return this.$store.getters.menu
            },
            menuMobileVisible: {
                get() {
                    return this.$store.getters.menuMobileVisible
                },
                set(value) {
                    this.$store.commit('menuMobileVisible', value)
                }
            },
        },
        methods: {
            closeMenuMobile() {
                this.$store.commit('menuMobileVisible', false)
            },
            setComponentManager(value) {
                this.$store.commit('componentManager', value)
            }
        }
    }
</script>

<style lang="scss">



.b-sidebar {
  z-index: 1000!important;
  height: 100%!important;

  #sidebar-nav {

    .sidebar-nav-item {
      display: block;
      margin: 0.5em 2em;
      background-color: $color_blue_2;
    }
    a {
      color: $color_black_5;
    }
  }
}
</style>