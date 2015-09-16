if (typeof(com) === 'undefined') { var com = {}; }
if (typeof(com.erikpihel) === 'undefined') { com.erikpihel = {}; }

com.erikpihel.Matrix = function Matrix(selector, numRows, numCols) {
	this.selector = selector;
	this.numRows = numRows;
	this.numCols = numCols;
	this.row = 0;
	this.col = 0;
	this.untraveledRows = [0, numRows - 1];
	this.untraveledCols = [0, numCols - 1];
	this.currentDir = this.DIR.East;
};

com.erikpihel.Matrix.prototype = {
	// milliseconds between steps
	STEP_RATE: 500,
	DIR: { East: 'east', South: 'south', West: 'west', North: 'north' },

	/**
	 * Appends (rows * cols) divs to the container.
	 */
	create: function() {
		var container = $(this.selector);

		for (var i = 0; i < this.numRows * this.numCols; i++) {
			container.append('<div></div>');
		}

		return this;
	},

	/**
	 * Updates css: sets container width based on rows and columns
	 * and avoids double-borders.
	 * Could also be done via SASS/LESS.
	 */
	format: function(boxWidth) {
		$(this.selector).width((boxWidth * this.numCols) + (this.numCols * 2));

		// avoid double-borders
		$(this.selector + ' > div:nth-child(' + this.numCols + 'n)').addClass('right-border');
		var bottomRowN = (this.numRows * this.numCols) - this.numCols + 1;
		$(this.selector + ' > div:nth-child(n+' + bottomRowN + ')').addClass('bottom-border');
		return this;
	},

	traverse: function() {
		var squares = $(this.selector + ' > div').toArray();
        var numMarked = 0;

        while (numMarked < squares.length) {
        	// matrix[row][col] = array[col + row*numCols]
            var arrIndex = this.col + (this.row * this.numCols);
            //console.log(this.row + ', ' + this.col + ', arrIndex: ' + arrIndex);
            this._mark(numMarked, squares[arrIndex]);
            this._step();
            ++numMarked;
        }
	},

	/**
	 * Moves one step in the matrix.
	 */
	_step: function() {
		this._updateDirection();

		switch (this.currentDir) {
			case this.DIR.East:
				this.col++;
				break;

			case this.DIR.South:
				this.row++;
				break;

			case this.DIR.West:
				this.col--;
				break;

			case this.DIR.North:
				this.row--;
				break;
		}
	},

	/**
	 * Checks if we need to turn and, if so, shrinks the untraveled matrix.
	 */
	_updateDirection: function() {
		// if we're on the northern edge moving east
		if (this.row === this.untraveledRows[0] && this.currentDir === this.DIR.East) {
			// if we've just hit the eastern edge
			if (this.col === this.untraveledCols[1]) {
				// we're done with the row: shrink the matrix
				this.untraveledRows[0] = this.untraveledRows[0] + 1;
				// turn south
				this.currentDir = this.DIR.South;
			}
		}

		// if we're on the eastern edge moving south
		else if (this.col === this.untraveledCols[1] && this.currentDir === this.DIR.South) {
			// if we've just hit the southern edge
			if (this.row === this.untraveledRows[1]) {
				// we're done with the column: shrink the matrix
				this.untraveledCols[1] = this.untraveledCols[1] - 1;
				// turn west
				this.currentDir = this.DIR.West;
			}
		}

		// if we're on the southern edge moving west
		else if (this.row === this.untraveledRows[1] && this.currentDir === this.DIR.West) {
			// if we've just hit the western edge
			if (this.col === this.untraveledCols[0]) {
				// we're done with the row: shrink the matrix
				this.untraveledRows[1] = this.untraveledRows[1] - 1;
				// turn north
				this.currentDir = this.DIR.North;
			}
		}

		// if we're on the western edge moving north
		else if (this.col === this.untraveledCols[0] && this.currentDir === this.DIR.North) {
			// if we've just hit the northern edge
			if (this.row === this.untraveledRows[0]) {
				// we're done with the col: shrink the matrix
				this.untraveledCols[0] = this.untraveledCols[0] + 1;
				// turn east
				this.currentDir = this.DIR.East;
			}
		}
	},

	/**
	 * Marks a square as traveled.
	 */
	_mark: function(frame, square) {
		setTimeout(function() {
			// add circle
			$(square).addClass('mark');
			// add step number
			$(square).append($('<div></div>').html(frame + 1));
		}, frame * this.STEP_RATE);
	}
};
