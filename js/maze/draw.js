// A function to return a string containing a simple ASCII representation
// of the maze for testing and debugging
function draw(grid, runner) {
	var width = grid.getWidth();
	var height = grid.getHeight();

	var mazeString = "";
	
	for(var i = 0; i < height; i++) {
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

	return mazeString;
}

var step = 30;

function drawToCanvas(grid, runner, canvas, vertOffset) {
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle="#FF0000";
    context.fillRect(0, 0, canvas.width, step);
    context.fillStyle="#000000";
    context.fillRect(0, step * 20, canvas.width, canvas.height);

    context.lineWidth = 3;

	var width = grid.getWidth();
	var height = grid.getHeight();

	var minY = grid.getTop();

	for(var i = 0; i < height * 5; i++) {
		for(var j = 0; j < width; j++) {
			if(grid.get(j, minY + i, d.UP)) {
				context.beginPath();
				context.moveTo(step * (j + 1), step * (i + 5 + minY) - vertOffset);
				context.lineTo(step * (j + 2), step * (i + 5 + minY) - vertOffset);
				context.stroke();
			}
		}

		for(var k = 0; k < width + 1; k++) {
			if(grid.get(k, minY + i, d.LEFT)) {
				context.beginPath();
				context.moveTo(step * (k + 1), step * (i + 5 + minY) - vertOffset);
				context.lineTo(step * (k + 1), step * (i + 6 + minY) - vertOffset);
				context.stroke();
			}
		}
	}

	if(runner) {
		var runnerY = (5.25 + runner.getY()) * step - vertOffset;
		if(runnerY <= step) {
			clearTimeout(gameLoop);
		}
		context.fillRect((1.25 + runner.getX()) * step, (5.25 + runner.getY()) * step - vertOffset, step / 2, step / 2);
	}
}