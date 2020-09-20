<template>
    <div>
        <div id="layout-text-fixed-top">
            <h1
            id="text-fixed-top-fullname"
            class="m-0 p-0">
                {{ getName }}
            </h1>
            <h2 
            id="text-fixed-top-profession"
            class="m-0 p-0">
                {{ getProfession }}
            </h2>
        </div>
        <MenuDesktop/>
    </div>
</template>

<script>

	import MenuDesktop from './MenuDesktop.vue'

    export default {
        components: {
            MenuDesktop
        },
        computed: {
            getName() {
                const fullNameArray = this.$store.getters.user.fullName.split(' ')

                const indexLastName = fullNameArray.length -1
                const lastName = fullNameArray[indexLastName]

                const firstName = fullNameArray[0]

                return `${firstName} ${lastName}`
            },
            getProfession() {
                return this.$store.getters.user.profession
            },
            windowWidth() {
                return this.$store.getters.windowWidth
            }
        }
    }
</script>

<style>

</style>