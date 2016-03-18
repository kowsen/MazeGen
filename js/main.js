var WIDTH = 5;
var HEIGHT = 8;

// Initialize a new grid
var g = new Grid(WIDTH, HEIGHT);

// Carve a maze into the grid
maze.carveMaze(g, WIDTH - 1, HEIGHT - 1, 0, 0, 25, 30);

// Make a new runner and attach it to the grid
var r = new Runner(0, 0, g);

// Draw the grid and runner
draw(g, r);