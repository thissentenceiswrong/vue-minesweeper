<template>
    <div>
        <h1>Game Area</h1>
        <div id="gameboard"
             v-bind:style="containerStyleObject">
            <cell id="cell"
                  v-for="(item, index) in gameboard"
                  :key="index"

                  v-bind:item="item"
                  v-bind:index="index"

                  v-bind:style="cellStyleObject">
            </cell>
            <div id="clearFloat"></div>
        </div>
    </div>
</template>

<script>
    import MineSweeper from "../classes/MineSweeper";

    import cell from "./cell";

    export default {
        name: "GameArea",
        components: {cell},
        data: function () {
            return {
                minesweeper: new MineSweeper(),
                widthCell: 40
            };
        },
        methods: {
        },
        computed: {
            gameboard: function () {
                return this.minesweeper.board;
            },
            containerStyleObject: function () {
                return {
                    width: `${this.widthCell * this.minesweeper.numRow}px`
                };
            },
            cellStyleObject: function () {
                return {
                    width: `${this.widthCell}px`,
                    height: `${this.widthCell}px`
                };
            },

        }
    };
</script>

<style scoped>
    #cell {
        float: left;
        display: block;

        box-sizing: border-box;
        border: 1px solid black;
    }

    #clearFloat {
        clear: right;
    }
</style>