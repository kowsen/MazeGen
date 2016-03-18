// A function to draw a simple ASCII representation of the maze
// to the console for testing and debugging
function draw(grid, runner) {
	var width = grid.getWidth();
	var height = grid.getHeight();
	
	for(var i = 0; i < height + 1; i++) {
		var rowString = "";
		for(var j = 0; j < width; j++) {
			rowString += (grid.get(j, i, d.UP)) ? "+---" : "+   ";
		}
		console.log(rowString + "+");

		if(i !== height) {
			var colString = "";
			for(var k = 0; k < width; k++) {
				if(runner && i === runner.y && k === runner.x) {
					colString += (grid.get(k, i, d.LEFT)) ? "| K " : "  K ";
				} else {
					colString += (grid.get(k, i, d.LEFT)) ? "|   " : "    ";
				}
			}
			colString += "|";
			console.log(colString);
		}
	}
}