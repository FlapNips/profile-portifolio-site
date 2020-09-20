<template>
    <div
    style="z-index: 10" 
    v-click-outside="onClose">
        <b-button 
        class="button-sidemenu" 
        @click="changeVisibleMenuMobile(true)">
            <b-icon 
            icon="list"/>
        </b-button>
    <MenuMobile/>
    </div>
</template>

<script>

    import MenuMobile from './MenuMobile.vue'

    export default {
        components: {
            MenuMobile
        },
        methods: {
            changeVisibleMenuMobile(value) {
                this.$store.commit('menuMobileVisible', value)
            },
            onClose() {
                this.$store.commit('menuMobileVisible', false)
            }
        }
    }
</script>

<style>

</style>