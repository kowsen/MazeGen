// Functions for maze creation and checking.
var maze;

(function() {

	// Resets the grid, and carves a maze into it, beginning its algorithm
	// at startX, startY. This could be much more elegant if I used recursion,
	// but there's a chance we'd overflow the call stack in some browsers,
	// and it's not worth the risk.
	// Rejects the maze and rebuilds if it takes less than minDiff or more than
	// maxDiff steps to get from startX, startY to endX, endY.
	// NOTE: The lowest possible difficulty for a maze is width + height - 1
	function carveMaze(grid, startX, startY, endX, endY, minDiff, maxDiff) {
		while(!carveHelper(grid, startX, startY, endX, endY, minDiff, maxDiff));
	}

	// Placed into helper so we don't add onto the call stack every time we
	// fail due to difficulty and rebuild the maze. This way we can return
	// a failure and make a fresh call.
	function carveHelper(grid, startX, startY, endX, endY, minDiff, maxDiff) {

		// Resets the grid
		grid.init();

		var width = grid.getWidth();
		var height = grid.getHeight();

		// If available[x][y] is true, we haven't visited x, y yet.
		var available = constructAvailable(width, height);

		// The stack of points to process
		var xStack = [];
		var yStack = [];
		
		// Prime our loop with the starting point
		xStack.push(startX);
		yStack.push(startY);

		// Mark the starting point as visited
		available[startX][startY] = false;

		// Tracks how many steps away from startX, startY we are
		var counter = 0;

		// Until we've checked all points
		while(xStack.length > 0) {
			// pull our value from the top of the stack
			var x = xStack[xStack.length - 1];
			var y = yStack[xStack.length - 1];
			var dir = pickRandom(available, x, y, width, height);
			// If there's no available direction
			if(dir === -1) {
				// We're done with this point, remove it from the stack
				xStack.pop();
				yStack.pop();

				counter--;
			} else {
				// Carve in the free direction
				grid.carve(x, y, dir);

				// Get the coordinates of the point we carved into
				var newX = dirFunc.updateX(x, dir);
				var newY = dirFunc.updateY(y, dir);

				// Mark it unavailable and add it to the stack
				available[newX][newY] = false;
				xStack.push(newX);
				yStack.push(newY);

				counter++;

				// If we've finished the usable part of the maze and are not in the
				// difficulty window, return false - maze creation failed.
				if(newX === endX && newY === endY && (counter < minDiff || counter > maxDiff)) {
					return false;
				}
			}
		}

		return true;

	}

	// Constructs our available array for the pathfinding algorithm
	function constructAvailable(max_x, max_y) {
		var available = [];
		for(var i = 0; i < max_x; i++) {
			available[i] = [];
			for(var j = 0; j < max_y; j++) {
				available[i][j] = true;
			}
		}
		return available;
	}

	// Picks a random direction from x, y that is marked available in the
	// available array, or returns -1 if nowhere is available.
	function pickRandom(available, x, y, max_x, max_y) {
		var possibleDirections = [];

		if(x !== 0 && available[x-1][y])
			possibleDirections.push(d.LEFT);

		if(y !== 0 && available[x][y-1])
			possibleDirections.push(d.UP);

		if(x !== max_x - 1 && available[x+1][y])
			possibleDirections.push(d.RIGHT);

		if(y !== max_y - 1 && available[x][y+1])
			possibleDirections.push(d.DOWN);

		if(possibleDirections.length === 0) {
			return -1;
		} else {
			var index = Math.floor(Math.random() * possibleDirections.length);
			return possibleDirections[index];
		}
	}

	// Checks if the coordinate is in a hallway (either only up and down or only
	// left and right open). Used in moving through the maze, since hallway
	// spaces aren't particularly interesting.
	function isHallway(grid, x, y) {
		var left = grid.get(x, y, d.LEFT);
		var up = grid.get(x, y, d.UP);
		var right = grid.get(x, y, d.RIGHT);
		var down = grid.get(x, y, d.DOWN);
		return(left && right && !up && !down || up && down && !left && !right);
	}

	maze = {
		carveMaze : carveMaze,
		isHallway : isHallway
	};

})();