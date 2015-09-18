if (typeof(com) === 'undefined') { var com = {}; }
if (typeof(com.erikpihel) === 'undefined') { com.erikpihel = {}; }

com.erikpihel.Board = function Board(mark) {
	this.mark = mark;
	// horizontal or vertical victory if any reach 3:
	// stores counts for each row and col
	this.rows = [0, 0, 0];
	this.cols = [0, 0, 0];

	// diagonal victory
	this.center = false;
	// left-to-right: upper-left (0,0), lower-right (2,2)
	this.upperLeft = false;
	this.lowerRight = false;
	// right-to-left: upper-right (0,2), lower-left (2,0)
	this.upperRight = false;
	this.lowerLeft = false;
};

com.erikpihel.Board.prototype = {
	isGameOver: function(row, col, frame, frameRate) {
		var gameOver = false;

		// horizontally
		if (this._isHorizontalOrVerticalVictory(this.rows, row)) {
			this._writeMsg(frame, frameRate, 'horizontally', 'row' + (row + 1));
			gameOver = true;
		}

		// vertically
		else if (this._isHorizontalOrVerticalVictory(this.cols, col)) {
			this._writeMsg(frame, frameRate, 'vertically', 'col' + (col + 1));
			gameOver = true;
		}

		// diagonally
		else {
			if (row === col) {
				switch (row) {
					case 0:
						this.upperLeft = true;
						break;
					case 1:
						this.center = true;
						break;
					case 2:
						this.lowerRight = true;
						break;
				}
			}

			else if (row === 0 && col === 2) {
				this.upperRight = true;
			}

			else if (row === 2 && col === 0) {
				this.lowerLeft = true;
			}

			if (this.center) {
				var cssCls;
				
				if (this.upperLeft && this.lowerRight) {
					cssCls = 'left-to-right';
				}

				else if (this.upperRight && this.lowerLeft) {
					cssCls = 'right-to-left';
				}
				
				if (cssCls) {
					this._writeMsg(frame, frameRate, 'diagonally', cssCls);
					gameOver = true;
				}
			}
		}

		return gameOver;
	},

	_isHorizontalOrVerticalVictory: function(arr, index) {
		arr[index] = arr[index] + 1;
		return arr[index] === 3;
	},

	_writeMsg: function(frame, frameRate, direction, cssCls) {
		setTimeout(function() {
			$('#msg').html('Game over! ' + this.mark + ' wins ' + direction + '!');
			$('.victory').addClass(cssCls);
		}.bind(this), frame * frameRate);
	}
};
