<template>
    <div>
        <h1>Game</h1>
        <p>Mines Left: {{numMinesLeft}}</p>
        <button @click="startGame">Start</button>
        <div id="gameboard" v-bind:style="containerStyleObject">
            <Cell id="cell"
                  v-for="(item, index) in gameboard"
                  :key="index"

                  v-bind:index="index"
                  v-bind:item="item"
            >
            </Cell>
            <div id="clearFloat"></div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import Cell from "./Cell";

    export default {
        components: {Cell},
        data: function () {
            return {
                widthCell: 40,
            };
        },
        computed: {
            ...mapState("game", {
                row: state => state.row,
                gameboard: state => state.gameboard,
                numMines: state => state.mines,
            }),
            numMinesLeft: function () {
                return this.numMines - this.gameboard.filter(({isFlagged}) => isFlagged).length;
            },
            containerStyleObject: function () {
                return {
                    width: `${this.widthCell * this.row}px`
                };
            },
        },
        methods: {
            startGame: function () {
                this.$store.commit("game/init", {
                    row: 9,
                    col: 9,
                    mines: 10
                });
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