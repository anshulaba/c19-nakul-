var ghost,ghostImg;
var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var gameState= "play";
var spookySound;

function preload(){
   towerImg=loadImage("tower.png") ;
  ghostImg=loadImage("ghost-standing.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup()
{
createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
}
function draw(){
  background("white");
 if(gameState==="play"){
   if(keyDown("left_arrow")){
     
     ghost.x=ghost.x-3;
   }
   if(keyDown("right_arrow")){
     ghost.x=ghost.x+3;
   }
  
   if(keyDown("space")){
     ghost.velocityY=-10;
   }
   ghost.velocityY=ghost.velocityY+0.8;
   
   if(tower.y>400)
     {
       tower.y=300;
     }
   spawnDoors();
   
   if(climbersGroup.isTouching(ghost))
     {
       ghost.velocityY=0;
     }
   
   if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600)
   {
     ghost.destroy();
     gameState="end";
   }
   drawSprites();
    
 }
  
  if(gameState==="end")
    {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("GAMEOVER",230,250);
      
    }
}

function spawnDoors()
{
  if(frameCount%240===0)
    {
      door=createSprite(200,-50);
      climber=createSprite(200,10);
      invisibleBlock=createSprite(200,15);
      invisibleBlock.width=climber.width;
      invisibleBlock.height=2;
      
      door.x=Math.round(random(120,400));
      climber.x=door.x;
      invisibleBlock.x=door.x;
      
      door.addImage(doorImg);
      climber.addImage(climberImg);
      
      door.velocityY=1;
      climber.velocityY=1;
      invisibleBlock.velocityY=1;
      
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+1;
      
      door.lifetime=800;
      climber.lifetime=800;
      invisibleBlock.lifetime=800;
      
      doorsGroup.add(door);
      invisibleBlock.debug=true;
      climbersGroup.add(climber);
      invisibleBlockGroup.add(invisibleBlock);
      
      
    }
  
}
  
    
  
  
  