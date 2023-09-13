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

    if(!player.isHit()){ // stops drawing the player if they get hit
      player.display(); // draw the player
      player.update();
    }

  enemy1.showcase();

   for (let enmy of enemies){ // checks each enemy for collision
      if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size))
        player.setHitTrue();
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
