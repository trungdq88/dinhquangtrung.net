

var CSPlayer = function (imagePath) {
	var myself = this;

	this.config = {
		defaultX: 300,
		defaultY: 300,
		fireButton: 1,
	}

	this.fireButton: 1,

	this.money = 0;

	this.health = 100,

	this.equipment = {
		backpack: {},
	 	weapon: {},
	  	armor: {} 
	};

	this.fireDelay = {
		ticker: 0,
		delayDistance: 10,
	}

	this.store = {
		// Curent mouse's position
		lastMousePos: {
			x: 0,
			y: 0
		}
	}

	this.bitmap = {};

	// For moving
	this.regPressingKey = function(pressingKey) {
	    if (pressingKey[87]) { // Up
	        myself.bitmap.y -= 1;
	        myself.regMouseMoving();
	    }
	    if (pressingKey[83]) { // Down
	        myself.bitmap.y += 1;
	        myself.regMouseMoving();
	    }
	    if (pressingKey[65]) { // Left
	        myself.bitmap.x -= 1;
	        myself.regMouseMoving();
	    }
	    if (pressingKey[68]) { // Right
	        myself.bitmap.x += 1;
	        myself.regMouseMoving();
	    }
	};


	// For rotating the "head"
	this.regMouseMoving = function(e) {
		if (e === undefined || e.currentTarget === undefined) {
			e = {
				currentTarget: {
					mouseX: myself.store.lastMousePos.x,
					mouseY: myself.store.lastMousePos.y
				}
			}
		}

	    deltaX = e.currentTarget.mouseX - myself.bitmap.x;
	    deltaY = e.currentTarget.mouseY - myself.bitmap.y;
	    myself.store.lastMousePos = {x: e.currentTarget.mouseX, y: e.currentTarget.mouseY}
	    var rotDegree = Math.atan(- deltaX / deltaY) * 180 / Math.PI + 180 * (deltaY >= 0);

	    myself.bitmap.rotation = rotDegree;
	};

	// For "shooting"
	this.regMouseClick = function(pressingButtons) {
		//console.log(myself.config.fireButton);
		if (pressingButtons[myself.fireButton] !== undefined
		 && myself.fireDelay.ticker++ > myself.fireDelay.delayDistance) {
			myself.fireDelay.ticker = 0;

			deltaX = myself.store.lastMousePos.x - myself.bitmap.x;
		    deltaY = myself.store.lastMousePos.y - myself.bitmap.y;
		    var slope = deltaY / deltaX;
		    // (new CSBullet("Missing stage here",{x: myself.bitmap.x, y: myself.bitmap.y}, slope, deltaX, 5)).go();
	    }
	}

	this.load = function(initDone) {
		var img = new Image();
		img.src = imagePath;
		img.onload = function() {
		    myself.bitmap = new createjs.Bitmap(img);

		    myself.bitmap.x = myself.config.defaultX;
		    myself.bitmap.y = myself.config.defaultY;
		    myself.bitmap.regX = img.width / 2;
		    myself.bitmap.regY = img.height / 2;

		    initDone();
		}
	}
}