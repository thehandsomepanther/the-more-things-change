BasicGame.Preloader = function(game) {};

BasicGame.Preloader.prototype = {
	preload: function() {
	this.load.image('sky', 'assets/sky.png');
	this.load.image('ground', 'assets/platform.png');
	this.load.image('star', 'assets/star.png');
	this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	this.load.image('diamond', 'assets/diamond.png');
	this.load.image('button', 'assets/button.png');
	},

	create: function() {

	},

	update: function() {
		this.state.start('MainMenu');
	}
}