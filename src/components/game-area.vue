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
                  v-on:click-cell="clickCell"

                  v-bind:style="cellStyleObject">
            </cell>
            <div id="clearFloat"></div>
        </div>
        <button @click="restart">Restart</button>
    </div>
</template>

<script>
    import MineSweeper from "../classes/MineSweeper";
    import {indexToxy} from "../classes/Helper";

    import cell from "./cell";

    export default {
        name: "GameArea",
        components: {cell},
        data: function () {
            return {
                minesweeper: new MineSweeper(),
                widthCell: 40,

            };
        },
        created() {
            // this.minesweeper.onGameOver = function (won) {
            //     console.log("Game Over, you " + (won ? "won" : "lose"));
            // };
        },
        methods: {
            restart: function () {
                // this.minesweeper.init();
                this.minesweeper = new MineSweeper();
            },
            clickCell: function (e) {
                let ret = indexToxy(e, this.minesweeper.numRow, this.minesweeper.numCol);

                this.minesweeper.revealCell(ret.x, ret.y);
            },
            flagCell: function (e) {
                let ret = indexToxy(e, this.minesweeper.numRow, this.minesweeper.numCol);

                this.minesweeper.flagCell(ret.x, ret.y);
            }
        },
        computed: {
            gameboard: function () {
                return this.minesweeper.gameboard;
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