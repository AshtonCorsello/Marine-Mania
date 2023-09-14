const CANV_WIDTH = 720; 
const CANV_HEIGHT = 400;
//var score = 0; // Used to keep track of player score
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  PLAYER CLASS AND FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Player {
   constructor(x, y, size) {
        this.x = x; // x position of the player
        this.y = y; // y position of the player
        this.size = size; // size of the player
        this.speed = 3;
        this.score = 0; // Used to keep track of player score
        this.task_done = false;
        this.last_done = 0;
    }
  
    update(){
        let mvmt = createVector(0,0);

        if(pressedKeys.a || pressedKeys.ArrowLeft) {
            mvmt.x -= 1;
            if (player.x < 0) { //Don't let the player go off the screen
                mvmt.x = 0;
            }
          }
          if(pressedKeys.d || pressedKeys.ArrowRight) {
            mvmt.x += 1;
            if (player.x > CANV_WIDTH - player.size) {
                mvmt.x = 0;
            }
          }
          if(pressedKeys.w || pressedKeys.ArrowUp) {
            mvmt.y -= 1;
            if (player.y < (CANV_HEIGHT - (CANV_HEIGHT / 4))) { //Don't let the player go above 1/4 of the screen
                player.y = (CANV_HEIGHT - (CANV_HEIGHT / 4));
            }
          }
          if(pressedKeys.s || pressedKeys.ArrowDown) {
            mvmt.y += 1;
            if (player.y >= CANV_HEIGHT - player.size) {
                player.y = CANV_HEIGHT - player.size;
            }
          }

        mvmt.setMag(this.speed); // Limits diagonal speed to still max at 10
        this.x += mvmt.x;
        this.y += mvmt.y;
    }
  
    display() { //Draws the player
      //Draws wake behind boat
        stroke(255,255,250); //Outline color
        fill(220, 250, 253); //Color of shape
        triangle(this.x-this.size/1.5, this.y+4*this.size, this.x, this.y, this.x+this.size/1.5, this.y+4*this.size);
      //Draws boat
        stroke(255,255,2); //Outline color
        fill(226, 194, 162); //Color of shape
        ellipse(this.x, this.y, this.size*1.75, this.size*4, 3);
        
      // details of boat
        stroke(90);
        fill(200);
        quad(this.x-this.size/3, this.y+this.size, this.x+this.size/3, this.y+this.size, this.x+this.size/3, this.y-this.size*.75, this.x-this.size/3, this.y-this.size*.75);
        stroke(100);
        fill(190);
        rectMode(CENTER);
        square(this.x, this.y+this.size/4, this.size/3);

        text('Score: ' + this.score, 0, 15);// determines what is displayed, at what x,y
    }
}

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
    enemy1 = new Enemy1();
    projectile1 = new Projectile();
}

function draw() {
    background(145, 240, 243); // set the background to blue
    textSize(18); // determines size of font
    fill(51); // determines color of text

    player.display(); // draw the player

    player.update();
    enemy1.showcase();
    projectile1.showcase();
}

function keyPressed(){
    pressedKeys[key] = true;
    if(keyCode === 32){  // if spacebar is pressed
      console.log("Space firing");
      projectiles.push(new Projectile(player.x, player.y-1));
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
    };
  
    display() {
      ellipse(this.posX, this.posY, this.size);
    };

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
      let t = frameCount / 120; // update time

     // loop through enemies with a for..of loop
      for (let enmy of enemies) {
         enmy.update(t); // update enemy position
         enmy.display(); // draw enemy
      }
    }
}

// Need to look through this to develop projectiles
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
  // want to combine the events with mouse presses for shooting projectiles
  function mousePressed(){
      //console.log("Firing from mouse press");
      projectiles.push(new Projectile(mouseX, mouseY));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
