









var CSGame = CSGame || {};

CSGame.config = {
	canvas: null,
	backgroundcolor: "#ccc",
	delaySpeed: 10,
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

// Store all key stage. true = pressing, false = released.
CSGame.pressingKeys = [];

// The clock to do the loop
CSGame.theClock = {};


CSGame.drawBase = function() {
	var config = CSGame.config;
	
	// Fill background
	var shape = new createjs.Shape();
    shape.graphics.beginFill(config.backgroundcolor).drawRoundRect(0, 0, config.canvas.width, config.canvas.height, 0);
    CSGame.stage.addChild(shape);
    CSGame.stage.update();

};

CSGame.initStage = function() {
	CSGame.stage = new createjs.Stage(CSGame.config.canvas);
	CSGame.drawBase();
};

// Please call this only once
CSGame.startMouseMoving = function() {
	$(CSGame.stage).on('stagemousemove.csgame', function(e) {
	    for (reg in CSGame.eventMouseMovingRegs) {
	    	CSGame.eventMouseMovingRegs[reg](e);
	    }
	});
};

// Please call this only once
CSGame.startKeyPressing = function() {
	$('body').on('keydown', function(e) {
        CSGame.pressingKeys[e.keyCode] = true;
    }).on('keyup', function(e) {
        CSGame.pressingKeys[e.keyCode] = false;
    });
    CSGame.theClock = setInterval(function(){
        for (reg in CSGame.eventKeyPressingRegs) {
        	CSGame.eventKeyPressingRegs[reg](CSGame.pressingKeys);
        }
    }, CSGame.config.delaySpeed);
};

CSGame.addPlayer = function(imagePath, defaultx, defaulty, registerEvents) {
	if (imagePath === undefined) imagePath = CSGame.config.defaultImagePath;
	if (defaultx === undefined) defaultx = 0;
	if (defaulty === undefined) defaulty = 0;

	var player1 = new CSPlayer(imagePath);
	player1.config = {
		stage: CSGame.stage,
		defaultX: defaultx,
		defaultY: defaulty,
	}
	player1.load(function() {
		CSGame.stage.addChild(player1.bitmap);
		CSGame.stage.update();

		CSGame.eventMouseMovingRegs.push(player1.regMouseMoving);
		CSGame.eventKeyPressingRegs.push(player1.regPressingKey);
	});
};