<template>
    <div v-bind:class="cellClassObject">{{cell}}</div>
</template>

<script>
    export default {
        name: "cell",
        props: ["index", 'item'],
        computed: {
            cellClassObject: function () {
                if (!this.item["isRevealed"]) {
                    return {
                        unrevealed: true
                    };
                }

                if (this.item["isMine"]) {
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
                if (this.item["isMine"]) {
                    return 'X';
                }

                return this.item["numMinesNearby"] === 0 ? '' : this.item["numMinesNearby"];
            }
        }

    };
</script>

<style scoped>
    .unrevealed {
        background-color: black;
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