function Runner(startX, startY, maze) {
	var self = this;

	this.x = startX;
	this.y = startY;

	this.move = function(dir) {
		var boundStep = step.bind(self);
		boundStep(dir);

		while(!maze.isInteresting(self.x, self.y)) {
			boundStep(dir);
		}

		self.draw();
	};

	this.carve = function(dir) {
		return maze.carve(this.x, this.y, dir);
	};

	this.draw = function() {
		for(var i = 0; i < maze.MAX_Y + 1; i++) {
			var rowString = "";
			for(var j = 0; j < maze.MAX_X; j++) {
				rowString += (maze.get(j, i, d.UP)) ? "+---" : "+   ";
			}
			console.log(rowString + "+");

			if(i !== maze.MAX_Y) {
				var colString = "";
				for(var k = 0; k < maze.MAX_X; k++) {
					if(i === this.y && k === this.x) {
						colString += (maze.get(k, i, d.LEFT)) ? "| K " : "  K ";
					} else {
						colString += (maze.get(k, i, d.LEFT)) ? "|   " : "    ";
					}
				}
				colString += "|";
				console.log(colString);
			}
		}
	};

	function step(dir) {
		switch(dir) {
			case d.LEFT :
				if(this.x > 0 && !maze.get(this.x, this.y, dir))
					this.x--;
				break;
			case d.UP :
				if(this.y > 0 && !maze.get(this.x, this.y, dir))
					this.y--;
				break;
			case d.RIGHT :
				if(this.x < maze.MAX_X - 1 && !maze.get(this.x, this.y, dir))
					this.x++;
				break;
			case d.DOWN :
				if(this.y < maze.MAX_Y - 1 && !maze.get(this.x, this.y, dir))
					this.y++;
				break;
		}
	}

}