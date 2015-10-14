if (typeof(com) === 'undefined') { var com = {}; }
if (typeof(com.erikpihel) === 'undefined') { com.erikpihel = {}; }

com.erikpihel.Intersection = {
	calculate: function(squareOne, squareTwo) {
		// if no intersection horizontally
		if (squareOne.right < squareTwo.left || squareTwo.right < squareOne.left) {
			return null;
		}

		// if no intersection vertically
		else if (squareOne.bottom < squareTwo.top || squareTwo.bottom < squareOne.top) {
			return null;
		}

		else {
			var css = {};
			this._addLeftAndWidth(css, squareOne, squareTwo);
			this._addTopAndHeight(css, squareOne, squareTwo);
			return css;
		}
	},

	_addLeftAndWidth: function(css, squareOne, squareTwo) {
		// if squareOne is left of squareTwo
		if (squareOne.left < squareTwo.left) {
			leftSquare = squareOne;
			rightSquare = squareTwo;
		}

		// if squareOne is right of squareTwo
		else {
			leftSquare = squareTwo;
			rightSquare = squareOne;
		}

		var width = leftSquare.right - rightSquare.left;
		css.left = (leftSquare.right - width) + 'px';
		css.width = width + 'px';
	},

	_addTopAndHeight: function(css, squareOne, squareTwo) {
		// if squareOne is above squareTwo
		if (squareOne.top < squareTwo.top) {
			topSquare = squareOne;
			bottomSquare = squareTwo;
		}

		// if squareOne is below squareTwo
		else {
			topSquare = squareTwo;
			bottomSquare = squareOne;
		}
		
		var height = topSquare.bottom - bottomSquare.top;
		css.top = (topSquare.bottom - height) + 'px';
		css.height = height + 'px';
	}
};
