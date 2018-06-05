<template>
    <div>
        <h1>Game Area</h1>
        <div id="gamestatus">
            <div id="mineLeft">Mines Left: {{numMinesLeft}}</div>
            <div id="gameover">{{ strGameOver }}</div>
        </div>
        <div id="gameboard" v-bind:style="containerStyleObject">
            <cell id="cell"
                  v-for="(item, index) in gameboard"
                  :key="index"

                  v-bind:item="item"
                  v-bind:index="index"
                  v-bind:gameover="gameover"

                  v-on:click-cell="clickCell"
                  v-on:flag-cell="flagCell"

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
                minesweeper: null,
                widthCell: 40,
                strGameOver: "",
                onGameOver: (function (vueObj) {
                    return function (won) {
                        const str = "Game Over! You " + (won ? "WIN" : "LOST");
                        vueObj.strGameOver = str;
                    };
                })(this),
                botOnGameUpdate: (function (vueObj) {
                    return function (gameboard) {

                    };
                })(this),
                botOnGameOver: (function (vueObj) {
                    return function (won) {

                    };
                })(this),
            };
        },
        created() {
            this.restart();
        },
        methods: {
            restart: function () {
                this.strGameOver = "";
                this.minesweeper = new MineSweeper(9, 9, 10, this.onGameOver);
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
            gameover: function () {
                return this.minesweeper.isGameOver;
            },
            containerStyleObject: function () {
                return {
                    width: `${this.widthCell * this.minesweeper.numRow}px`
                };
            },
            cellStyleObject: function () {
                return {
                    width: `${this.widthCell}px`,
                    height: `${this.widthCell}px`,
                    'font-size': '30px'
                };
            },
            numMinesLeft: function() {
                return this.minesweeper.numMines
                    - this.minesweeper.gameboard
                        .filter(({isFlaged}) => isFlaged)
                        .length;
            }
        }
    };
</script>

<style scoped>
    #cell {
        float: left;
        display: block;

        box-sizing: border-box;
    }

    #gameboard {
        border: 5px solid gray;
    }

    #clearFloat {
        clear: left;
    }
</style>