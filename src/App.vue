<template>
    <div>
        <start-setting></start-setting>
        <game-area></game-area>
    </div>
</template>

<script>
    import StartSetting from 'components/start-setting';
    import GameArea from 'components/game-area';

    // import {mapState, mapMutations} from 'vuex';

    export default {
        components: {StartSetting, GameArea},
        name: "app",
        // computed: {
        //     ...mapState(['DEFAULT'])
        // },
        // methods: {
        //     ...mapMutations(['changeGameboard'])
        // },
        created() {
            const size = store.state.DEFAULT;
            store.commit('changeGameboard', {
                row: size,
                col: size
            });

            // this.changeGameboard({
            //     row:this.DEFAULT.SIZE,
            //     col:this.DEFAULT.SIZE
            // })
        }
    };
</script>

<style>
</style>