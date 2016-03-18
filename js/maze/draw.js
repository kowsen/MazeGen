// A function to return a string containing a simple ASCII representation
// of the maze for testing and debugging
function draw(grid, runner) {
	var width = grid.getWidth();
	var height = grid.getHeight();

	var mazeString = "";
	
	for(var i = 0; i < height + 1; i++) {
		var rowString = "";
		for(var j = 0; j < width; j++) {
			rowString += (grid.get(j, i, d.UP)) ? "+---" : "+   ";
		}
		//console.log(rowString + "+");
		mazeString += (rowString + "+<br>");

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
			//console.log(colString);
			mazeString += (colString + "<br>");
		}
	}

	return mazeString
}