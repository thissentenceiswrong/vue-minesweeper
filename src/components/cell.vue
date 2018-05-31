<template>
    <div>
        <div id="container" v-bind:style="containerStyleObject">
            <div id="cell"
                 v-bind:class="cellClassObject"
                 v-bind:style="cellStyleObject"
            >{{cell}}
            </div>
        </div>

        <div id="clearFloat"></div>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props: ["data", "sizing"],
        data: function () {
            return {
                widthCell: 40,
            };
        },
        computed: {
            cell: function () {
                if (this.data["isMine"]) {
                    return 'X';
                }

                return this.data["numMinesNearby"] === 0 ? '' : this.data["numMinesNearby"];
            },
            cellClassObject: function () {
                if (!this.data["isRevealed"]) {
                    return {
                        unrevealed: true
                    };
                }

                if (this.data["isMine"]) {
                    return {
                        isMine: true,
                    };
                }

                if (this.data["numMinesNearby"] > 0) {
                    return {
                        mineNearby: true
                    };
                }

                return {
                    empty: true
                };
            },
            containerStyleObject: function () {
                return {
                    width: `${this.widthCell * this.sizing.x}px`
                };
            },
            cellStyleObject: function () {
                return {
                    width: `${this.widthCell}px`,
                    height: `${this.widthCell}px`
                };
            }
        }
    };
</script>

<style scoped lang="scss">
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

    #container {

    }

    #cell {
        float: left;
        display: block;

        box-sizing: border-box;
        border: 1px solid black;
    }

    #clearFloat {
        clear: right;
    }
</style>