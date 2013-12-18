function CSMap(){
	this.myself = this;

	this.size = {
		width: 500,
		height: 1000
	};

	this.position = {
		x: 0,
		y: 0
	}

	// The stage
	this.stage = {};

	// Background image
	this.bitmap = {};

	// Store all stuffs in map
	this.stuffs = [];

	// Store all players
	this.players = [];
}