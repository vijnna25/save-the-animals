var ground
var backgr
var backgrImg
var player
var playerImg
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var trashGroup;
var trashImg
var score = 0;
var gameOver, gameOverImg;
var winner, winnerImg;

function preload(){
  obstacle1 = loadImage("images/animated bush.jpg");
  obstacle2 = loadImage("images/animated lion.png");
  obstacle3 = loadImage("images/animated monkey.jpg");
  obstacle4 = loadImage("images/animated rock.png");
  obstacle5 = loadImage("images/animated rock2.png");

  playerImg = loadImage("images/animated player.jpg");
  backgrImg = loadImage("images/animated jungle.jpg");

  trashImg = loadImage("images/animated trash.png")

  gameOverImg = loadImage("images/game over.png")

  winnerImg = loadImage("images/winner.png")

}

function setup() {
  createCanvas(850,600);
  ground = createSprite(0, 580, 850, 50);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false

  backgr = createSprite(0,0,850,1200);
  backgr.velocityX = -4;
  backgr.x = backgr.width/2; 
  backgr.addImage(backgrImg);
  backgr.scale = 1.45

  player = createSprite(100,530,20,50);
  player.shapeColor = "green"
  player.addImage(playerImg);
  player.scale = 0.09;

  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5
  gameOver.visible = false;
 
  
  winner = createSprite(400,300);
  winner.addImage(winnerImg);
  winner.scale = 0.5;
  winner.visible = false;

  obstaclesGroup = new Group();
  trashGroup = new Group();

}

function draw() {
  background(0);
  if(ground.x < 450){
    ground.x = ground.width/2;
  }  

  if(backgr.x < 100){
    backgr.x = backgr.width/2;
  }  
  if(keyDown("UP_ARROW")){
    player.velocityY = -4;
  }

  if(keyDown("DOWN_ARROW")){
    player.velocityY = 4;
  }

  if(keyDown("LEFT_ARROW")){
    player.velocityX = -4;
  }

  if(keyDown("RIGHT_ARROW")){
    player.velocityX = 4;
    score += 4
  }
  
  if(trashGroup.isTouching(player)){
    trashGroup.destroyEach()
    score = score + 3;
  }

  if(obstaclesGroup.collide(player)){
    gameOver.visible = true;
    backgr.velocityX = 0;
    player.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    trashGroup.setVelocityXEach(0);
    trashGroup.setLifetimeEach(-1);
  }
  
 // trashGroup();

  //player.velocityY = player.velocityY + 0.8
  player.collide(ground);

  spawnObstacles();
  spawnTrash();

  drawSprites();

  stroke ("white");
  textSize(20);
  fill("white");
  text("Score " + score,600,50);

  if(score > 500){
    winner.visible = true
  }

}

function spawnObstacles(){
  if(frameCount %300 === 0){
    var obstacle = createSprite(850,500,10,40);
    obstacle.y = Math.round(random(100,500));
    obstacle.velocityX = -6;

    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;

      default: break;
    }
    obstacle.scale = 0.3;
    obstacle.lifetime = 800;
    obstaclesGroup.add(obstacle);
  }

}

function spawnTrash() {
  if(frameCount %300 === 0){
    var trash = createSprite(850,500,10,40);
    
    trash.y = Math.round(random(200,600));
    trash.velocityX = -6;
    trash.addImage(trashImg)
    trash.scale = 0.2;
    trash.lifetime = 800;
    trashGroup.add(trash);
  }
}