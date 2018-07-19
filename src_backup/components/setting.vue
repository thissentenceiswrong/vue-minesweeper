<template>
    <div>
        <h1>Settings</h1>
        <p>行数:<input type="number" v-model="row"></p>
        <p>列数:<input type="number" v-model="col"></p>
        <p>地雷数:<input type="number" v-model="numMines"></p>

        <button @click="btnApply">Apply</button>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data: function () {
            return {
                row: 9,
                col: 9,
                numMines: 10
            };
        },
        computed: {},
        methods: {
            btnApply: function () {
                this.$emit('newgame', [this.row, this.col, this.numMines]);
            }
        },
    };
</script>

<style scoped>

</style>