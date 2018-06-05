<template>
    <div id="cell"
         @click="$emit('click-cell', index)"
         @contextmenu.prevent="$emit('flag-cell', index)">
        <!--refactor into different components-->
        <!--last 3 bindings are props-->
        <component v-bind:is="currentCell"
                   v-bind:number="number"
                   v-bind:wrong="wrongFlag"
                   v-bind:gameover="gameover"
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
        props: ["index", 'item', "gameover"],
        components: {flag, mine, number, unrevealed},
        methods: {},
        computed: {
            wrongFlag: function () {
                return this.gameover ? !this.item.isMine : false;
            },
            currentCell: function () {
                if (this.item.isFlaged) {
                    return "flag";
                }

                if (!this.item.isRevealed) {
                    return "unrevealed";
                }

                // revealed
                if (this.item.isMine) {
                    return "mine";
                }

                return "number";
            }
            ,
            number: function () {
                return this.item["numMinesNearby"] === 0 ? '' : this.item["numMinesNearby"];
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