<template>
    <div>
        <h1>Game</h1>
        <div id="loading" v-show="isLoading">Loading...</div>
        <div v-show="!isLoading">
            <p>Mines Left: {{numMinesLeft}}</p>
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
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

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
                col: state => state.col,
                gameboard: state => state.gameboard,
                numMines: state => state.mines,
                isLoading: state => state.isLoading
            }),
            numMinesLeft: function () {
                return this.numMines - this.gameboard.filter(({isFlagged}) => isFlagged).length;
            },
            containerStyleObject: function () {
                return {
                    width: `${this.widthCell * this.col}px`
                };
            },
        },
        methods: {
            ...mapActions("game", [
                "init"
            ]),
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