<template>
    <div>
        <h1>Game Area</h1>
        <div id="gameboard"
             v-for="each in gameboard">
            <cell
                    v-bind:data="each"
                    v-bind:sizing="sizing"
            ></cell>
        </div>
    </div>
</template>

<script>
    import Cell from './cell';
    import MineSweeper from "../classes/MineSweeper";

    export default {
        name: "GameArea",
        components: {Cell},
        data: function() {
            return {
                minesweeper: new MineSweeper()
            }
        },
        computed: {
            gameboard: function () {
                return this.minesweeper.board;
            },
            sizing: function () {
                return {
                    x: this.minesweeper.numRow,
                    y: this.minesweeper.numCol
                };
            }
        }
    };
</script>

<style scoped>

</style>