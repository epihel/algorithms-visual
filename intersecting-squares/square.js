if (typeof(com) === 'undefined') { var com = {}; }
if (typeof(com.erikpihel) === 'undefined') { com.erikpihel = {}; }

com.erikpihel.Square = function Square(selector, containerSize, squareSize) {
	this.container = $(selector).css({ width: containerSize, height: containerSize });
	this.containerSize = containerSize;
	this.squareSize = squareSize;
};

com.erikpihel.Square.prototype = {
	create: function(numSquares) {
		var squares = [];

		for (var i = 0; i < numSquares; i++) {
			squares.push(this._addSquare());
		}

		this._addIntersections(squares);
	},

	_addSquare: function() {
		var left = this._getRandomPos();
		var top = this._getRandomPos();

		this._addDiv('square', {
			left: left + 'px',
			top: top + 'px',
			width: this.squareSize + 'px',
			height: this.squareSize + 'px'
		});
		
		return {
			left: left,
			right: left + this.squareSize,
			top: top,
			bottom: top + this.squareSize
		};
	},

	// algorithm complexity: O(n(n-1)/2)
	_addIntersections: function(squares) {
		var css;
		for (var i = 0; i < squares.length; i++) {
			for (var j = i + 1; j < squares.length; j++) {
				css = com.erikpihel.Intersection.calculate(squares[i], squares[j]);
				if (css) {
					this._addDiv('intersection', css);
				}
			}
		}
	},

	_addDiv: function(clsName, css) {
		this.container.append(
			$('<div></div>').attr('class', clsName).css(css)
		);
	},

	_getRandomPos: function() {
		// - 2 accounts for container and square borders
		return this._rnd(this.containerSize - this.squareSize - 2);
	},

	_rnd: function(n) {
		return Math.floor(Math.random() * n);
	}
};
