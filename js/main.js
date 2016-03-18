var WIDTH = 5;
var HEIGHT = 8;

var STARTX = WIDTH - 1;
var STARTY = HEIGHT - 1;

var ENDX = 0;
var ENDY = 0;

var MINDIFF = 15;
var MAXDIFF = 20;

var g;
var r;

function init() {
	// Initialize a new grid
	g = new Grid(WIDTH, HEIGHT);

	// Carve a maze into the grid
	maze.carveMaze(g, STARTX, STARTY, ENDX, ENDY, MINDIFF, MAXDIFF);

	// Make a new runner and attach it to the grid
	r = new Runner(0, 0, g);

	updateMaze();
}

document.getElementById('maze').style.whiteSpace = 'pre';
document.getElementById('maze').style.fontFamily = 'Courier New'

document.getElementById('left').onclick = function() {
	moveAndCheck(d.LEFT);
	updateMaze();
};

document.getElementById('up').onclick = function() {
	moveAndCheck(d.UP);
	updateMaze()
};

document.getElementById('right').onclick = function() {
	moveAndCheck(d.RIGHT);
	updateMaze();
};

document.getElementById('down').onclick = function() {
	moveAndCheck(d.DOWN);
	updateMaze();
};

document.onkeydown = function() {
	if(event.keyCode === 37) {
		moveAndCheck(d.LEFT);
	} else if(event.keyCode === 38) {
		moveAndCheck(d.UP);
	} else if(event.keyCode === 39) {
		moveAndCheck(d.RIGHT);
	} else if(event.keyCode === 40) {
		moveAndCheck(d.DOWN);
	} else {
		return;
	}
	updateMaze();
}

function moveAndCheck(dir) {
	r.move(dir);
	if(r.x === STARTX && r.y === STARTY) {
		updateMaze();
		alert("FINISHED!");
		init();
	}
}

document.getElementById('width').value = WIDTH;
document.getElementById('height').value = HEIGHT;
document.getElementById('minDiff').value = MINDIFF;
document.getElementById('maxDiff').value = MAXDIFF;

document.getElementById('generate').onclick = function() {
	WIDTH = parseInt(document.getElementById('width').value);
	HEIGHT = parseInt(document.getElementById('height').value);
	MINDIFF = parseInt(document.getElementById('minDiff').value);
	MAXDIFF = parseInt(document.getElementById('maxDiff').value);
	STARTX = WIDTH - 1;
	STARTY = HEIGHT - 1;

	if(MAXDIFF < (WIDTH + HEIGHT - 1)) {
		alert("MAXDIFF needs to be at least WIDTH + HEIGHT - 1");
	} else if(MINDIFF >= MAXDIFF) {
		alert("MAXDIFF needs to be higher than MINDIFF");
	} else {
		init();
	}
};

// Draw the grid and runner
function updateMaze() {
	document.getElementById('maze').innerHTML = draw(g, r);
}

init();