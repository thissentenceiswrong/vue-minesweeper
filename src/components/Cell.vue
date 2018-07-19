<template>
    <div id="cell"
         @click="leftClick">
        <Number
                v-bind:index="index"
        ></Number>
    </div>
</template>

<script>
    import Number from "./cells/Number";
// todo
    export default {
        components: {Number},
        props: ["index"],
        methods: {
            leftClick: function () {
                const pos = this.$store.getters["game/indexToxy"](this.index);
                this.$store.dispatch("game/revealCell", {
                    x: pos.x,
                    y: pos.y
                });
            },
        },
        computed: {}
    };
</script>

<style scoped>

</style>