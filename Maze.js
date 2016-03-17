function Maze(width, height) {
	var horizCols = new LineSet(width, height + 1);
	var vertRows = new LineSet(height, width + 1);

	this.MAX_X = width;
	this.MAX_Y = height;

	this.get = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.get, vertRows.get);
	};

	this.carve = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.carve, vertRows.carve);
	};

	this.fill = function(x, y, dir) {
		return switchDir(x, y, dir, horizCols.carve, vertRows.carve);
	};

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

	this.isInteresting = function(x, y) {
		var l = vertRows.get(y, x);
		var u = horizCols.get(x, y);
		var r = vertRows.get(y, x + 1);
		var d = horizCols.get(x, y + 1);
		return(!(l && r && !u && !d || u && d && !l && !r));
	}

	this.reset = function() {
		horizCols.init();
		vertRows.init();
	};

	horizCols.init();
	vertRows.init();

}

function carveMaze(maze, startX, startY) {
	var available = constructAvailable(maze.MAX_X, maze.MAX_Y);
	//carveNode(maze, startX, startY, available);
	carveNoRecursion(maze, startX, startY, available);
}

// Like most recursion, this is some sexy code. Unfortunately, the
// call stack on browsers is small and relatively unpredictable, so
// it's probably safer to use the less elegant stack based
// recursion-esque code. Oh well.
function carveNode(maze, x, y, available) {
	available[x][y] = false;
	var dir;
	while((dir = pickRandom(available, x, y, maze.MAX_X, maze.MAX_Y)) !== -1) {
		maze.carve(x, y, dir);
		if(isHoriz(dir)) {
			carveNode(maze, x + getModifier(dir), y, available);
		} else {
			carveNode(maze, x, y + getModifier(dir), available);
		}
	}
}

function carveNoRecursion(maze, startX, startY, available) {
	var xStack = [];
	var yStack = [];
	
	xStack.push(startX);
	yStack.push(startY);

	available[startX][startY] = false;

	while(xStack.length > 0) {
		var x = xStack[xStack.length - 1];
		var y = yStack[xStack.length - 1];
		var dir = pickRandom(available, x, y, maze.MAX_X, maze.MAX_Y);
		if(dir === -1) {
			xStack.pop();
			yStack.pop();
		} else {
			maze.carve(x, y, dir);
			var newX = updateX(x, dir);
			var newY = updateY(y, dir);
			available[newX][newY] = false;
			xStack.push(newX);
			yStack.push(newY);
		}
	}
}

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