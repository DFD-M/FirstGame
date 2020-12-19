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
    if(sec>10){
      return  timer.innerHTML="Таймер: 0"+min+":"+sec;  
    }
    else{
       return timer.innerHTML="Таймер: 0" + min+":0"+sec;
    }

   
}

var character=new Image(90,75);
var key = new Image();
var bg = new Image();
var soil = new Image();
var enemy = new Image();
var block1= new Image();
var block2= new Image();



//connect image
character.src="Photos/sprite (13).png"
key.src="Photos/ket.png"
bg.src="Photos/2_21.png"
// enemy.src=""
block1.src="Photos/tileset1.png"
block2.src="Photos/tileset1.png"
// characterPlayer={
//     x:15,
//     y:613,
//     x_velocity:0,
//     y_velocity:0,
//     jumping:true,
    


// };



document.addEventListener('keydown',function (e){if(KeyDown(e));});

function moveUp(){
    
    yPos-=25
    
    
    
}



function KeyDown(e)
{
    switch(e.keyCode){
        case 37: //left
            xPos-=25;
            break;
        case 39:
            xPos+=25
            break;
        case 38:
            setTimeout(moveUp,100)

            // yPos-=25;

            break;
        

    }
    


}

function move(){
    yPos-=25
    
}

var block=[]
block[0]={
    x:cvs.width,
    y:0

}


// var t=DataView()

function draw(){
    ctx.drawImage(bg,0,0,1280,720);
    ctx.drawImage(key,55,590,99,99)
    ctx.drawImage(character,xPos,yPos,90,75);
    // ctx.drawImage(block1,-50,630)+ctx.drawImage(block1,Xpos+block1.width,cvs.height-90);
    // ctx.drawImage(block1,block1.width,block1.height)
    for(var i=0;i<block.length;i++){
        ctx.drawImage(block1,block[i].x,block[i].y)
        block[i].x--;
        if(block[i].x==700){
            block.push({
                x:cvs.width,
                y:Math.floor(Math.random()*block1.width)-block1.width
            })
        
        }
        
        // if(block[i].x<500||){n++}
    }
    
    
    // for(var i=0;i<block.length;i++){
    //     ctx.drawImage(block1,block[i].x,block[i].y);
    //     console.log(block[i].x)
        // ctx.drawImage(block2,block[i].x,block[i].y+gap+block1.height);
        // block[i].x--;
        // if(block[i].x==15){// поменять на значение после первого блока перса 
        //     block.push({
        //         x:cvs.width,
        //         y:Math.floor(Math.random()*block1)
                
        //     },console.log(x),console.log(y));
        // }console.log(block[i])

    


    // if(yPos>630||xPos<-50||xPos>canvas.width-90){
    //     location.reload();
      
  
    if(yPos>=613){
        gravity=0
    }else{
        gravity=2
    }

   
    yPos+=gravity;
    ctx.font="20px Vernada"
    // ctx.fillText("Таймер:"+ ,0,100);
    ctx.fillText("Счет "+n,0,120)
    
    
 
    
    requestAnimationFrame(draw);
}

bg.onload=draw;
// }
