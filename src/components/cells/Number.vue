<template>
    <div id="number">
        <div v-show="number">
            {{number}}
        </div>
    </div>
</template>

<script>
    export default {
        props: ["index"],
        computed: {
            number: function() {
                return this.$store.getters["game/cell"](this.index).numMinesNearBy;
            }
        }
    };
</script>

<style scoped lang="scss">
    #number {
        height: 40px;
        width: 40px;

        text-align: center;
        line-height: 40px;
        font-size: 30px;

        user-select: none;
    }

    .gray {
        background-color: gray;
    }
</style>