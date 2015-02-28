var BasicGame = {};

BasicGame.Boot = function(game) {};

BasicGame.Boot.prototype = {
preload: function(){

},

create: function(){
	this.state.start('Preloader');
}

};