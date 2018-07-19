<template>
    <div>
        <setting
                v-on:newgame="onNewGame"
        ></setting>
        <game-area
                v-bind:conf="[9, 9, 10]"
        ></game-area>
    </div>
</template>

<script>
    import Setting from 'components/setting';
    import GameArea from 'components/game-area';

    export default {
        components: {Setting, GameArea},
        name: "app",
        methods: {
            onNewGame: function (conf) {
                let row = parseInt(conf[0]);
                let col = parseInt(conf[1]);
                let mine = parseInt(conf[2]);

                row = Math.max(row, 2);
                col = Math.max(col, 2);
                mine = Math.max(mine, 1);
            }
        }
    };
</script>

<style>
    div {
        font-family: Helvetica, cursive;
    }
</style>