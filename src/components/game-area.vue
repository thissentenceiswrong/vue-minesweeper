<template>
    <div>
        <h1>Game Area</h1>
        <div id="gameboard"
             v-for="each in gameboard.map">
            <cell></cell>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    import Cell from './cell';

    export default {
        name: "GameArea",
        components: {Cell},
        computed: {
            ...mapState([
                'gameboard',
            ]),
        }
    };
</script>

<style scoped>

</style>