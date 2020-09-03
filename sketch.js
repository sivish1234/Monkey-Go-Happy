var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround, backImg;

var monkey, monkeyImg;

var invisibleGround;

var banana, bananaImg, BananasGroup;
var obstacles, stoneImg, ObstaclesGroup;

var restart, restartImg;

var gameOver, overImg;

var score = 0;

function preload(){

  backImg = loadImage("jungle.jpg");
  
  monkeyImg = loadImage("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png",    "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
  
  restartImg = loadImage("restart.png");
  
  overImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 400);
  
  backGround = createSprite(300,200,1200,400);
  backGround.addImage("jungle",backImg);
  backGround.x = backGround.width /2;
  
  monkey = createSprite(50,340,40,40);
  monkey.addImage("monkey", monkeyImg);
  monkey.scale = 0.14;
  
  invisibleGround = createSprite(300,370,600,1);
  invisibleGround.visible = false;
  
  BananasGroup = new Group();
  
  ObstaclesGroup = new Group();
  
  restart = createSprite(300,140,40,40);
  restart.addImage("restart", restartImg);
  restart.scale = 0.7;
  restart.visible = false;
    
  gameOver = createSprite(300,100,40,40);
  gameOver.addImage("gameOver", overImg);
  gameOver.scale = 0.75;
  gameOver.visible = false;
}

function draw() {
  background(220);
  
  monkey.collide(invisibleGround);
  
  if(gameState === PLAY){
  backGround.velocityX = -(5 + 3*score/10);
    
   if(keyWentDown("space") && monkey.y >= 250){
      monkey.velocityY = -18;
   }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
   if (backGround.x < 150){
     backGround.x = backGround.width /2;
   } 
  
   if(monkey.isTouching(BananasGroup)){
      score = score+2;
      BananasGroup.destroyEach();
   }
  
   if(monkey.isTouching(ObstaclesGroup)){
      gameState = END;
      restart.visible = true;
      gameOver.visible = true;   
   }
    
   spawnbananas();
    
   spawnobstacles();
  }
  
  else if(gameState === END) {
    backGround.velocityX = 0;
    monkey.velocityY = 0;
    
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      ObstaclesGroup.destroyEach();
      BananasGroup.destroyEach();     
      gameState = PLAY;
      score = 0;
      restart.visible = false;
      gameOver.visible = false;   
   }  
  }
  
  drawSprites();
  
  fill("white");
  stroke("black");
  strokeWeight(2);
  textFont("Georgia");
  textSize(20);
  text("Score: "+ score, 500,50);
}

function spawnbananas(){
  if(frameCount % 100 === 0){
    var banana = createSprite(600,50,30,30);
    banana.addImage("banana.png",bananaImg);
    banana.scale = 0.08;
    banana.velocityX = -5;
    banana.lifetime = 150;
    
    var rand = random(100,160);
    banana.y = rand;
    
    BananasGroup.add(banana);

 }
}

function spawnobstacles(){
  if(frameCount % 180 === 0){
  obstacles = createSprite(600,340,30,30);
  obstacles.addImage("stone",stoneImg);
  obstacles.velocityX = -5;
  obstacles.scale = 0.18;
  obstacles.lifetime = 200;
    
  ObstaclesGroup.add(obstacles);
}
}
