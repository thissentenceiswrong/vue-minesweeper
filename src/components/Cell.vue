<template>
    <div id="cell"
         @click="leftClick"
         @contextmenu.prevent="rightClick">
        <component
                v-bind:is="currentCell"
                v-bind:index="index"
                v-bind:item="item">
        </component>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "vuex";

    import Boom from "./cells/Boom";
    import Flag from "./cells/Flag";
    import Mine from "./cells/Mine";
    import Number from "./cells/Number";
    import Unrevealed from "./cells/Unrevealed";

    export default {
        components: {Boom, Flag, Mine, Number, Unrevealed},
        props: ["index", "item"],
        methods: {
            ...mapActions("game", [
                "revealCell",
                "flagCell"
            ]),
            leftClick: function () {
                const pos = this.indexToxy(this.index);
                this.revealCell({
                    x: pos.x,
                    y: pos.y
                });
            },
            rightClick: function () {
                const pos = this.indexToxy(this.index);
                this.flagCell({
                    x: pos.x,
                    y: pos.y
                });
            }
        },
        computed: {
            ...mapGetters("game", [
                "indexToxy",
            ]),
            ...mapState("game", {
               isWon: state => state.isWon,
               finalMove: state => state.finalMove
            }),
            currentCell: function () {
                // you revealed the bomb
                if ((!this.isWon) && (this.finalMove === this.index)) {
                    return "Boom";
                }

                if (this.item.isFlagged) {
                    return "Flag";
                }

                if (this.item.isRevealed) {
                    return this.item.isMine ? "Mine" : "Number";
                }

                return "Unrevealed";
            },
        },
    };
</script>

<style scoped>

</style>