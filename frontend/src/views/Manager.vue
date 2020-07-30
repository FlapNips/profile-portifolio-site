<template>
  <div class="grid-division">
    <div style="grid-area: 1/2;">
      <div class="row-buttons">
        <b-button 
          v-for="button in buttons" 
          :key="button.id"
          :style="`width: calc(1/${buttons.length}*90%)`"
          class="button-manager"
          @click="componentView = button.id">
          {{ button.name }}
        </b-button>
      </div>
      <transition name="fade" mode="out-in">
        <component :is="componentView"/>
      </transition>
    </div>
  </div>
</template>

<script>
  import Profile from '@/components/manager/Profile.vue'
  import Experiences from '@/components/manager/Experiences.vue'
  import Projects from '@/components/manager/Projects.vue'
  import Users from '@/components/manager/Users.vue'

export default {
  components: {
    Profile,
    Experiences,
    Projects,
    Users
  },
  data() {
    return {
      componentView: 'profile',
      buttons: [
        { id: 'profile',
          name: 'Perfil'
        },
        { id: 'experiences',
          name: 'Experiências'
        },
        { id: 'projects',
          name: 'Projetos'
        },
        { id: 'users',
          name: 'Usuários'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-division {
		display              : grid;
		width                : 100%;
		max-width            : 100vw;
		grid-template-columns: 20% 60% 20%;
		grid-template-areas  : ". content-area .";
    .row-buttons {
      display: flex;
      justify-content: space-between;
      .button-manager {
        background-color: $color_black_3;
      }
    }
}
</style>