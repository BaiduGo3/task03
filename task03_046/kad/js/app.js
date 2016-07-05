function Background(){

}
Background.prototype.initMap = function(){
	MAP.arr = [];
	for(var i = 0; i < MAP.rows; i++){
		MAP.arr[i] = [];
		for(var j = 0; j < MAP.cols; j++){
			MAP.arr[i][j] = 0;
		}
	}
}
/*
* 随机一段路保证目标能达到
* 也想过随机生成墙之后直接寻路看是否目标能到达，不能就重新随机生成墙，但是实现了一下浏览器会崩溃
*/
Background.prototype.randomRoad = function(){
	var x = 0, y = 0;
	while (x!=MAP.rows-2 || y != MAP.cols-2) {
        MAP.arr[x][y]=2;
        if (y!=MAP.cols-2 && Math.random() > 0.8) {
            y++;
        }
        else {
            if ((x < MAP.rows-2 && Math.random() > 0.5) || x == 0) {
                x++;
            }
            else {
                x--;
            }
        }
    }
	MAP.arr[x][y] = 2;
}
/* 随机创建墙 */
Background.prototype.createWall = function(){
	var num = parseInt(MAP.rows * MAP.cols / 3);
	for(var i = 0; i < num; i++){
		var x = parseInt(Math.random() * MAP.rows),
			y = parseInt(Math.random() * MAP.cols);
		if(MAP.arr[x][y] != 0){
			i--;
		}else{
			MAP.arr[x][y] = 1;
		}
	}
}
Background.prototype.draw = function(){
	this.initMap();
	this.randomRoad();
	this.createWall();
	this.drawBg();
}
Background.prototype.drawBg = function(){
	for(var i = 0; i < MAP.rows; i++){
		for(var j = 0; j < MAP.cols; j++){
			this.context.beginPath();
			if(MAP.arr[i][j] == 1){
				this.context.fillStyle = WallColor;
			}else{
				this.context.fillStyle = BgColor;
			}
			this.context.fillRect(i*SIZE, j*SIZE, SIZE, SIZE);
		}
	}
	this.context.fillStyle = "red";
	this.context.font = "24px Helvetica";
	this.context.textAlign = "left";
	this.context.textBaseLine = "top";
	this.context.fillText("Support Dir Key", CANVAS_WIDTH - 170, 32);
}

function Agent(){
	this.x = 0;
	this.y = 0;
	this.color = AgentColor;
	this.routeArr = [];
	this.speed = 1;
	this.ifmove = false;
}
Agent.prototype.draw = function(){
	this.context.save();
	this.context.beginPath();
	this.context.fillStyle = this.color;
	this.context.arc(this.x + SIZE/2, this.y + SIZE/2, SIZE/2 - 4, 0, 2*Math.PI, false);
	this.context.fill();
	this.context.closePath();
	this.context.restore();
}
Agent.prototype.move = function(){
	this.keydown();
	if(this.ifmove){
		if(this.routeArr.length == 0){
			this.ifmove = false;
			return;
		}
		this.clear();
		var curRode = this.routeArr[0];
		if(this.x == curRode.x * SIZE && this.y == curRode.y * SIZE){
			this.routeArr.shift();
			if(this.routeArr.length == 0){
				this.ifmove = false;
				return;
			}
		}
		if(this.x > curRode.x * SIZE){
			this.x -= this.speed;
		}else if(this.x < curRode.x * SIZE){
			this.x += this.speed;
		}
		if(this.y > curRode.y * SIZE){
			this.y -= this.speed;
		}else if(this.y < curRode.y * SIZE){
			this.y += this.speed;
		}
		this.bound();
	}
	this.draw();
}
Agent.prototype.clear = function(){
	this.context.save();
	this.context.clearRect(this.x, this.y, SIZE, SIZE);
	this.context.fillStyle = BgColor;
	this.context.fillRect(this.x, this.y, SIZE, SIZE);
	this.context.restore();
}
Agent.prototype.bound = function(){
	if(this.x <= 0) this.x = 0;
	if(this.x >= CANVAS_WIDTH - SIZE) this.x -= this.speed;
	if(this.y <= 0) this.y = 0;
	if(this.y >= CANVAS_HEIGHT - SIZE) this.y -= this.speed;
}
Agent.prototype.keydown = function(){
	this.clear();
	switch(DIR){
		case 0:
			if(!block(this.x-this.speed, this.y)) this.x -= this.speed;
			break;
		case 1:
			if(!block(this.x, this.y-this.speed)) this.y -= this.speed;
			break;
		case 2:
			if(!block(this.x+this.speed, this.y)) this.x += this.speed;
			break;
		case 3:
			if(!block(this.x, this.y+this.speed)) this.y += this.speed;
			break;
	}
	this.bound();

	function block(x, y){
		var lef_x = parseInt(x/SIZE);
		var top_y = parseInt(y/SIZE);
		var rig_x = parseInt((x+SIZE-1)/SIZE);
		var bot_y = parseInt((y+SIZE-1)/SIZE);
		return MAP.arr[lef_x][top_y] == 1 || MAP.arr[lef_x][bot_y] == 1 || MAP.arr[rig_x][top_y] == 1 || MAP.arr[rig_x][bot_y] == 1;
	}
}
addEvent(document, "keydown", function(e){
	DIR = {37: 0, 38: 1, 39: 2, 40: 3}[e.keyCode];//0|left, 1|up, 2|right, 3|down
})
addEvent(document, "keyup", function(e){
	DIR = -1;
})

function File(){
	this.x = (MAP.rows - 2) * SIZE;
	this.y = (MAP.cols - 2) * SIZE;
	this.color = FileColor;
}
File.prototype.draw = function(){
	this.context.beginPath();
	this.context.fillStyle = this.color;
	this.context.moveTo(this.x, this.y);
	this.context.lineTo(this.x + SIZE, this.y);
	this.context.lineTo(this.x + SIZE/2, this.y + SIZE);
	this.context.fill();
	this.context.closePath();
}

function Game(){

}
Game.prototype.init = function(){
	this.canvas = $("canvas");
	this.canvas.width = CANVAS_WIDTH;
	this.canvas.height = CANVAS_HEIGHT;

	this.context = this.canvas.getContext("2d");
	Background.prototype.context = this.context;
	Agent.prototype.context = this.context;
	File.prototype.context = this.context;
	
	this.bg = new Background();
	this.agent = new Agent();
	this.file = new File();
}
Game.prototype.start = function(){
	this.bg.draw();
	this.agent.draw();
	this.file.draw();
	animate();
}
Game.prototype.restart = function(){
	this.agent.x = 0;
	this.agent.y = 0;
	this.agent.routeArr = [];
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.start();
}

function animate(){
	game.agent.move();
	if(findFile(game.agent, game.file)){
		game.restart();
	}else{
		requestAnimationFrame(animate);
	}
}
function findFile(obj1, obj2){
	return obj1.x < obj2.x + SIZE &&
		obj1.x + SIZE > obj2.x &&
		obj1.y < obj2.y + SIZE &&
		obj1.y + SIZE > obj2.y;
}


addEvent(document, "click", function(e){
	var end_x = parseInt(e.pageX / SIZE),
		end_y = parseInt(e.pageY / SIZE),
		start_x = parseInt(game.agent.x / SIZE),
		start_y = parseInt(game.agent.y / SIZE);
	var routeArr = searchRoad(start_x, start_y, end_x, end_y);
	game.agent.routeArr = routeArr;
	game.agent.ifmove = true;
})
var game = new Game();
game.init();
game.start();

