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

        this.isGameOver = false;

        /**
         * An array contains object with following keys:
         *     isRevealed
         *     isMine
         *     isFlaged
         *     numMinesNearby
         * @type {[Object]}
         */
        this.board = null;

        this.botOnGameUpdate = function () {
        };

        this.botOnGameOver = function () {
        };

        this.onGameOver = function () {
        };

        this.init();
    }

    init(row, col, mines) {
        this.numRow = row || this.numRow;
        this.numCol = col || this.numCol;
        this.numMines = mines || this.numMines;

        this.isGameOver = false;

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
            let mine = xyToIndex(x, y, this.numRow, this.numCol);

            setMines.add(mine);
        }
    }

    generateBoard() {
        for (let x = 0; x < this.numRow; x++) {
            for (let y = 0; y < this.numCol; y++) {
                let index = xyToIndex(x, y, this.numRow, this.numCol);

                this.board[index] = {
                    isRevealed: false,
                    isMine: this.setMines.has(index),
                    isFlaged: false,
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
     */
    gameOver(won) {
        this.isGameOver = true;

        // reveal all mines
        for (let each of this.setMines.values()) {
            this.board[each].isRevealed = true;
        }

        this.onGameOver(won);
        this.botOnGameOver(won);
    }

    checkWinningCondition() {
        return this.board.filter(({isRevealed}) => !isRevealed).length === this.numMines;
    }

    // Left click
    revealCell(x, y) {
        if (this.isGameOver) {
            return;
        }

        if (this.isMine(x, y)) {
            // todo: flag the one you clicked
            this.gameOver(false);
            return;
        }

        // BFS
        const queue = [{x, y}];
        while (queue.length !== 0) {
            let cur = queue.shift();
            let curIndex = xyToIndex(cur.x, cur.y, this.numRow, this.numCol);
            let curCell = this.board[curIndex];

            // reveal current cell
            if (curCell.isRevealed) {
                continue;
            }
            curCell.isRevealed = true;

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
            this.botOnGameUpdate(this.board);
        }
    }

    // Right click
    flagCell(x, y) {
        if (this.isGameOver) {
            return;
        }

        let index = xyToIndex(x, y, this.numRow, this.numCol);
        this.board[index].isFlaged = true;
    }
}
