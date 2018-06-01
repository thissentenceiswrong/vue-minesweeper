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
        computed: {
            cellClassObject: function () {
                if (!this.item["isRevealed"]) {
                    if (this.item["isFlaged"]) {
                        return {
                            flaged: true
                        };
                    }

                    return {
                        unrevealed: true
                    };
                }

                if (this.item["isMine"]) {
                    if (this.item["isFlaged"]) {
                        return {
                            correctFlag: true
                        };
                    }

                    return {
                        isMine: true,
                    };
                }

                if (this.item["numMinesNearby"] > 0) {
                    return {
                        mineNearby: true
                    };
                }

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

    .mineNearby {
        background-color: gray;
    }

    .empty {
        background-color: white;
    }
</style>