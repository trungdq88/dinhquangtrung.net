function CSBackpack(){
	this.myself = this;

	this.gun = {};

	this.pistol = {};

	this.melee = {};

	this.grenade = [];
}

CSBackpack.prototype = new CSEquipment();