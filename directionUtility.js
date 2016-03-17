var d = {
	UP : 1,
	LEFT : 2,
	DOWN : 3,
	RIGHT : 4
};

function isHoriz(dir) {
	return((dir % 2) === 0);
}

function isVert(dir) {
	return((dir % 2) === 1);
}

function getModifier(dir) {
	return(Math.floor((dir - 1) / 2) * 2 - 1);
}

function updateX(x, dir) {
	return (isHoriz(dir)) ? x + getModifier(dir) : x;
}

function updateY(y, dir) {
	return (isVert(dir)) ? y + getModifier(dir) : y;
}