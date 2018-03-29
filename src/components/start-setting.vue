<template>
    <div>
        <h1>Settings</h1>
        <p>行数:<input type="number" v-model="row"></p>
        <p>列数:<input type="number" v-model="col"></p>

        <button v-on:click="changeGameboard({row, col})">Apply</button>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "StartSetting",
        data: function () {
            return {
                row: 0,
                col: 0
            };
        },
        computed: {
            ...mapState([
                'gameboard',
                'DEFAULT'
            ]),
        },
        methods: {
            ...mapMutations([
                'changeGameboard'
            ])
        },
        created() {
            this.row = this.DEFAULT.SIZE;
            this.col = this.DEFAULT.SIZE;
        }
    };
</script>

<style scoped>

</style>