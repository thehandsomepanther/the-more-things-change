BasicGame.MainMenu = function(game) {
	this.playButton = null;
}

BasicGame.MainMenu.prototype = {
	create: function() {

	},

	startGame: function(pointer) {
		this.state.start('Level1');
	}
}