function CSGun(){
	this.myself = this;

	this.weight = 0;
	this.fireSpeed = 0;
	this.loadSpeed = 0;
	this.maxBullets = 30;
	this.zoom = 0;
	this.accuracy = 0;
	this.shock = 0;	
	this.bulletQuantity = 0;
}

CSGun.prototype = new CSWeapon();