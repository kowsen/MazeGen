var WIDTH = 5;
var HEIGHT = 8;

var STARTX = WIDTH - 1;
var STARTY = HEIGHT - 1;

var ENDX = 0;
var ENDY = 0;

var MINDIFF = 9;
var MAXDIFF = 15;

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
	r.move(d.LEFT);
	updateMaze();
};

document.getElementById('up').onclick = function() {
	r.move(d.UP);
	updateMaze()
};

document.getElementById('right').onclick = function() {
	r.move(d.RIGHT);
	updateMaze();
};

document.getElementById('down').onclick = function() {
	r.move(d.DOWN);
	updateMaze();
};

document.onkeydown = function() {
	if(event.keyCode === 37) {
		r.move(d.LEFT);
	} else if(event.keyCode === 38) {
		r.move(d.UP);
	} else if(event.keyCode === 39) {
		r.move(d.RIGHT);
	} else if(event.keyCode === 40) {
		r.move(d.DOWN);
	} else {
		return;
	}
	updateMaze();
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