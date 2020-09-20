<template>
    <div class="separator" :style="separatorPadding">
        <span>
            <slot/>
        </span>
    </div>
</template>

<script>
    export default {
        computed: {
            windowWidth() {
                return this.$store.getters.windowWidth
            },
            separatorPadding() {
                const width = this.windowWidth
                if (width >= 1200) return 'padding: 0 4em'
                else if (width >= 768) return 'padding: 0 3em'
                else if (width >= 576) return 'padding: 0 2em'
                else return 'padding: 0 1em'
            },
        }
    }
</script>

<style lang="scss">
    .separator {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0;
        text-align: center;

            &::before, &::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid rgba(112, 112, 112, 0.466);	
            }
        span {
            padding: 0 0.5em
        }
    }
</style>