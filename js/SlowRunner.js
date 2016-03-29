// Represents a runner on a maze, with the ability
// to move around it.
function SlowRunner(grid, startX, startY, stepLength) {

	this.x = startX;
	this.y = startY;

	var direction;
	var nextDir;

	var width = grid.getWidth();
	var height = grid.getHeight();

	this.move = function(dir) {
		nextDir = dir;
		if(!direction && !grid.get(this.x, this.y, nextDir)) {
			direction = nextDir;
			start();
		}
	};

	this.getX = function() {
		var percent;

		if(direction === d.LEFT) {
			percent = -getPercent();
		} else if(direction === d.RIGHT) {
			percent = getPercent();
		} else {
			percent = 0;
		}

		return this.x + percent;
	}.bind(this);

	this.getY = function() {
		var percent;

		if(direction === d.UP) {
			percent = -getPercent();
		} else if(direction === d.DOWN) {
			percent = getPercent();
		} else {
			percent = 0;
		}

		return this.y + percent;
	}.bind(this);

	var start;
	var getPercent;

	(function() {

		var interval;
		var lastStep;

		// Change to a series of timeouts so we can more easily
		// implement an immediate reverse.
		var intFunc = function() {
			lastStep = Date.now();
			if(direction) {
				step(direction);
				if(nextDir && !grid.get(this.x, this.y, nextDir)) {
					direction = nextDir;
					start();
				}
			}
		}.bind(this);

		start = function() {
			lastStep = Date.now();
			clearInterval(interval);
			interval = false;
			if(!interval) {
				interval = setInterval(intFunc, stepLength);
			}
		};

		getPercent = function() {
			if(lastStep) {
				return ((Date.now() - lastStep) / stepLength);
			}
			return 0;
		};

	}).bind(this)();

	// Make a single step in the direction. Returns false if
	// we're blocked from moving, and true if we successfully move
	var step = function(dir) {
		if(grid.get(this.x, this.y, dir)) {
			direction = false;
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

		if(grid.get(this.x, this.y, dir)) {
			direction = false;
		}

		return true;
	}.bind(this);

}