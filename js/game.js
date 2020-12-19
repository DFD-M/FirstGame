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
var flag=0;



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
// enemy.src=""
block1.src="Photos/tileset1.png"
block2.src="Photos/tileset1.png"






const player={
    
    x:15,
    y:613,
    width:33,
    height:32,
    frameX:0,
    frameY:0,
    speed:9,
    size:10,
    jumping:false,
    x_velocity:0,
    y_velocity:0,   
};


const blocks={
    x:0,
    y:0,
    width:0,
    height:0,
    frameX:0,
    frameY:0,
    
}


document.addEventListener('keydown',function (e){if(KeyDown(e));});




function KeyDown(e)
{
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



var block=[]
block[0]={
    x:cvs.width,
    y:590

}


// var t=DataView()

function draw(){
    ctx.drawImage(bg,0,0,canvas.width,canvas.height);
    ctx.drawImage(key,55,590,99,99)
    ctx.drawImage(character,player.width*player.frameX,player.height*player.frameY,player.width,player.height,player.x,player.y,player.width,player.height);
    // animate();
    // update();
    
    for(var i=0;i<block.length;i++){
        ctx.drawImage(block1,block[i].x,block[i].y)
        block[i].x--;
        if(block[i].x==700){
            block.push({
                x:cvs.width,
                y:Math.floor(Math.random()*block1.width)-block1.width
            })
        
        }

      
    }
    
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

    // if(yPos>=613){
    //     gravity=0
    // }else{
    //     gravity=2
    // }

   
    yPos+=gravity;
    ctx.font="20px Vernada"
    // ctx.fillText("Таймер:"+ ,0,100);
    ctx.fillText("Счет "+n,0,120)
    
    
 
    
    requestAnimationFrame(draw);
}

bg.onload=draw;
// }
