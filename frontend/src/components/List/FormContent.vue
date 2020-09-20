<template>
    <div class="layout-container">

      <Header 
      :header="header"
      class="header">

        <Date 
        :dateStart="dateStart"
        :dateFinish="dateFinish"
        class="date"/>

      </Header>

      <List 
      :list="list"
      class="list"/>

      <About 
      :about="about"
      class="about"/>

      <Skills 
      :listSkills="skills"
      :xlarger=2
      :larger=2
      :medium=2
      :small=1
      class="skills">
        <!-- //* Header of the Skills -->
        <Separator>
            PRINCIPAIS TECNOLOGIAS
        </Separator>

      </Skills>

    </div>
</template>

<script>

    import Header from './content/Header.vue'
    import List from './content/List.vue'
    import About from './content/About.vue'
    import Skills from '@/components/Personal/Skills.vue'
    import Date from './content/Date.vue'

    import Separator from '@/components/Separator/Default.vue'

    export default {
        components: {
            Header,
            List,
            About,
            Skills,
            Date,
            Separator
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
                img: this.content.image
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
    @media screen and (max-width: 992px) {
        .header {
                padding: 0;
            }
    }

    .layout-container {
        display: grid;
            border: 1px solid black;

        grid-template-areas:  'header'
                                'list'
                                'about'
                                'skills'
                                'date';
        grid-template-rows: auto auto auto auto auto;
        grid-template-columns: 100%;

        background: radial-gradient(circle, rgb(226, 242, 255) 70%, rgb(203, 241, 245) 100%);
        
        justify-content: center;
        height: 100%;
        padding: 0;
        color: black;
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
            .skills {
                grid-area: skills;
            }
            .date {
                grid-area: date;
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