












var CSBullet = function(inputStage,inputStart, inputSlope, inputAnchor, inputSpeed, inputSize, inputColor) {
	var myself = this;

	this.config = {
		stage: inputStage,
		color: (inputColor === undefined ? '#000' : inputColor),
		size: (inputSize === undefined ? 2 : inputSize),
		slope: (inputSlope === undefined ? null : inputSlope),
		anchor: (inputAnchor === undefined ? 1 : inputAnchor),
		speed: (inputSpeed === undefined ? 1 : inputSpeed),
		step: 8,
		start: (inputStart === undefined ? {x: 0, y: 0} : inputStart),
		lifetime: 3000,
	};

	this.timer = {};

 	this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("red").drawCircle(0, 0, this.config.size);
    this.circle.x = this.config.start.x;
    this.circle.y = this.config.start.y;

    CSGame.stage.addChild(this.circle);

	this.go = function() {
		myself.timer = setInterval(function() {
			myself.circle.x += myself.config.step * Math.cos(Math.atan(myself.config.slope)) * (2 * (myself.config.anchor >= 0) - 1);
			myself.circle.y += myself.config.step * Math.sin(Math.atan(myself.config.slope)) * (2 * (myself.config.anchor >= 0) - 1);

			if (myself.circle.x < 0 || myself.circle.y < 0
			|| myself.circle.x > myself.config.stage.canvas.width
			|| myself.circle.y > myself.config.stage.canvas.height) {
				myself.destroy();
			}
		}, myself.config.speed);
	}


    this.destroy = function() {
		clearInterval(myself.timer);
		myself.config.stage.removeChild(myself.circle);
    }
}