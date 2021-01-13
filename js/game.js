'use strict;'
var canvas=document.getElementById('canvas')
var context = canvas.getContext('2d');
var FPS = 60;
var then, now, elapsed, fpsInterval;
var bg = new Image();
var character=new Image();
var block= new Image();
var min=0;
var sec=0;
const money=0;
var x_coord=0;
var y_coord=0;
var hours=0;
var enemies=new Image();

enemies.src="Photos/Idle (36x30).png"

block.src="Photos/tileset1.png"
character.src="photos/sprite (3).png"
bg.src="Photos/2_21.png"

CANVAS_WIDTH=canvas.width;
CANVAS_HEIGHT=canvas.height;




setInterval(gotimer,1000);
function gotimer(){
   
    sec++;
    if(sec>=60){
        sec=0;
        min++;
    }
    if(min>=60){
        min=0;
        hours++;
    }
    if(sec>=10){
      return  timer.innerHTML="Таймер: 0"+hours+":"+min+":"+sec;  
    }
    else{
       return timer.innerHTML="Таймер: 0"+hours+":" + min+":0"+sec;
    }

   
}






player = {
    xPrev: 0,
    yPrev: 0,
    width: 33,
    height: 32,
    x: 0,
    y: 0,
    frameX:0,
    frameY:0,
    xVelocity: 0,
    yVelocity: 0,
    jumping: true,
    coins: 0,
    health:100
};


// enemies={
//     health:100,
//     width: 36,
//     height: 30,
//     x:0,
//     y:0,
//     frameX:0,
//     frameY:0,
//     xVelocity: 0,
//     yVelocity: 0,

// };

obstacles = [
    {
        width: 90,
        height: 20,
        x: 300,
        y: 500
    },
    {
        width: 100,
        height: 20,
        x: 250,
        y: 650
    },
];

coins=[{
    width: 15,
    height: 15,
    x: 300,
    y: 485
    
}];




var controller = {
    left: false,
    right: false,
    up: false,
    KeyListener: function(evt) {
        var keyState = (evt.type == "keydown") ? true : false;
        switch (evt.keyCode) {
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
        }
    }
};




var startAnimation = function(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animation(then);
}

var animation = function(newTime) {
    window.requestAnimationFrame(animation);
    now = newTime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        update();
        draw();
    }
}

var isCollided = function(obst, obj) {
    if (obj.x + obj.width > obst.x 
    && obj.x < obst.x + obst.width
    && obj.y < obst.y + obst.height
    && obj.y + obj.height > obst.y) {
        return true;
    } else {
        return false;
    }
}

var coinHandler = function (coin, obj) {
    if(isCollided(coin, obj)) {
        player.coins += 1;
        coin.x = -25;
    }
}

var collideHandler = function(obst, obj) {
    if (isCollided(obst, obj)) {
        if (obj.xPrev >= obst.x + obst.width) {
            obj.x = obst.x + obst.width;
            obj.xVelocity = 0;
        }
        if (obj.xPrev + obj.width <= obst.x) {
            obj.x = obst.x - obj.width;
            obj.xVelocity = 0;
        }
        if (obj.yPrev + obj.height <= obst.y) {
            obj.y = obst.y - obj.height;
            obj.yVelocity = 0;
            obj.jumping = false;
        }
        if (obj.yPrev >= obst.y + obst.height) {
            obj.y = obst.y + obst.height;
            obj.yVelocity = 0;
        }
    }
}



var update = function () {
    player.xPrev = player.x;
    player.yPrev = player.y;

    if (controller.up && player.jumping === false) {
        player.yVelocity -= 30;
        player.jumping = true;
    }

    if (controller.left) {
        player.xVelocity -= 1;
        if(player.frameX<2){
            player.frameX++;
        }
        else{
            player.frameX=0
        };
        
    }

    if (controller.right) {
        player.xVelocity += 1;
        if(player.frameX<2 && player.frameY==0){
            player.frameX++;
        }
        else{
            player.frameY=0;
            player.frameX=0;
        };
    }

    player.yVelocity += 1.5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;


    // enemies.yVelocity+=1;
    // enemies.x+=enemies.xVelocity;
    // enemies.y+=enemies.yVelocity;
    // enemies.xVelocity*=0.9;
    // enemies.yVelocity*=0.9;

    // if (enemies.x > CANVAS_WIDTH - enemies.width) {
    //     enemies.x = CANVAS_WIDTH - enemies.width;
    // }

    // if (enemies.x < 0) {
    //     enemies.x = 0;
    // }




    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x > CANVAS_WIDTH - player.width) {
        player.x = CANVAS_WIDTH - player.width;
    }

    if (player.y > CANVAS_HEIGHT - player.height) {
        player.y = CANVAS_HEIGHT - player.height;
        player.yVelocity = 0;
        player.jumping = false;
    }

    for (var i = 0; i < obstacles.length; i++) {
        collideHandler(obstacles[i], player);
    }

    // for (var i = 0; i < enemies.length; i++) {
    //     collideHandler(enemies, player);
    // }

    for (var i = 0; i < coins.length; i++) {
        coinHandler(coins[i], player);
    }

    // for (var i = 0; i < obstacles.length; i++) {
    //     collideHandler(obstacles[i], enemies);
    // }

}



var drawObject = function(obj, style) {
    context.fillStyle = style;
    context.fillRect(obj.x, obj.y, obj.width, obj.height);
    // context.drawImage(block,obj.x,obj.y,);//Идет не соответствие текстуры блока и его размеров не хватает самой текстуры
    
    
}






var draw = function() {
    //фон
    context.drawImage(bg,0,0,canvas.width,canvas.height);
    // context.drawImage(enemies,50,50);
    
    // context.fillStyle = '#ffffff';
    // context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //игрок
    context.drawImage(character,player.width*player.frameX,player.height*player.frameY,player.width,player.height,player.x,player.y,player.width,player.height);
    context.drawImage(enemies,0,0,enemies.width,enemies.height,200,150,enemies.width,enemies.height);
    // context.fillStyle = '#000000';
    // context.fillRect(player.x, player.y, player.width, player.height);

    //препятствия
    for (var i = 0; i < obstacles.length; i++) {
        drawObject(obstacles[i], '#00ff00');
    }
    //монетки 
    for (var i = 0; i < coins.length; i++) {
        drawObject(coins[i], '#eac448');
    }



    //количество монеток
    context.fillStyle = '#0000ff';
    context.font = 'normal 30px Arial';
    context.fillText(player.coins, 20, 40);
    
    
}

startAnimation(FPS)
window.addEventListener("keydown", controller.KeyListener);
window.addEventListener("keyup", controller.KeyListener);
