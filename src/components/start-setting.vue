<template>
    <div>
        <h1>Settings</h1>
        <p>行数:<input type="number" v-model="row"></p>
        <p>列数:<input type="number" v-model="col"></p>

        <button v-on:click="">Apply</button>
    </div>
</template>

<script>
    export default {
        name: "StartSetting",
        data: function () {
            return {
                row: 0,
                col: 0
            };
        },
        computed: {
        },
        methods: {
        },
        created() {

        }
    };
</script>

<style scoped>

</style>