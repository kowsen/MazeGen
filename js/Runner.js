// Represents a runner on a maze, with the ability
// to move around it.
function Runner(grid, startX, startY) {

	this.x = startX;
	this.y = startY;

	var width = grid.getWidth();
	var height = grid.getHeight();

	var endX;
	var endY;
	var endCallback;

	// Move in direction dir from our current space in grid until we
	// hit a non-hallway space or a wall.
	this.move = function(dir) {
		step(dir);

		while(maze.isHallway(grid, this.x, this.y)) {
			if(step(dir) === false) {
				break;
			}
		}
	}.bind(this);

	this.setEndCallback = function(x, y, cb) {
		endX = x;
		endY = y;
		endCallback = cb;
	};

	// Make a single step in the direction. Returns false if
	// we're blocked from moving, and true if we successfully move
	var step = function(dir) {
		if(grid.get(this.x, this.y, dir)) {
			return false;
		}
		
		switch(dir) {
			case d.LEFT :
				this.x--;
				break;
			case d.UP :
				this.y--;
				break;
			case d.RIGHT :
				this.x++;
				break;
			case d.DOWN :
				this.y++;
				break;
		}

		if(endCallback) {
			if(this.x === endX && this.y === endY) {
				endCallback();
			}
		}

		return true;
	}.bind(this);

}