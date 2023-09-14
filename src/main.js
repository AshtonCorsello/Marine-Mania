const CANV_WIDTH = 720; 
const CANV_HEIGHT = 400;
//var score = 0; // Used to keep track of player score
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  P5JS MAIN FUNCTIONS  //////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let player; // player object
let pressedKeys = {}; // Holding for the pressed keys
let enemies = []; // array to hold snowflake objects
let projectiles = []; // array to hold projectile objects

function setup() {
    createCanvas(CANV_WIDTH, CANV_HEIGHT);
    fill(240);
    noStroke();
    player = new Player(CANV_WIDTH/2,(CANV_HEIGHT - CANV_HEIGHT/16),10); // create a new player object
    enemy1 = new Enemy1()
    projectile1 = new Projectile();
}

function draw() {
    background(145, 240, 243); // set the background to white
    textSize(18); // determines size of font
    fill(51); // determines color of text

    if(!player.isHit()){ // stops drawing the player if they get hit
      player.display(); // draw the player
      player.update();
    }
  
    enemy1.showcase();
    projectile1.showcase();

   for (let enmy of enemies){ // checks each enemy for collision
      if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size))
        player.setHitTrue();
  }
   
}

function keyPressed(){
    pressedKeys[key] = true;
   if(keyCode === 32){  // if spacebar is pressed
      console.log("Space firing");
      projectiles.push(new Projectile(player.x, player.y+1));
    }
}

function keyReleased(){
    delete pressedKeys[key];
}

// enemy class
class Enemy1 {

    constructor() {
      // initialize coordinates
      this.posX = 0;
      this.posY = random(-50, 0);
      this.initialangle = random(0, 2 * PI);
      this.size = 15;

      // radius of placeholder
      this.radius = sqrt(random(pow(width / 2, 2)));

    }
  
  
    update(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(angle);
        this.posY += pow(this.size, 0.5);
  
      // delete enemy if past end of screen
      if (this.posY > height) {
        let index = enemies.indexOf(this);
        enemies.splice(index, 1);
      }
    }
  
    display() {
      ellipse(this.posX, this.posY, this.size);
    }

    showcase() {
      const delay = random (1000, 5000) //ms
      if(!this.task_done) {
          enemies.push(new Enemy1()); // append enemy object
          this.task_done = true;
          this.last_done = millis();
      }
      else {
          if(millis() - this.last_done > delay) {
            this.task_done = false;
          }
      } 
      let t = frameCount / 60; // update time

     // loop through enemies with a for..of loop
      for (let enmy of enemies) {
         enmy.update(t); // update enemy position
         enmy.display(); // draw enemy
      }
    }
}


//checks if two objects intersect using (x,y) and radius
function intersect(obj1X, obj1Y, obj1R, obj2X, obj2Y, obj2R){
    if (sqrt(pow((obj1X - obj2X),2) + pow((obj1Y - obj2Y),2)) < (obj1R + obj2R)) {return true;}
    else {return false;}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Projectiles class and functions
////////////////////////////////////////////////////////////////////////////////////////////
class Projectile {
   constructor(targetX, targetY) {
      // initialize coordinates
     this.posX = player.x;
     this.posY = player.y + player.size/2;
     
     this.projectileScalar = 28800; //currently set to scale projectiles to 10px and 10px per frame on 720 x 400 canvas
   
     // Setting up movement of the projectiles
     this.dirMult = (targetX<player.x ? -1: 1);
     this.slope = this.dirMult * (player.y-targetY)/(player.x-targetX);
     this.speed = (CANV_WIDTH*CANV_HEIGHT)/this.projectileScalar;
     angleMode(DEGREES);
     this.initialAngle = atan(this.slope);
  /* debug messages
     console.log("Target: " , targetX , "," , targetY);
     console.log("Player: " , player.x , "," , player.y);
     console.log(this.initialAngle);
  */
     this.size = (CANV_WIDTH*CANV_HEIGHT)/this.projectileScalar;
   }
  
  
    update() {
      // Decides how much to move in each direction per frame
      this.posY += sin(this.initialAngle)*this.speed;
      this.posX += cos(this.initialAngle)*this.dirMult*this.speed;
  
      // delete projectile if past end of screen
      if (this.posY > height) {
        let index = projectiles.indexOf(this);
        projectiles.splice(index, 1);
      }
    }

    display() {
      stroke(255, 200, 222);
      fill(55);
      ellipse(this.posX, this.posY, this.size);
    }

    showcase() {
      const delay = 2500 //ms
      let t = frameCount / 60; // update time
      // loop through projectiles with a for..of loop
      for (let prjctl of projectiles) {
         prjctl.update(t); // update projectile position
         prjctl.display(); // draw projectile
      }
    }
}

function mousePressed(){
   //console.log("Firing from mouse press");
   projectiles.push(new Projectile(mouseX, mouseY));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
