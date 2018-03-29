import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state: {
        DEFAULT: {
            SIZE: 9
        },
        gameboard: {
            row: 0,
            col: 0,
            map: []
        },
        isAuto: false
    },
    mutations: {
        changeGameboard({DEFAULT, gameboard}, {row, col}) {
            // clamp 9, 100
            function valid(num) {
                if (DEFAULT.SIZE <= num && num <= 100) {
                    return num;
                } else {
                    return DEFAULT.SIZE;
                }
            }

            gameboard.row = valid(parseInt(row));
            gameboard.col = valid(parseInt(col));
            gameboard.map = [];

            for (let lop = 0; lop < gameboard.row * gameboard.col; lop++) {
                gameboard.map.push(lop);
            }
        }
    },
    actions: {},
    getters: {}
});

export default store;