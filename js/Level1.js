BasicGame.Game = function(game) {
	this.game;
}

	var platforms;
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var rightControl, leftControl, jumpControl;
	var rightKey, leftKey, jumpKey;

function collectStar (player, star) {
    // Removes the star from the screen
    star.kill();

}

function advanceLevel (player, portal) {
	player.body.position.x = 32;
	player.body.position.y = game.world.height - 200;

}

function getRandomNumber(){
	return Math.floor(Math.random() * 100) % 26;
}

function getRandomControl(num){
	switch(num){
		case 0: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.A);			
		break;
		case 1: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.B);			
		break;
		case 2: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.C);			
		break;
		case 3: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.D);			
		break;
		case 4: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.E);			
		break;
		case 5: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.F);			
		break;
		case 6: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.G);			
		break;
		case 7: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.H);			
		break;
		case 8: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.I);			
		break;
		case 9: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.J);			
		break;
		case 10: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.K);			
		break;
		case 11: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.L);			
		break;
		case 12: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.M);			
		break;
		case 13: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.N);			
		break;
		case 14: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.O);			
		break;
		case 15: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.P);			
		break;
		case 16: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.Q);			
		break;
		case 17: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.R);			
		break;
		case 18: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.S);			
		break;
		case 19: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.T);			
		break;
		case 20: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.U);			
		break;
		case 21: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.V);			
		break;
		case 22: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.W);			
		break;
		case 23: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.X);			
		break;
		case 24: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.Y);			
		break;
		case 25: 
		control = game.input.keyboard.addKey(Phaser.Keyboard.Z);			
		break;		

	}
	return control;
}

BasicGame.Game.prototype = {


create: function() {

	game.add.sprite(0, 0, 'star');

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');

	var buttonLeft = game.add.sprite(200, 30, 'button');
	buttonLeft.scale.setTo(2, 2);

	var buttonJump = game.add.sprite(368, 30, 'button');
	buttonJump.scale.setTo(2, 2);

	var buttonRight = game.add.sprite(536, 30, 'button');
	buttonRight.scale.setTo(2, 2);

	leftText = game.add.text(200, 90, 'Left', { font: '20px Fipps', fill: '#000'});
	leftButtonText = game.add.text(220, 40, '?', { font: '20px Fipps', fill: '#000'});

	jumpText = game.add.text(357, 90, 'Jump', { font: '20px Fipps', fill: '#000'});
	jumpButtonText = game.add.text(368 + 20, 40, '?', { font: '20px Fipps', fill: '#000'});

	rightText = game.add.text(527, 90, 'Right', { font: '20px Fipps', fill: '#000'});
	rightButtonText = game.add.text(536 + 20, 40, '?', { font: '20px Fipps', fill: '#000'});

	platforms = game.add.group();
	platforms.enableBody = true;

	var ground = platforms.create(0, game.world.height - 64, 'ground');

	ground.scale.setTo(2, 2);
	ground.body.immovable = true;

	var ledge = platforms.create(400, 400, 'ground');

	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	player = game.add.sprite(32, game.world.height - 150, 'dude');
	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	stars = game.add.group();

	stars.enableBody = true;

    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(i * 70, 0, 'star');

    //     //  Let gravity do its thing
    //     star.body.gravity.y = 50;

    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

    portals = game.add.group();
    portals.enableBody = true;
    portal = portals.create(20, 180, 'diamond');

    var rightNum = getRandomNumber();

    rightKey = alphabet[rightNum];
    rightControl = getRandomControl(rightNum);

    var leftNum = getRandomNumber();

    while(leftNum == rightNum) {
    	leftNum = getRandomNumber();
    }

    leftKey = alphabet[leftNum];
    leftControl = getRandomControl(leftNum);

    var jumpNum = getRandomNumber();

    while(jumpNum == leftNum || jumpNum == rightNum){
    	jumpNum = getRandomNumber();
    }

    jumpKey = alphabet[jumpNum];
    jumpControl = getRandomControl(jumpNum);
},

update: function() {

	game.physics.arcade.collide(player, platforms);

	player.body.velocity.x = 0;

	// debug
	controlsText = game.add.text(16, 16, '', { font: '24px Fipps', fill: '#000'});
	controlsText.text = 'Left: ' + leftKey + '\nRight: ' + rightKey + '\nJump: ' + jumpKey;

	if(leftControl.isDown){
		player.body.velocity.x = -150;
		player.animations.play('left');
		leftButtonText.text = leftKey.toUpperCase();
	} else if (rightControl.isDown) {
		player.body.velocity.x = 150;
		player.animations.play('right');
		rightButtonText.text = rightKey.toUpperCase();
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	if(jumpControl.isDown && player.body.touching.down){
		player.body.velocity.y = -350;
		jumpButtonText.text = jumpKey.toUpperCase();
	}

	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player, portals, advanceLevel, null, this);	

}
}