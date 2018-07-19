<template>
    <div id="flag" v-bind:class="objClass">
        <i id="base" class="fas fa-flag"></i>
        <i v-if="wrong" id="cross" class="fas fa-times"></i>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        props: ["item"],
        computed: {
            ...mapState('game', {
                isGameOver: state => state.isGameOver
            }),
            wrong: function () {
                return this.isGameOver ? !this.item.isMine : false;
            },
            objClass: function () {
                return {
                    flaged: !this.isGameOver,
                    wrongFlag: this.isGameOver && this.wrong,
                    rightFlag: this.isGameOver && !this.wrong
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