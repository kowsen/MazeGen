function EndlessGrid(width, sectionHeight, numVisible) {

	var grids = [];
	var topGrid = 0;

	// Returns true if there's a line in dir direction from x, y
	// If the coordinates are outside of our sliding window of grids,
	// always returns true.
	this.get = function(x, y, dir) {
		y -= (topGrid * sectionHeight);
		if(y >= (sectionHeight * numVisible) || y < 0) {
			return true;
		}
		var index = Math.floor(y / sectionHeight);
		var remainder = y % sectionHeight;
		return grids[index].get(x, remainder, dir);
	};

	// Gets the grid's width
	this.getWidth = function() {
		return width;
	};

	this.getTop = function() {
		return sectionHeight * topGrid;
	};

	this.getHeight = function() {
		return sectionHeight;
		//return sectionHeight * (numVisible + 2);
	};

	this.scrollDown = function() {
		topGrid++;
		var grid = grids.shift();
		carveHelper(grid, false);
		grids.push(grid);
	};

	var carveHelper;

	(function() {

		var prevXHole = 0;

		carveHelper = function(grid, isTop) {
			//var nextXHole = Math.floor(Math.random() * width);
			var nextXHole = (prevXHole === 0) ? width - 1 : 0;
			maze.carveMaze(grid, nextXHole, sectionHeight - 1, prevXHole, 0, 15, 20);
			if(!isTop) {
				grid.carve(prevXHole, 0, d.UP);
			}
			grid.carve(nextXHole, sectionHeight - 1, d.DOWN);
			prevXHole = nextXHole;
		}

	})();

	function init() {
		for(var i = 0; i < numVisible; i++) {
			var grid = new Grid(width, sectionHeight);
			carveHelper(grid, (i === 0));
			grids.push(grid);
		}
	}

	init();

}