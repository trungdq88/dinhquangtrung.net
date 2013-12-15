









$(function() {
	// Create canvas
	CSGame.config.canvas = document.getElementById('playcanvas');
	CSGame.initStage();

	// Start events
	CSGame.startMouseMoving();
	CSGame.startKeyPressing();
	CSGame.startMouseClick();

	// Add a player
	CSGame.addPlayer();
});