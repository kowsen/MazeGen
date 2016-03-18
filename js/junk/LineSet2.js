// A version of LineSet that uses homemade bit arrays instead of a
// 2 dimensional boolean array to track the state of the maze.
// Unfortunately, it runs a bit slower, so I don't think I'll use it.
// Honestly, I'm just proud that it worked at all though.

function LineSet(radix, modulo) {
	var bits = new BitArray(radix * modulo);

	this.carve = function(rad, mod) {
		bits.set(rad * radix + mod, 0);
	};

	this.fill = function(rad, mod) {
		bits.set(rad * radix + mod, 1);
	};

	this.get = function(rad, mod) {
		return bits.get(rad * radix + mod);
	}

	this.init = function() {
		bits.reset();
	}
}

function BitArray(length) {
	var storage;

	this.set = function(pos, val) {
		var radix = Math.floor(pos / 32);
		var shift = pos % 32;
		var mask = 1 << shift;
		if(val) {
			storage[radix] |= mask;
		} else {
			storage[radix] &= ~mask;
		}
	};

	this.get = function(pos) {
		var radix = Math.floor(pos / 32);
		var shift = pos % 32;
		var mask = 1 << shift;
		var returnVal = storage[radix] & mask;
		return (returnVal) ? true : false;
	};

	this.reset = function() {
		storage = [];
		for(var i = 0; i < Math.ceil(length / 32); i++) {
			storage.push(~0);
		}
	}

	this.reset();
}