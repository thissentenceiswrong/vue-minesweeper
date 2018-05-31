import {xyToIndex, nearbyCells} from "./Helper";

export default class MineSweeper {
    constructor(row, col, mines) {
        row = row || 9;
        col = col || 9;
        mines = mines || 9;

        this.numRow = row;
        this.numCol = col;
        this.numMines = mines;
        this.setMines = null;

        /**
         * An array contains object with following keys:
         *     isRevealed
         *     isMine
         *     numMinesNearby
         * @type {[Object]}
         */
        this.board = null;

        this.onGameUpdate = function () {
        };

        this.init();
    }

    init() {
        this.setMines = new Set();

        this.board = new Array(this.numRow * this.numCol);

        this.generateMines();
        this.generateBoard();
    }

    generateMines() {
        const setMines = this.setMines;
        while (setMines.size !== this.numMines) {
            let x = Math.floor(Math.random() * this.numRow);
            let y = Math.floor(Math.random() * this.numCol);
            // let mine = x * Math.pow(10, numDigits(this.numCol)) + y;
            let mine = xyToIndex(x, y, this.numRow, this.numCol);

            setMines.add(mine);
        }
    }

    generateBoard() {
        for (let x = 0; x < this.numRow; x++) {
            for (let y = 0; y < this.numCol; y++) {
                let index = xyToIndex(x, y, this.numRow, this.numCol);

                this.board[index] = {
                    isRevealed: true,
                    isMine: this.setMines.has(index),
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

    // Left click
    revealCell(x, y) {
        if (this.isMine(x, y)) {
            // todo: game over
        }

        // BFS
        let queue = [{x, y}];
        while (queue.length !== 0) {
            let cur = queue.shift();
            let curIndex = xyToIndex(x, y, this.numRow, this.numCol);
            let curCell = this.board[curIndex];

            // reveal current cell
            if (curCell.isRevealed) {
                continue;
            }

            curCell.isRevealed = true;

            // put nearby cells into the queue
            if (curCell.numMinesNearby === 0) {
                // stop when near mine
                continue;
            }

            nearbyCells(x, y, this.numRow, this.numCol).forEach((e) => {
                queue.push(e);
            });
        }
    }

    // right click
    flagCell(x, y) {

    }
}
