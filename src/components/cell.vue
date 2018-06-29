<template>
    <div id="cell"
         @click="$emit('click-cell', index)"
         @contextmenu.prevent="$emit('flag-cell', index)">
        <!--refactor into different components-->
        <!--last 3 bindings are props-->
        <component v-bind:is="currentCell"

                   v-bind:number="numMinesNearby"
                   v-bind:wrong="wrongFlag"
                   v-bind:gamestate="gamestate"
        >
        </component>
    </div>
</template>

<script>
    import flag from './cells/flag';
    import mine from './cells/mine';
    import number from './cells/number';
    import unrevealed from './cells/unrevealed';

    export default {
        name: "cell",
        props: ["index", 'item', "gamestate"],
        components: {flag, mine, number, unrevealed},
        methods: {},
        computed: {
            /**
             * return true if player flag the wrong cell?
             */
            wrongFlag: function () {
                return this.gamestate.isGameOver ? !this.item.isMine : false;
            },
            /**
             * Type of current cell
             * Return one of the following:
             * unrevealed
             * number
             * flag
             * mine
             */
            currentCell: function () {
                if (this.item.isFlagged) {
                    return "flag";
                }

                if (this.item.isRevealed) {
                    return this.item.isMine ? "mine" : "number";
                }

                return "unrevealed";
            },
            /**
             * Number of mines nearby
             * @returns {number}
             */
            numMinesNearby: function () {
                return this.item["numMinesNearby"];
            }
        }

    };
</script>

<style scoped>
    #cell {
        text-align: center;
        user-select: none;
    }
</style>