<template>
    <div>
        <div>
            <button @click="show" v-show="!visible">Change</button>
        </div>

        <div v-show="visible">
            <h1>Settings</h1>

            <p>Preset: todo</p>

            <p>Number of rows:</p>
            <input type="number" placeholder="number of rows" v-model="row">
            <p>Number of columns:</p>
            <input type="number" placeholder="number of columns" v-model="col">
            <p>Number of mines:</p>
            <input type="number" placeholder="number of mines" v-model="mines">

            <button @click="startNewGame">Start New Game</button>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from "vuex";

    export default {
        data() {
            return {
                col: 9,
                row: 9,
                mines: 10,
                visible: true,
            };
        },
        mounted() {
            this.startNewGame();
        },
        computed: {
            // getter setter to avoid parseInt
        },
        methods: {
            ...mapActions("game", [
                "init"
            ]),
            startNewGame: function () {
                this.init({
                    row: parseInt(this.row),
                    col: parseInt(this.col),
                    mines: parseInt(this.mines),
                });

                this.visible = false;
            },
            show() {
                this.visible = true;
            }
        }
    };
</script>

<style scoped>

</style>