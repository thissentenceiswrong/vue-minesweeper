<template>
    <div>
        <h1>Game</h1>
        <button @click="startGame">Start</button>
        <div id="gameboard">
            <Cell id="cell"
                  v-for="(item, index) in gameboard"
                  :key="index"

                  v-bind:index="index"
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
        computed: {
            ...mapState({
                gameboard: state => state.game.gameboard
            })
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