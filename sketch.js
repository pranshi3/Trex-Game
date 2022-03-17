var trex ,trex_running;
var ground
var groundimage
var cloud,cloudImage
var cactus
var c1
var c2
var c3
var c4
var c5
var c6
var score= 0
var cactusGroup
var cloudGroup
var gameState='serve'
var gameover,gameoverImage
var restart,restartImage
var checkPoint, die, jump
/*var clock= new Date()
var time=clock.getMinutes()*60+clock.getSeconds()
console.log(time)
var l=0
async function ye(){
  await function yew(){
    for (c=0;c<1000000;c=c+1){
      l=l+c
      //console.log(l)
      }
    }
      //var pranshi= await fetch('https://www.msn.com/en-ca/news/canada/david-sacks-trudeau-creates-a-caste-of-economic-untouchables-in-canada/ar-AAUaps1?ocid=msedgntp')
   //await console.log(pranshi)
   var clock1= new Date()
var time1=clock1.getMinutes()*60+clock1.getSeconds()
console.log(time1)

}
 ye() */



function preload(){
  trex_running=loadAnimation('trex3.png','trex4.png')
  trex_standing=loadAnimation('trex1.png')
  trex_collided=loadAnimation('trex_collided.png')
  groundimage=loadImage('ground2.png')
  cloudImage=loadImage('cloud.png')
  c1=loadImage('obstacle1.png')
  c2=loadImage('obstacle2.png')
  c3=loadImage('obstacle3.png')
  c4=loadImage('obstacle4.png')
  c5=loadImage('obstacle5.png')
  c6=loadImage('obstacle6.png')
  gameoverImage=loadImage('gameOver1.png')
  restartImage=loadImage('restart.png')
  jump=loadSound('jump.mp3')
  die=loadSound('die.mp3')
  checkPoint=loadSound('checkpoint.mp3')
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex=createSprite(50,160,20,20)
  trex.scale=0.5
  trex.addAnimation('stand',trex_standing)
  trex.addAnimation('run', trex_running)
  trex.addAnimation('collided', trex_collided)
//making collision radius of trex visible
trex.debug=false
//changing shape and size of trex collision radius
trex.setCollider('circle',0,0,48)
//trex.setCollider('rectangle',0,0,400,trex.height+30)
  ground=createSprite(300,180,600,5)
ground.addImage(groundimage)
ground2=createSprite(200,290,600,200)
ground2.visible=false
//b=Math.round(random(1,50))
//console.log(b)

//console logging time to see how efficient/fast game is
//var s=0
/*console.time()
for (x=0;x<1000000;x=x+1){
  s=s+x
}
 console.timeEnd() 
 if (time>6){
  console.warn('code too long')
}
*/
//creating groups
cloudGroup= createGroup()
cactusGroup=new Group()
//creating gameover and restart icons
gameover=createSprite(300,100)
gameover.addImage(gameoverImage)
restart=createSprite(300,150)
restart.addImage(restartImage)
gameover.scale=0.7
restart.scale=0.5
} 

function draw(){

  background("steelBlue")
  fill('white')
  textSize(20)
  text('Score: '+ score,420,40)
  //serve block

  if (gameState=='serve'){
//stopping ground
ground.velocityX=0
gameover.visible=false
restart.visible=false
//changing gameState to alive when jumping
if (keyDown('space')){
  gameState= 'alive'
} 
  }
//alive block
if (gameState=='alive'){
  ground.velocityX=-8-score/100 
  gameover.visible=false
restart.visible=false
//changing trex animation to running
trex.changeAnimation('run')
  //making ground infinite by scrolling it
if (ground.x<0){
  ground.x=300
}

cloudsSpawn()
 cactusSpawn()

  //increasing score
  score=score+ Math.round(getFrameRate()/60)
    /*if (keyDown('space')&& (trex.y==167||trex.y==166.75)){
    trex.velocityY=-20
    
  }*/


  if (keyDown('space') && trex.collide(ground2)){
    trex.velocityY=-24
    //console.info('dont jump too much')
    jump.play()
  }

if (score>0 && score%1000==0){
  checkPoint.play()
}

 //adding gravity to trex
 trex.velocityY=trex.velocityY+2.5
 //checking for collision between trex and cactus
 if (trex.isTouching(cactusGroup)){
   die.play()
  gameState='dead'
//jump.play()
//trex.velocityY=-24
 }
}
//dead block
if (gameState=='dead'){
  //stopping ground
  ground.velocityX=0
  trex.velocityY=0
  trex.changeAnimation('collided')
  //freezing everything once dead
  cactusGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  cactusGroup.setLifetimeEach(-5)
  cloudGroup.setLifetimeEach(-5)
  gameover.visible=true
  restart.visible=true

  if (mousePressedOver(restart)){
    reset()

  }

}


  /*if (trex.y<50){
    trex.velocityY=0
  }*/
 

//trex stand on ground

trex.collide(ground2)



 //console.log(trex.y)
 
  drawSprites()
}
 
function reset(){
  gameState='alive'
cactusGroup.destroyEach()
cloudGroup.destroyEach()
score=0
}

function cloudsSpawn(){
  if (frameCount % 60==0){
  
    cloud=createSprite(600,Math.round(random(10,120)),50,10)
    cloud.scale=0.5
    cloud.velocityX=-5
    cloud.addImage(cloudImage)
    //fixing overlapping problem of clouds
    trex.depth=cloud.depth+1
    //assigning lifetime to clouds for fixing memory leak
    /*if (cloud.x<0){
      cloud.lifetime=200
    }*/
  //adding each cloud to cloudGroup
  cloudGroup.add(cloud)
  cloud.lifetime=200

  }
 
  
  
}

function cactusSpawn(){
  if (frameCount % 40==0){
    cactus=createSprite(600,160,50,50)
cactus.velocityX=-8-score/100 
var rmb= Math.round(random(1,6))
switch (rmb){
  case 1:
    cactus.addImage(c1)
    break
  case 2:
    cactus.addImage(c2)
    break
  case 3:
    cactus.addImage(c3)
    break
  case 4:
    cactus.addImage(c4)
    break
  case 5:
    cactus.addImage(c5)
    break 
  case 6:
    cactus.addImage(c6)
    break
  default:
    break

} 
/*if (cactus.x<0){
  cactus.lifetime=200
}*/

cactus.lifetime=200
cactusGroup.add(cactus)
cactus.scale=0.5
cactus.debug=false
cactus.setCollider('circle',0,0,30)   
  }
} 