<template>
    <div id="number" v-bind:class="{gray: number !== ''}">
        {{number}}
    </div>
</template>

<script>
    export default {
        name: "number",
        props: ["number"]
    };
</script>

<style scoped lang="scss">
    #number {
        height: 40px;
        width: 40px;

        text-align: center;
        line-height: 40px;
        font-size: 30px;
    }

    .gray {
        background-color: gray;
    }
</style>