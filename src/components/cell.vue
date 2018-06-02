<template>
    <div id="cell"
         v-bind:class="cellClassObject"
         @click="$emit('click-cell', index)"
         @contextmenu.prevent="$emit('flag-cell', index)">
        {{cell}}
    </div>
</template>

<script>
    export default {
        name: "cell",
        props: ["index", 'item'],
        data: function() {
            return {
                isGameOver: false,
                isWon: false,
                // index of mine triggered by user
                mineTriggered: null
            };
        },
        methods: {
            gameOver: function(won, mineTriggered) {
                this.isGameOver = true;
                this.isWon = won;
                this.mineTriggered = mineTriggered;
            }
        },
        computed: {
            cellClassObject: function () {
                if (this.state) {
                    // if gameover

                    // flaged, right / mine, flaged
                    if (this.item.isMine && this.item.isFlaged) {
                        return {
                            correctFlag: true
                        };
                    }

                    // flaged, wrong
                    if (!this.item.isMine && this.item.isFlaged) {
                        return {
                            wrongFlag: true
                        };
                    }

                    // mine, missed
                    if (this.item.isMine && !this.item.isFlaged) {
                        return {
                            isMine: true
                        };
                    }

                    // mine, triggered
                    if (this.mineTriggered === this.index) {
                        return {
                            mineTriggered: true
                        };
                    }

                } else {
                    // unrevealed, normal
                    if (!this.item.isRevealed) {

                        // unrevealed, flaged
                        if (this.item.isFlaged) {
                            return {
                                flaged: true
                            };
                        }

                        return {
                            unrevealed: true
                        };
                    } else {
                        // number
                        if (this.item["numMinesNearby"] > 0) {
                            return {
                                mineNearby: true
                            };
                        }
                    }
                }

                // number == 0
                return {
                    empty: true
                };
            },
            cell: function () {
                if (!this.item["isRevealed"]) {
                    return '';
                }

                return this.item["numMinesNearby"] === 0 ? '' : this.item["numMinesNearby"];
            }
        }

    };
</script>

<style scoped>
    #cell {
        text-align: center;
        user-select: none;
    }

    .unrevealed {
        background-color: black;
        cursor: pointer;
    }

    .flaged {
        background-color: yellow;
    }

    .correctFlag {
        background-color: green;
    }

    .wrongFlag {
        background-color: blue;
    }

    .isMine {
        background-color: red;
    }

    .mineTriggered {
        background-color: fuchsia;
    }

    .mineNearby {
        background-color: gray;
    }

    .empty {
        background-color: white;
    }
</style>