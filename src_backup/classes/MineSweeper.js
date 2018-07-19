import {xyToIndex, nearbyCells} from "./Helper";

import shuffle from "shuffle-array";

function idle() {
}

export default class MineSweeper {
    constructor(row, col, mines, onGameOver, botOnGameUpdate, botOnGameOver) {
        onGameOver = onGameOver || idle;
        botOnGameUpdate = botOnGameUpdate || idle;
        botOnGameOver = botOnGameOver || idle;

        row = row || 9;
        col = col || 9;
        mines = mines || 9;

        this.numRow = Math.max(row, 0);
        this.numCol = Math.max(col, 0);
        this.numMines = Math.min(mines, this.numRow * this.numCol - 1);
        this.setMines = new Set();

        this.isGameOver = false;

        /**
         * An array contains object with following keys:
         *     isRevealed
         *     isMine
         *     isFlagged
         *     numMinesNearby
         * @type {[Object]}
         */
        this.gameboard = new Array(this.numRow * this.numCol);

        this.botOnGameUpdate = botOnGameUpdate;
        this.botOnGameOver = botOnGameOver;
        this.onGameOver = onGameOver;

        this.generateMines();
        this.generateBoard();
    }

    /**
     * 乱序，并取前k个作为雷
     * todo: make this for-free
     */
    generateMines() {
        const setMines = this.setMines;

        // init array
        let arr = [];
        for (let lop = 0; lop < this.gameboard.length; lop++) {
            arr.push(lop);
        }
        shuffle(arr);

        for (let lop = 0; lop < this.numMines; lop++) {
            setMines.add(arr[lop]);
        }
    }

    generateBoard() {
        for (let x = 0; x < this.numRow; x++) {
            for (let y = 0; y < this.numCol; y++) {
                let index = xyToIndex(x, y, this.numRow, this.numCol);

                this.gameboard[index] = {
                    isRevealed: false,
                    isMine: this.setMines.has(index),
                    isFlagged: false,
                    numMinesNearby: this.numMinesNearby(x, y)
                };
            }
        }
    }

    numMinesNearby(x, y) {
        if (this.isMine(x, y)) {
            return 0;
        }

        let count = 0;
        nearbyCells(x, y, this.numRow, this.numCol).forEach(({x, y}) => {
            count += this.isMine(x, y) ? 1 : 0;
        });

        return count;
    }

    isMine(x, y) {
        return this.setMines.has(xyToIndex(x, y, this.numRow, this.numCol));
    }

    /**
     * Game over
     * @param won: true if won
     * @param pos: a pair of value x, y
     */
    gameOver(won, pos) {
        this.isGameOver = true;

        // reveal all mines
        for (let each of this.setMines.values()) {
            this.gameboard[each].isRevealed = true;
        }

        this.onGameOver(won, pos);
        this.botOnGameOver(won, pos);
    }

    checkWinningCondition() {
        /*
        winning condition:
        Pre condition: all cells must be revealed, except mines
        num of flagged = num of mine
         */
        if (this.gameboard.filter(({isRevealed}) => !isRevealed).length === this.numMines) {
            // flag all mines
            this.gameboard
                .filter(({isMine}) => isMine)
                .map(data => {
                    data.isFlagged = true;
                });

            return true;
        }

        return false;
    }

    // Left click
    revealCell(x, y) {
        if (this.isGameOver) {
            return;
        }

        if (this.isMine(x, y)) {
            this.gameOver(false, xyToIndex(x, y, this.numRow, this.numCol));
            return;
        }

        // BFS
        const queue = [{x, y}];
        while (queue.length !== 0) {
            let cur = queue.shift();
            let curIndex = xyToIndex(cur.x, cur.y, this.numRow, this.numCol);
            let curCell = this.gameboard[curIndex];

            // reveal current cell
            if (curCell.isRevealed) {
                continue;
            }
            curCell.isRevealed = true;
            curCell.isFlagged = false;

            // put nearby cells into the queue
            if (curCell.numMinesNearby > 0) {
                // stop when near mine
                continue;
            }

            nearbyCells(cur.x, cur.y, this.numRow, this.numCol).forEach((e) => {
                queue.push(e);
            });
        }

        // check if won
        if (this.checkWinningCondition()) {
            this.gameOver(true);
        } else {
            // continue
            this.botOnGameUpdate(this.gameboard);
        }
    }

    // Right click
    flagCell(x, y) {
        if (this.isGameOver) {
            return;
        }

        let index = xyToIndex(x, y, this.numRow, this.numCol);
        if (this.gameboard[index].isRevealed) {
            return;
        }

        this.gameboard[index].isFlagged = !this.gameboard[index].isFlagged;

        // check if won
        if (this.checkWinningCondition()) {
            this.gameOver(true);
        } else {
            // continue
            this.botOnGameUpdate(this.gameboard);
        }
    }
}
