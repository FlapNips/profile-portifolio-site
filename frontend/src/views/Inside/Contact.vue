<template>
    <div class="grid-division">
        <Teste :listInformations="getUserContact"/>
    </div>
</template>

<script>

    import Teste from '@/components/Personal/Informations.vue'

    export default {
        components: {
            Teste
        },
        computed: {
            getUserContact() {
                return this.$store.getters.userContact
            }
            
        },
        
    }

</script>

<style>

</style>