









$(function() {
	// Create canvas
	CSGame.config.canvas = document.getElementById('playcanvas');
	CSGame.initStage();

	// Start events
	CSGame.listenMousePressing();
	CSGame.listenKeyPressing();
	CSGame.listenMouseMoving();
	CSGame.initIntervalEvents();
	CSGame.startClock();

	// Add a player
	CSGame.addPlayer();

});