// The heart of the maze representation, is essentially just
// a 2 dimensional boolean array representing either horizontal
// or vertical lines in the maze. This is pulled into its own
// object so I could easily change the underlying maze representation
// if I found something that ran faster without having to change code
// in the upper layers.

function LineSet(radix, modulo) {
	
	var lines = [];

	this.carve = function(radix, modulo) {
		lines[radix][modulo] = false;
	};

	this.fill = function(radix, modulo) {
		lines[radix][modulo] = true;
	};

	this.get = function(radix, modulo) {
		return lines[radix][modulo];
	};

	this.init = function() {
		for(var i = 0; i < radix; i++) {
			lines[i] = [];
			for(var j = 0; j < modulo; j++) {
				lines[i][j] = true;
			}
		}
	}

}