let cvs=document.getElementById("canvas")
let ctx= cvs.getContext("2d")
let timer=document.getElementById("timer")
var sec=0;
var min=0;


var gap=30
var xPos= 15
var yPos= 613
var gravity=0.5
var n=0




setInterval(gotimer,1000);
function gotimer(){
   
    sec++
    if(sec>=60){
        sec=0;
        min++;
    }
    if(sec>=10){
      return  timer.innerHTML="Таймер: 0"+min+":"+sec;  
    }
    else{
       return timer.innerHTML="Таймер: 0" + min+":0"+sec;
    }

   
}
var ground = new Image();
var character=new Image();
var key = new Image();
var bg = new Image();
var soil = new Image();
var enemy = new Image();
var block1= new Image();
var block2= new Image();

//connect image
character.src="photos/sprite (3).png"
key.src="Photos/ket.png"
bg.src="Photos/2_21.png"
ground.src="photos/tileset.png"
block1.src="Photos/tileset1.png"
block2.src="Photos/tileset1.png"




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



const player={
    
    x:15,
    y:613,
    xPrev:0,
    yPrev:0,
    width:33,
    height:32,
    frameX:0,
    frameY:0,
    size:10,
    jumping:false,
    x_velocity:0,
    y_velocity:0,   
};


const blocks={
    x:150,
    y:612,
    width:45,
    height:45,
    frameX:0,
    frameY:0,
    x_velocity:0,
    y_velocity:0,
    
}


document.addEventListener('keydown',function (e){if(KeyDown(e));});




function KeyDown(e)
{   player.xPrev=player.x;
    player.yPrev=player.y;

    switch(e.keyCode){
        case 37: //left
            player.x_velocity-=15;
            if(player.frameX<2){
                player.frameX++;
            }
            else{
                player.frameX=0
            };
            break;
        case 39://right
            player.x_velocity+=15;
            if(player.frameX<2 && player.frameY==0){
                player.frameX++;
            }
            else{
                player.frameY=0;
                player.frameX=0;
            };
            break;
        case 38://up
            // setTimeout(moveUp,100)
            if(player.jumping==false){
                player.y_velocity-=25;
                player.jumping=true;
            }
            // player.y-=25;

            break;
        
            
        

    }
    


}



// var controller = {
//     left: false,
//     right: false,
//     up: false,
//     KeyListener: function(evt) {
//         var keyState = (evt.type == "keydown") ? true : false;
//         switch (evt.keyCode) {
//             case 37:
//                 controller.left = keyState;
//                 break;
//             case 38:
//                 controller.up = keyState;
//                 break;
//             case 39:
//                 controller.right = keyState;
//                 break;
//         }
//     }
// };



var block=[]
block[0]={
    x:cvs.width/2,
    y:cvs.height*0

}


// var t=DataView()

function draw(){
    ctx.drawImage(bg,0,0,canvas.width,canvas.height);
    ctx.drawImage(key,55,590,99,99)
    ctx.drawImage(character,player.width*player.frameX,player.height*player.frameY,player.width,player.height,player.x,player.y,player.width,player.height);
    
    // ctx.drawImage(ground,blocks.width*blocks.frameX,blocks.height*blocks.frameY,blocks.width,blocks.height,blocks.x,blocks.y,blocks.width,blocks.height);
    // for(var i=0;i<2;i++){
    //     blocks.x_velocity=0;
        
    //     ctx.drawImage(ground,blocks.width*blocks.frameX,blocks.height*blocks.frameY,blocks.width,blocks.height,blocks.x,blocks.y,blocks.width,blocks.height);
          
    //     if(blocks.x>400){
            
    //         // blocks.frameY=2;
    //         // blocks.frameX=3;
    //         ctx.drawImage(ground,blocks.width*blocks.frameX,blocks.height*blocks.frameY,blocks.width,blocks.height,blocks.x-15,blocks.y,blocks.width,blocks.height)
            
    //     } 
    // }
    for(var i=0;i<block.length;i++){
        ctx.drawImage(block1,block[i].x,block[i].y)
        
        
        // block[i].x-=0.5;

        block[i].y+=2;
       
        if(block[i].y==canvas.height/2 && block[i].x<0){
            n++
            block.push({
                x:block[i].x*Math.random()-130,
                // y:Math.floor(Math.random()*block1.width)//-block1.width
                y:Math.floor(canvas.height*0)
                
            })
        
        }

      
    }
    

    // if(player.x>=canvas.width/2){
    //     blocks.frameY=2
    // }

    //Wall
    if (player.x < player.width/3|| player.x > 1280 - player.width/3) {
        player.x=200;
    }
   
      
  



    player.y_velocity+=1.5;//gravity
    player.x+=player.x_velocity;
    player.y+=player.y_velocity;
    player.x_velocity*=0.3;
    player.y_velocity*=0.9;


    if(player.y>613){
        player.jumping=false;
        player.y=613;
        player.y_velocity=0;
    }

   
    blocks.x+=blocks.x_velocity;
    blocks.y+=blocks.y_velocity;
    blocks.x_velocity*=0.3;
    blocks.y_velocity*=0.9;

   
    ctx.font="20px Vernada"
    // ctx.fillText("Таймер:"+ ,0,100);
    ctx.fillText("Счет "+n,0,120)
    
    
 
    
    requestAnimationFrame(draw);
}

bg.onload=draw;
// }
