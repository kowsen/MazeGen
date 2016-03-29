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

var isLeft = false;

function init() {
	// Initialize a new grid
	//g = new Grid(WIDTH, HEIGHT);
	g = new EndlessGrid(WIDTH, HEIGHT, 5);

	// Carve a maze into the grid
	//maze.carveMaze(g, STARTX, STARTY, ENDX, ENDY, MINDIFF, MAXDIFF);

	// Make a new runner and attach it to the grid
	r = new SlowRunner(g, ENDX, ENDY + HEIGHT, 300);
	// r.setEndCallback(STARTX, STARTY, function() {
	// 	updateMaze();
	// 	reGenerate();
	// });

	// r.setStepCallback(function() {
	// 	updateMaze();
	// });

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

document.getElementById('generate').onclick = reGenerate;

function reGenerate() {
	if(isLeft) {
		STARTX = WIDTH - 1;
		STARTY = HEIGHT - 1;
		ENDX = 0;
		ENDY = 0;
	} else {
		STARTX = 0;
		STARTY = HEIGHT - 1;
		ENDX = WIDTH - 1;
		ENDY = 0;
	}
	WIDTH = parseInt(document.getElementById('width').value);
	HEIGHT = parseInt(document.getElementById('height').value);
	MINDIFF = parseInt(document.getElementById('minDiff').value);
	MAXDIFF = parseInt(document.getElementById('maxDiff').value);

	if(MAXDIFF < (WIDTH + HEIGHT - 1)) {
		alert("MAXDIFF needs to be at least WIDTH + HEIGHT - 1");
	} else if(MINDIFF >= MAXDIFF) {
		alert("MAXDIFF needs to be higher than MINDIFF");
	} else {
		init();
	}

	isLeft = !isLeft;
}

// Draw the grid and runner
function updateMaze() {
	//document.getElementById('maze').innerHTML = draw(g, r);
	//drawToCanvas(g, r, document.getElementById('maze'));
}

var lastScroll = 0;
var speedFactor = 2.4 * 20 / step;

var gameLoop = setInterval(function() {
	off++;
	if((off - lastScroll) > (step * HEIGHT * speedFactor)) {
		lastScroll += (step * HEIGHT * speedFactor);
		g.scrollDown();
	}
	drawToCanvas(g, r, document.getElementById('maze'), off / speedFactor + step * 7);
}, 1000 / 60);

var off = 0;

init();


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            r.move(d.LEFT);
        } else {
            r.move(d.RIGHT);
        }                       
    } else {
        if ( yDiff > 0 ) {
            r.move(d.UP); 
        } else { 
            r.move(d.DOWN);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};