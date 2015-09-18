if (typeof(com) === 'undefined') { var com = {}; }
if (typeof(com.erikpihel) === 'undefined') { com.erikpihel = {}; }

/**
 * A Tic Tac Toe game.
 * @param selector  the selector for the game's HTML container
 */
com.erikpihel.TicTacToe = function TicTacToe(selector) {
	this.selector = selector;
	this.board = {
		X: new com.erikpihel.Board('X'),
		O: new com.erikpihel.Board('O')
	};
};

com.erikpihel.TicTacToe.prototype = {
	// milliseconds between steps
	STEP_RATE: 500,
	NUM_SQUARES: 9,
	NUM_COLS: 3,

	start: function() {
		var squares = $(this.selector + ' > div').toArray();
		var availIndices = [];
        for (var i = 0; i < this.NUM_SQUARES; i++) {
        	availIndices.push(i);
        }
        var numMarked = 0;
        var mark = this._rnd(2) === 1 ? 'X' : 'O';
        var rndAvailIndex;
        var rndSquareIndex;

        while (numMarked < this.NUM_SQUARES) {
        	rndAvailIndex = this._rnd(availIndices.length);
        	rndSquareIndex = availIndices[rndAvailIndex];
        	
        	// remove randomly selected index
        	availIndices.splice(rndAvailIndex, 1);

        	// toggle
        	mark = mark === 'X' ? 'O' : 'X';
        	// pull random square from the available squares
            this._mark(numMarked, squares[rndSquareIndex], mark);

        	var matrix = this._matrixFromArrIndex(rndSquareIndex);
        	if (this.board[mark].isGameOver(matrix[0], matrix[1], this.STEP_RATE, numMarked)) {
        		break;
        	}
            
            ++numMarked;
        }

        console.log(this.board);
	},

	// matrix[row][col] = array[col + row*numCols]
	// row = ((index + 1) / numCols) - 1
	// col = (index % numCols)
	_matrixFromArrIndex: function(arrIndex) {
		var row = Math.ceil((arrIndex + 1) / this.NUM_COLS) - 1;
		var col = arrIndex % this.NUM_COLS;
		return [row, col];
	},

	_rnd: function(n) {
		return Math.floor(Math.random() * n);
	},

	/**
	 * Marks a square as played.
	 */
	_mark: function(frame, square, mark) {
		setTimeout(function() {
			// add circle
			$(square).addClass('mark');
			// add step number
			$(square).append($('<div></div>').html(mark));
		}, frame * this.STEP_RATE);
	}
};
