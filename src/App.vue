<template>
    <div>
        <setting v-if="false"></setting>
        <game-area></game-area>
    </div>
</template>

<script>
    import Setting from 'components/setting';
    import GameArea from 'components/game-area';

    export default {
        components: {Setting, GameArea},
        name: "app",
        // computed: {
        // },
        // methods: {
        // },
    };
</script>

<style>
</style>