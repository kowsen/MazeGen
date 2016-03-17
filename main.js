var m = new Maze(20, 20);

var r = new Runner(0, 0, m);

var startTime = Date.now();

for(var i = 0; i < 10; i++) {
	m.reset();
	carveMaze(m, 0, 0);
}

var endTime = Date.now();

console.log("TOTAL TIME: " + (endTime - startTime));