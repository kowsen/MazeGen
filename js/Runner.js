// Represents a runner on a maze, with the ability
// to move around it.
function Runner(startX, startY, grid) {

	this.x = startX;
	this.y = startY;

	var width = grid.getWidth();
	var height = grid.getHeight();

	// Move in direction dir from our current space in grid until we
	// hit a non-hallway space or a wall.
	this.move = function(dir) {
		step(dir);

		while(maze.isHallway(grid, this.x, this.y)) {
			if(step(dir) === false) {
				break;
			}
			
		}

		// print after moving (for debugging)
		draw(grid, this);
	}.bind(this);

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

		return true;
	}.bind(this);

}