<template>
  <b-col
  cols=11
  class="layout-main mx-auto">

    <div class="layout-container">

      <Header :header="header"
      class="header">
        <Date 
        :dateStart="dateStart"
        class="date"
        :dateFinish="dateFinish"/>
      </Header>

      <List :list="list"
      class="list"/>

      <About :about="about"
      class="about"/>

      <Skills 
      v-if="skills.length > 0"
      :skills="skills"
      class="skills"/>
      
      

    </div>

  </b-col>
</template>

<script>

  import Header from './content/Header.vue'
  import List from './content/List.vue'
  import About from './content/About.vue'
  import Skills from './content/Skills.vue'
  import Date from './content/Date.vue'

  export default {
    components: {
      Header,
      List,
      About,
      Skills,
      Date
    },
    props: {
      content: {
        type: Object,
        required: true
      }
    },
    computed: {
      header() {
        return {
          title: this.content.title,
          subtitle: this.content.subtitle,
          contract: this.content.contract,
          img: this.content.img
        }
      },
      list() {
        return this.content.list
      },
      about() {
        return this.content.about
      },
      dateStart() {
        return this.content.dateStart
      },
      dateFinish() {
        return this.content.dateFinish
      },
      skills() {
        return this.content.skills
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-main {
    border: 1px solid black;
    height: 100%;
    padding: 0;
    color:black;

    .layout-container {
      display: grid;

      grid-template-areas:  'header'
                            'list'
                            'about'
                            'technologies'
                            'date';
      grid-template-rows: auto auto auto auto auto;
      grid-template-columns: 100%;

      background: radial-gradient(circle, rgb(226, 242, 255) 70%, rgb(203, 241, 245) 100%);
      
      height: max-content;
      margin: 0;

      .header {
        grid-area: header;
        padding: 1em 0 1em 1em;
      }
      .list {
        grid-area: list;
      }
      .about {
        grid-area: about;
      }
      .technologies {
        grid-area: technologies;
      }
      .date {
        grid-area: date;
      }
    }

  }

  .separator {
   color: black;
  }
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

</style>