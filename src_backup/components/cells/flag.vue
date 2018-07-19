<template>
    <div id="flag" v-bind:class="objClass">
        <i id="base" class="fas fa-flag"></i>
        <i v-if="wrong" id="cross" class="fas fa-times"></i>
    </div>
</template>

<script>
    export default {
        name: "flag",
        props: ["wrong", "gamestate"],
        computed: {
            objClass: function () {
                return {
                    flaged: !this.gamestate.isGameOver,
                    wrongFlag: this.gamestate.isGameOver && this.wrong,
                    rightFlag: this.gamestate.isGameOver && !this.wrong
                };
            }
        }
    };
</script>

<style scoped lang="scss">
    #flag {
        height: 40px;
        width: 40px;

        text-align: center;
        line-height: 40px;
        font-size: 30px;
        position: relative;

        box-sizing: border-box;

        #cross {
            padding: 5px;
            color: red;
            position: absolute;
            top: 0;
            left: 5px;
        }

        #base {
            padding: 5px;

            position: absolute;
            top: 0;
            left: 0;
        }
    }

    /*when playing*/
    .flaged {
        background-color: yellow;
    }

    /*when game over and is mine*/
    .rightFlag {
        background-color: green;
    }

    /*when game over and is not mine*/
    .wrongFlag {
        background-color: blue;
    }
</style>