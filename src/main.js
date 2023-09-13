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
            if (player.y < (CANV_HEIGHT - (CANV_HEIGHT / 4))) { //Don't let the player go above 1/8 of the screen
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
let hit = false; // flag for player being hit by enemy or projectile
let enemies = []; // array to hold snowflake objects

function setup() {
    createCanvas(CANV_WIDTH, CANV_HEIGHT);
    fill(240);
    noStroke();
    player = new Player(CANV_WIDTH/2,(CANV_HEIGHT - CANV_HEIGHT/16),10); // create a new player object
    enemy1 = new Enemy1()
}

function draw() {
    background(145, 240, 243); // set the background to white
    textSize(18); // determines size of font
    fill(51); // determines color of text

    if(hit == false){ // stops drawing the player if they get hit
    player.display(); // draw the player
    }

    player.update();
    enemy1.showcase();

   for (let enmy of enemies){ // checks each enemy for collision
      if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size)) hit = true;
  }
   
}

function keyPressed(){
    pressedKeys[key] = true;
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
