var ball;
var database;
var pos,p 
var bg,b1,b2,b3

function preload(){
    bg = loadImage("Hot Air Ballon-01.png")
    b1 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup(){
    createCanvas(1200,700);
    ball = createSprite(250,250,10,10);
    ball.addAnimation("Balloon",b1)
    ball.scale = 0.5
    ball.shapeColor = "red";
    database = firebase.database() 
    console.log(database) 
    pos = database.ref('ball/position')
    pos.on("value",readPosition,showError)
}

function draw(){
    background(bg);
    if (p !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
            ball.scale = ball.scale - 0.0001
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,1);
            ball.scale = ball.scale + 0.0001 
        }
    }

    drawSprites();
}

function changePosition(x,y){
   database.ref('ball/position').set({
       x : p.x + x, y : p.y + y
   }) 
}

function readPosition(data){
    p = data.val() 
    ball.x = p.x
    ball.y = p.y
} 

function showError(){
    console.log("Error in reading database") 
} 