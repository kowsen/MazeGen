// Abstract representation of a grid, with the ability to check,
// carve, and re-fill walls using X, Y, and a direction.
function Grid(width, height) {
	
	var horizCols = new LineSet(width, height + 1);
	var vertRows = new LineSet(height, width + 1);

	// Returns true if there's a line in dir direction from x, y
	this.get = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.get, vertRows.get);
	};

	// Removes the line in dir direction from x, y
	this.carve = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.carve, vertRows.carve);
	};

	// Adds the line in dir direction from x, y
	this.fill = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.fill, vertRows.fill);
	};

	// Gets the grid's width
	this.getWidth = function() {
		return width;
	};

	// Gets the grid's height
	this.getHeight = function() {
		return height;
	};

	// Resets the grid to have all lines active
	this.init = function() {
		horizCols.init();
		vertRows.init();
	};

	// Helper function to change execution based upon the direction.
	// Aids in process to abstract horizontal lines and vertical lines
	// into x, y, and dir.
	function switchDir(x, y, dir, horizFunc, vertFunc) {
		switch(dir) {
			case d.LEFT :
				return vertFunc(y, x);
			case d.UP :
				return horizFunc(x, y);
			case d.RIGHT :
				return vertFunc(y, x + 1);
			case d.DOWN :
				return horizFunc(x, y + 1);
		}
		return -1;
	}

}