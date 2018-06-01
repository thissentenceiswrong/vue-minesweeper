<template>
    <div>
        <start-setting v-if="false"></start-setting>
        <game-area></game-area>
    </div>
</template>

<script>
    import StartSetting from 'components/start-setting';
    import GameArea from 'components/game-area';

    export default {
        components: {StartSetting, GameArea},
        name: "app",
        // computed: {
        // },
        // methods: {
        // },
    };
</script>

<style>
</style>