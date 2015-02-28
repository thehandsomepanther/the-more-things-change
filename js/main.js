$(document).ready(function() {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
	var debug = false;
	var platforms, ledgeUpper, ledgeLower, portal;
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var rightControl, leftControl, jumpControl;
	var rightKey, leftKey, jumpKey;
	var timer = new Phaser.Timer(game);
	var titleText, playText, timerText, scoreText, restartText;
	var gameOver = true;
	var score = 0;

	function advanceLevel () {
		score++;
		scoreText.text = "Score: " + score;

		player.body.position.x = 32
		player.body.position.y = game.world.height - 130;

		timer.destroy();

		timer = game.time.create(false);

		if (score < 3) {
			timer.loop(30000 - score * 5000, endGame, this);
		} else {
			timer.loop(15000, endGame, this);
		}	

		timer.start();

		mapRandomControls();

		rightButtonText.text = "?";
		leftButtonText.text = "?";
		jumpButtonText.text = "?";

		shuffleLedges();
	}

	function shuffleLedges(){
		ledgeUpper.destroy();
		ledgeLower.destroy();
		portal.destroy();

		ledgeUpper = platforms.create(game.rnd.integerInRange(-100, 300), 400, 'ground');
		ledgeLower = platforms.create(game.rnd.integerInRange(200, 400), 450, 'ground');	
		portal = portals.create(ledgeUpper.x + 100, 350, 'diamond');

		ledgeUpper.body.immovable = true;
		ledgeLower.body.immovable = true;

		ledgeUpper.scale.setTo(.2, .2);
		ledgeLower.scale.setTo(.2, .2);
	}

	function animateCloud(cloud, speed){
		if(cloud.x >= -cloud.width){
			cloud.x -= speed;		
		} else {
			cloud.x = game.world.width;
		}

	}

	function over(text){
		text.fill = 'white';
	}

	function out(text){
		text.fill = '#000';
	}

	function getRandomNumber(){
		return game.rnd.integerInRange(0, 25);
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

	function mapRandomControls(){
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
	}

	function startGame(){
		gameOver = false;

		timer.start();
		titleText.destroy();
		playText.destroy();

		timerText = game.add.text(200, 180, '', { font: '90px Fipps', fill: '#000', align: 'center'});
		timerText.alpha = .5;

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
	}

	function endGame(){
		gameOver = true;
		timerText.fill = "red";
		timerText.y = "140";
		timerText.lineSpacing = "-40px";
		timerText.setText("GAME\nOVER");
		timer.destroy();

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		player.body.gravity.y = 0;
		player.animations.stop();

		restartText = game.add.text(300, 270, 'Play Again', {font: '20px Fipps', fill: '#000'});
		restartText.inputEnabled = true;

		restartText.events.onInputDown.add(restartGame, this);
		restartText.events.onInputOver.add(over, this);
		restartText.events.onInputOut.add(out, this);		
	}

	function restartGame(){
		score = 0;
		scoreText.text = 'Score: 0';

		gameOver = false;
		timer = game.time.create(false);
		timer.loop(30000, endGame, this);
		timer.start();

		mapRandomControls();

		rightButtonText.text = "?";
		leftButtonText.text = "?";
		jumpButtonText.text = "?";

		restartText.destroy();

		timerText.fill = "#000";
		timerText.y = "180";
		timerText.lineSpacing = "0px";

		player.destroy();
		player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.arcade.enable(player);

		player.body.bounce.y = 0.2;
		player.body.gravity.y = 500;
		player.body.collideWorldBounds = true;

		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);

	}

	function preload() {

		game.load.image('sky', 'assets/background.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.image('diamond', 'assets/diamond.png');
		game.load.image('button', 'assets/button.png');
		game.load.image('cloud1', 'assets/cloud1.png');
		game.load.image('cloud2', 'assets/cloud2.png');
		game.load.image('cloud3', 'assets/cloud3.png');

	}

	function create() {

		timer = game.time.create(false);
		timer.loop(30000, endGame, this);

		game.add.sprite(0, 0, 'star');

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');

		clouds = game.add.group();

		cloud1 = clouds.create(200, 90, 'cloud2');
		cloud1.scale.setTo(.2, .2);

		cloud2 = clouds.create(400, 30, 'cloud3');
		cloud2.scale.setTo(.2, .2);

		cloud3 = clouds.create(500, 60, 'cloud2');
		cloud3.scale.setTo(.2, .2);

		cloud4 = clouds.create(300, 100, 'cloud1');
		cloud4.scale.setTo(.2, .2);

		cloud5 = clouds.create(750, 30, 'cloud2');
		cloud5.scale.setTo(.2, .2);

		cloud6 = clouds.create(650, 80, 'cloud3');
		cloud6.scale.setTo(.2, .2);

		cloud7 = clouds.create(20, 20, 'cloud1');
		cloud7.scale.setTo(.2, .2);

		platforms = game.add.group();
		platforms.enableBody = true;

		var ground = platforms.create(-64, game.world.height - 64, 'ground');

		ground.body.immovable = true;

		ledgeLower = platforms.create(400, 450, 'ground');
		ledgeLower.scale.setTo(.2, .2);
		ledgeLower.body.immovable = true;

		ledgeUpper = platforms.create(-100, 400, 'ground');
		ledgeUpper.body.immovable = true;
		ledgeUpper.scale.setTo(.2, .2);

		player = game.add.sprite(32, game.world.height - 150, 'dude');
		game.physics.arcade.enable(player);

		player.body.bounce.y = 0.2;
		player.body.gravity.y = 500;
		player.body.collideWorldBounds = true;

		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);

		portals = game.add.group();
		portals.enableBody = true;
		portal = portals.create(20, 350, 'diamond');

		mapRandomControls();

		scoreText = game.add.text(20, game.world.height - 50, 'Score: 0', { font: '20px Fipps', fill: '#000'});

		titleText = game.add.text(20, 20, 'the\nmore\nthings\nchange', {font: '55px Fipps', fill: '#000'});
		titleText.lineSpacing = "-40px";
		titleText.y = "40";

		playText = game.add.text(20, 400, 'play', {font: '20px Fipps', fill: '#000'});
		playText.inputEnabled = true;
		playText.buttonMode = true;
	}

	function update() {

		playText.events.onInputOver.add(over, this);
		playText.events.onInputOut.add(out, this);
		playText.events.onInputDown.add(startGame, this);

		game.physics.arcade.collide(player, platforms);

		player.body.velocity.x = 0;

		if (!gameOver){
			timerText.text = (timer.duration / 1000).toFixed(2);

			if(debug){
				leftButtonText.text = leftKey.toUpperCase();
				rightButtonText.text = rightKey.toUpperCase();
				jumpButtonText.text = jumpKey.toUpperCase();
			}

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

		}

		animateCloud(cloud1, 2);
		animateCloud(cloud2, 2.5);
		animateCloud(cloud3, 1.5);
		animateCloud(cloud4, 1);
		animateCloud(cloud5, 2);
		animateCloud(cloud6, 2.5);
		animateCloud(cloud7, 2.5);

		game.physics.arcade.overlap(player, portals, advanceLevel, null, this);	
	}
})