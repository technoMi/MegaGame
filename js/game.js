// создаем новую сцену с именем "Game"
let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
  this.space_ship_speed = 8;
  this.laser_aray_speed = 10;
}

// загрузка файлов ресурсов для нашей игры
gameScene.preload = function() {
 
  // загрузка изображений
  this.load.image('background', 'assets/bg.png');
  this.load.image('space_ship', 'assets/space_ship.png');
  this.load.image('laser_array', 'assets/laser_array.png');
};
 
// выполняется один раз, после загрузки ресурсов
gameScene.create = function() {
 
 	// создаём спрайт фона
   this.background = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, "background");

   // игрок
   this.space_ship = this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height/2, 'space_ship');
   this.laser_array = this.add.sprite(-10, -10, 'laser_array');

   this.cursors = this.input.keyboard.createCursorKeys();

}

let shot_happened = false;

gameScene.update = function() {

	// меняем позицию стпрайта фона
	this.background.tilePositionY -= 1;
 
 	// считываем нажатие клавиш
   if (this.cursors.down.isDown) {
   	if (this.space_ship.y <= 720-this.space_ship.height/2)
   		this.space_ship.y += this.space_ship_speed;
	}
	if (this.cursors.up.isDown) {
		if (this.space_ship.y >= 0+this.space_ship.height/2)
   		this.space_ship.y -= this.space_ship_speed;
	}
	if (this.cursors.right.isDown) {
		if (this.space_ship.x <= 1280-this.space_ship.height/2)
   		this.space_ship.x += this.space_ship_speed;
	}
	if (this.cursors.left.isDown) {
		if (this.space_ship.x >= 0+this.space_ship.height/2)
   		this.space_ship.x -= this.space_ship_speed;
	}
	if (this.cursors.space.isDown) {
		if (!shot_happened){
			shot_happened = true;
			this.laser_array.x = this.space_ship.x;
			this.laser_array.y = this.space_ship.y-23;
		}
	}

	//Обработчик события "выстрел"
	if (shot_happened) {
		if (this.laser_array.y >= 0){
			this.laser_array.y -= this.laser_aray_speed;
		} else {
			shot_happened = false;
			this.laser_array.x = -10;
			this.laser_array.y = -10;
		}
	}
}

// конфигурация нашей игры
let config = {
	type: Phaser.AUTO,  // Phaser сам решает как визуализировать нашу игру (WebGL или Canvas)
	"width": 1280,
	"height": 720,
   //"parent": "game-container",
   "scale": {
   	"mode": Phaser.Scale.FIT,
      "autoCenter": Phaser.Scale.CENTER_BOTH
   },
  	scene: gameScene // наша созданная выше сцена
};
 
// создаем игру и передам ей конфигурацию
let game = new Phaser.Game(config);