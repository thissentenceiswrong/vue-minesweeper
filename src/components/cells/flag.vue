<template>
    <div id="flag" v-bind:class="objClass">
        <i id="base" class="fas fa-flag"></i>
        <i v-if="wrong" id="cross" class="fas fa-times"></i>
    </div>
</template>

<script>
    export default {
        name: "flag",
        props: ["wrong", "gameover"],
        computed: {
            objClass: function () {
                if (this.gameover) {
                    if (this.wrong) {
                        // return {
                            // red: true
                        // };
                    } else {
                        return {
                            green: true
                        };
                    }
                } else {
                    return {
                        yellow: true
                    };
                }
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

    .yellow {
        background-color: yellow;
    }

    .green {
        background-color: green;
    }
</style>