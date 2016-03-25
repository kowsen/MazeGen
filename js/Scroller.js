function Scroller(endlessGrid, scrollSpeed) {

	var topX = endlessGrid.getTop();

	setInterval(function() {
		endlessGrid.scrollDown();
	}, 5000);

}