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
		if(direction && dir % 2 === direction % 2 && dir !== direction) {
			nextDir = dir;
			reverse();
		} else if(!direction && !grid.get(this.x, this.y, nextDir)) {
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
	var reverse;

	(function() {

		var timeout;
		var lastStep;

		// Change to a series of timeouts so we can more easily
		// implement an immediate reverse.
		var intFunc = function() {
			lastStep = Date.now();
			if(direction) {
				step(direction);
				if(nextDir && !grid.get(this.x, this.y, nextDir)) {
					direction = nextDir;
				}
			}
			timeout = setTimeout(intFunc, stepLength);
		}.bind(this);

		start = function() {
			lastStep = Date.now();
			clearTimeout(timeout);
			timeout = false;
			timeout = setTimeout(intFunc, stepLength);
		};

		getPercent = function() {
			if(lastStep) {
				return ((Date.now() - lastStep) / stepLength);
			}
			return 0;
		};

		reverse = function() {
			var now = Date.now();
			var interval = now - lastStep;
			lastStep = now - (stepLength - (now - lastStep));
			step(direction);
			direction = nextDir;
			clearTimeout(timeout);
			timeout = setTimeout(intFunc, interval);
		};

	}).bind(this)();

	// 1 - 24
	// 2 - 13
	// 3 - 24
	// 4 - 13

	// Make a single step in the direction. Returns false if
	// we're blocked from moving, and true if we successfully move
	var step = function(dir) {
		if(grid.get(this.x, this.y, dir)) {

			var foundHallway = false;

			if(dir % 2 === 1) {
				var isLeft = grid.get(this.x, this.y, d.LEFT);
				var isRight = grid.get(this.x, this.y, d.RIGHT);
				if(isLeft && !isRight) {
					direction = d.RIGHT;
					foundHallway = true;
				} else if(!isLeft && isRight) {
					direction = d.LEFT;
					foundHallway = true;
				}
			} else {
				var isUp = grid.get(this.x, this.y, d.UP);
				var isDown = grid.get(this.x, this.y, d.DOWN);
				if(isUp && !isDown) {
					direction = d.DOWN;
					foundHallway = true;
				} else if(!isUp && isDown) {
					direction = d.UP;
					foundHallway = true;
				}
			}

			if(!foundHallway) {
				direction = false;
				return false;
			}
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
			var foundHallway = false;

			if(dir % 2 === 1) {
				var isLeft = grid.get(this.x, this.y, d.LEFT);
				var isRight = grid.get(this.x, this.y, d.RIGHT);
				if(isLeft && !isRight) {
					direction = d.RIGHT;
					foundHallway = true;
				} else if(!isLeft && isRight) {
					direction = d.LEFT;
					foundHallway = true;
				}
			} else {
				var isUp = grid.get(this.x, this.y, d.UP);
				var isDown = grid.get(this.x, this.y, d.DOWN);
				if(isUp && !isDown) {
					direction = d.DOWN;
					foundHallway = true;
				} else if(!isUp && isDown) {
					direction = d.UP;
					foundHallway = true;
				}
			}

			if(!foundHallway) {
				direction = false;
			} else {
				nextDir = false;
			}
		}

		return true;
	}.bind(this);

}