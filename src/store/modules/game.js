import shuffle from "shuffle-array";
import {nearbyCells} from "../../Helper";

const state = {
    row: 9,
    col: 9,
    mines: 10,
    isGameOver: false,

    setMines: new Set(),
    gameboard: [],
};

// Getter 通过返回函数的方式传参数
const getters = {
    xyToIndex(state) {
        return function (x, y) {
            return state.col * x + y;
        };
    },

    indexToxy(state) {
        return function (index) {
            return {
                x: Math.floor(index / state.col),
                y: index % state.col
            };
        };
    },

    cell(state) {
        return function(index) {
            return state.gameboard[index];
        }
    },

    numMinesNearby(state, getters) {
        /**
         * 返回位于 x y 处的cell周围地雷的个数。
         * 如果当前cell是地雷，返回 null
         */
        return function ({x, y}) {
            if (getters.isMine({x, y})) {
                return null;
            }

            let count = 0;
            nearbyCells(x, y, state.row, state.col).forEach(({x, y}) => {
                count += getters.isMine({x, y}) ? 1 : 0;
            });

            return count;
        };
    },

    isMine(state, getters) {
        /**
         * Is the cell at (x, y) a mine?
         * @param state
         * @param x
         * @param y
         * @return {Boolean}
         */
        return function ({x, y}) {
            return state.setMines.has(getters.xyToIndex(x, y));
        };
    },

    checkWinningCondition(state) {
        // todo: flag all unrevealed cells after winning
        return state.gameboard.filter(
            ({isRevealed}) => !isRevealed
        ).length === state.mines;
    },
};

const mutations = {
    /**
     * Init values for variables
     * @param state
     * @param row
     * @param col
     * @param numMines
     */
    init(state, {row, col, mines}) {
        state.row = row;
        state.col = col;
        state.mines = mines;
        state.isGameOver = false;

        state.setMines = new Set();
        state.gameboard = [];

        for (let lop = 0; lop < state.row * state.col; lop++) {
            state.gameboard.push({
                isRevealed: false,
                isMine: false,
                isFlagged: false,
                numMinesNearBy: 0
            });
        }
    },

    /**
     * Generate Mines
     * @param state
     */
    generateMines(state) {
        const setMines = state.setMines;

        // init array
        let arr = [];
        for (let lop = 0; lop < state.gameboard.length; lop++) {
            arr.push(lop);
        }
        shuffle(arr);

        while (setMines.size < state.mines) {
            let indexMine = arr.shift();

            if (state.gameboard[indexMine].isRevealed) {
                continue;
            }

            setMines.add(indexMine);
            // change the board
            state.gameboard[indexMine].isMine = true;
        }
    },

    updateBoard(state, {index, isRevealed, isMine, isFlagged, numMinesNearBy}) {
        const cell = state.gameboard[index];

        if (isRevealed !== undefined) {
            cell.isRevealed = isRevealed;
        }
        if (isMine !== undefined) {
            cell.isMine = isMine;
        }
        if (isFlagged !== undefined) {
            cell.isFlagged = isFlagged;
        }
        if (numMinesNearBy !== undefined) {
            cell.numMinesNearBy = numMinesNearBy;
        }
    },

    gameOver(state, {won, finalMove}) {
// todo
        state.isGameOver = true;
    },

};

const actions = {
    // Left click
    revealCell({commit, state, getters}, {x, y}) {
        if (state.isGameOver) {
            return;
        }

        // player clicks on mine
        if (getters.isMine({x, y})) {
            commit("gameOver", {
                won: false,
                finalMove: getters.xyToIndex(x, y)
            });

            return;
        }

        // Player clicks on normal cell
        // Do a BFS to reveal all normal cells adjacent
        const queue = [{x, y}];
        while (queue.length !== 0) {
            let cur = queue.shift();
            let curIndex = getters.xyToIndex(cur.x, cur.y);
            let curCell = state.gameboard[curIndex];

            // Reveal current cell
            if (curCell.isRevealed) {
                // Skip if already revealed
                continue;
            }

            commit("updateBoard", {
                index: curIndex,
                isRevealed: true,
                isFlagged: false
            });

            // The game just started, no mines generated
            // And player just made his first move
            // **The following code only run ONCE after init
            if (state.setMines.size === 0) {
                commit("generateMines");

                // update board here
                for (let index in state.gameboard) {
                    index = parseInt(index);

                    const numMinesNearBy = getters.numMinesNearby(getters.indexToxy(index));

                    commit("updateBoard", {
                        index: index,
                        numMinesNearBy: numMinesNearBy
                    });
                }
            }

            // stop when near mine
            if (curCell.numMinesNearBy !== 0) {
                continue;
            }

            // put nearby cells into the queue
            nearbyCells(cur.x, cur.y, state.row, state.col).forEach((e) => {
                queue.push(e);
            });
        }

        // check if won
        if (getters.checkWinningCondition) {
            commit("gameOver", {
                won: true,
                finalMove: getters.xyToIndex(x, y)
            });
        } else {
            // continue
        }
    },

    // Right click
    flagCell(state) {
// todo
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};