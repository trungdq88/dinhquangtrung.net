









var CSGame = CSGame || {};

CSGame.config = {
	canvas: null,
	backgroundcolor: "#ccc",
	delaySpeed: 1,
	defaultImagePath: 'images/player.png'
}

// The stage
CSGame.stage = {};

// All moving object available in stage: players, bullets, grenades, smokes...
CSGame.objects = [];

// Store all function that need to call when mouse moving
CSGame.eventMouseMovingRegs = [];

// Store all function that need to call when key pressing
CSGame.eventKeyPressingRegs = [];

// Store all function that need to call when mouse clicking
CSGame.eventMouseClickRegs = [];

// Store all key stage. true = pressing, false = released.
CSGame.pressingKeys = [];

// Store all mouse click stage. true = mouse down, false = mouse up
CSGame.mousePressingButtons = {};

// Store mouse moving event
CSGame.mouseMoveEventData = {};

// The clock to do the loop
CSGame.theClock = {};

// Store all function need to do in loop
CSGame.intervalEvents = [];

// All players
CSGame.players = [];

CSGame.drawBase = function() {
	var config = CSGame.config;
	
	// Fill background
	var shape = new createjs.Shape();
    shape.graphics.beginFill(config.backgroundcolor).drawRoundRect(0, 0, config.canvas.width, config.canvas.height, 0);
    CSGame.stage.addChild(shape);
    // CSGame.stage.update();

};

CSGame.initStage = function() {
	CSGame.stage = new createjs.Stage(CSGame.config.canvas);
	CSGame.drawBase();
};

// Please call this only once
CSGame.listenMouseMoving = function() {
	$(CSGame.stage).on('stagemousemove.csgame', function(e) {
		CSGame.mouseMoveEventData = e;	
	});
};


// Please call this only once
CSGame.listenKeyPressing = function() {
	$('body').on('keydown.csgame', function(e) {
        CSGame.pressingKeys[e.keyCode] = true;
    }).on('keyup.csgame', function(e) {
        CSGame.pressingKeys[e.keyCode] = false;
    });
};

CSGame.listenMousePressing = function() {
		$(CSGame.config.canvas).on('mousedown.csgame', function(e) {
			CSGame.mousePressingButtons[e.which] = true;
		}).on('mouseup.csgame', function(e){
			CSGame.mousePressingButtons[e.which] = undefined;
		});
}

CSGame.startMousePressing = function(){
    for (reg in CSGame.eventMouseClickRegs) {
    	CSGame.eventMouseClickRegs[reg](CSGame.mousePressingButtons);
    }
}


CSGame.startKeyPressing = function(){
	for (reg in CSGame.eventKeyPressingRegs) {
  		CSGame.eventKeyPressingRegs[reg](CSGame.pressingKeys);
  	}	
}

CSGame.startMouseMoving = function(){
	for (reg in CSGame.eventMouseMovingRegs) {
    	CSGame.eventMouseMovingRegs[reg](CSGame.mouseMoveEventData);
    }
}

// This function will need to modify during development
CSGame.initIntervalEvents = function(){
	console.log('Init interval events');
	CSGame.intervalEvents.push(CSGame.startMouseMoving);
	CSGame.intervalEvents.push(CSGame.startMousePressing);
	CSGame.intervalEvents.push(CSGame.startKeyPressing);
}

CSGame.startClock = function() {
	CSGame.theClock = setInterval(function(){
		var i = 0;
		for (event_item in CSGame.intervalEvents) {
			CSGame.intervalEvents[event_item]();
		}
		CSGame.stage.update();
	}, CSGame.config.delaySpeed);
}

CSGame.stopClock = function() {
	clearInterval(CSGame.theClock);
}

CSGame.addPlayer = function(imagePath, defaultx, defaulty, registerEvents) {
	if (imagePath === undefined) imagePath = CSGame.config.defaultImagePath;
	if (defaultx === undefined) defaultx = 50;
	if (defaulty === undefined) defaulty = 50;

	var player = new CSPlayer(imagePath);
	CSGame.players.push(player);

	player.config = {
		stage: CSGame.stage,
		defaultX: defaultx,
		defaultY: defaulty,
		fireButton: 1
	}

	player.load(function() {
		CSGame.stage.addChild(player.bitmap);
		// CSGame.stage.update();

		CSGame.eventMouseMovingRegs.push(player.regMouseMoving);
		CSGame.eventKeyPressingRegs.push(player.regPressingKey);
		CSGame.eventMouseClickRegs.push(player.regMouseClick);

		
	});
};