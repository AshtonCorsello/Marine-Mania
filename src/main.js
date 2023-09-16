const CANV_WIDTH = 720; 
const CANV_HEIGHT = 400;
var mode = 0; // Stores weither the user has left the main menu
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  P5JS MAIN FUNCTIONS  //////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let player; // player object
let pressedKeys = {}; // Holding for the pressed keys
let enemies = []; // array to hold snowflake objects
let projectiles = []; // array to hold projectile objects
let prop = false;
let energiesarray = [];// Array of shield energy cycles
let energies = 0;
let shieldtime = 0;


function setup() {
    createCanvas(CANV_WIDTH, CANV_HEIGHT);
    fill(240);
    noStroke();
  
    player = new Player(CANV_WIDTH/2,(CANV_HEIGHT - CANV_HEIGHT/16),10); // create a new player object
    enemy1 = new Enemy1()
    projectile1 = new Projectile();
    setTimeout(energie, 5000);
    
}



function draw() {
    if(mode == 0){ // Main menu
      background(0, 204, 255) // set the background to blue
      textSize(32);
      text('Marine Mania', 250, 150); // Name of game
      button1 = createButton('Start Game'); // set text of button
      button1.position(300, 200); // set button position
      button1.size(100, 20); // sets size of button
      button2 = createButton('Debug Room');
      button2.position(300, 250); // set button position
      button2.size(100, 20); // sets size of button
      if(mouseX >= 300 && mouseX <= 400 && mouseY >= 200 && mouseY <= 220 && mouseIsPressed == true){ // If the mouse is at the right spot and clicked
        mode = 1;
        removeElements(button1,button2); // removes the buttons from the screen
        energies = 0;
        energiesarray = [];
      }
      if(mouseX >= 300 && mouseX <= 400 && mouseY >= 250 && mouseY <= 270 && mouseIsPressed == true){
        mode = 2;
        removeElements(button1,button2);
      }


    }
    if(mode == 1 | mode == 2){ // Game has started
      // Drawing the level
      background(145, 240, 243); // set the background to white
      textSize(18); // determines size of font
      fill(51); // determines color of text

      if(!player.isHit()){ // stops drawing the player if they get hit
        player.display(); // draw the player
        player.update();
      }
  
      enemy1.showcase();
      projectile1.showcase();
      if (energies >= 1){
        button3 = createButton('prop');
        button3.position(650, 10); // set button position
        button3.size(40, 20); // sets size of button
      }

      if(mouseX >= 650 && mouseX <= 750 && mouseY >= 10 && mouseY <= 30 && mouseIsPressed == true && prop == false){
        removeElements(button3);
        player.display(prop = true);
        mode = 2;
        setTimeout(Shieldtime, 5000*(energies));
        energies = 0;
        energiesarray = [];
      }

      if(mode == 2){
        for (let enmy of enemies){ // Shield Mode checks each enemy for collision
          if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size))
            player.setHitFalse();
        }
      }else{
        for (let enmy of enemies){ // checks each enemy for collision
          if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size))
            player.setHitTrue();
        }
      }
    }
    if(mode == 9){ // debug room implementation
      background(0, 0, 0) // set the background to black so that I can test the button works
    }
}

function Shieldtime(){
  player.display(prop = false);
  mode = 1;
}

function energie(){
  if(energies<10){
    energiesarray[energies] = 40+energies*17;
    energies++;
    setTimeout(energie, 5000);
  }
}

function changeMode(i){
  mode = i;
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
