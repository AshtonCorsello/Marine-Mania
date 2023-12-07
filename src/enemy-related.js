/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  ENEMY CLASS AND FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// enemy class
class Enemy1 {

    constructor() {
      // initialize coordinates
      this.posX = 0;
      this.posY = random(CANV_HEIGHT*(-50/400), 0);
      this.initialangle = random(0, 360); // degrees
      this.size = 10*CANV_SCALAR;
      this.readyToSpawn = false;
      this.lastSpawnedTime = 0;
      this.hit = false;
      this.scoreIncrease = 5;

      //get enemy instance's curvetype
      let curvesArr = ["sin", "cos"];
      this.curveType = random(curvesArr);

      // radius of placeholder
      this.radius = sqrt(random(pow(width / 2, 2))); //need to check this for scalability

      // sets hit to true
      this.setHitTrue = function() {hit = true;};
    }
  
  
    update(t){
      // x position follows a circle
      let w = 50*CANV_SCALAR; // angular speed
      let angle = w * t + this.initialangle;

      if(this.curveType === "sin"){
        this.posX = width / 2 + this.radius * sin(angle);
      }
      else if(this.curveType === "cos"){ 
        this.posX = width / 2 + this.radius * cos(angle);
      }
      
      this.posY += pow(this.size, 0.5);
      // delete enemy if past end of screen or if hit by projectile
      if (this.posY > height || this.hit == true) {
        let index = enemies.indexOf(this);
        enemies.splice(index, 1);
      }
    }
  
    display(){
      fill(0,0,0,0);
      stroke(0,0,0,0);
      ellipse(this.posX, this.posY, this.size);
      let img = enemy1Image; 
      let width = img.width;
      let height = img.height;
      let centerX = this.posX;
      let centerY = this.posY;
      image(img, centerX - width/2, centerY - height/2);
    }

    showcase(delay){
      if(enemyOn){
        if(this.readyToSpawn) {
          enemies.push(new Enemy1()); // append enemy object
          this.readyToSpawn = false;
          this.lastSpawnedTime = millis();
        }
        else{
          if(millis() - this.lastSpawnedTime > delay) {
            this.readyToSpawn = true;
          }
        } 
        let t = frameCount / 60; // update time

        for(let enmy of enemies) {
          enmy.update(t); // update enemy position
        }
      }
      // loop through enemies with a for..of loop
      for (let enmy of enemies) {
        enmy.display(); // draw enemy
      }
    }
}


class Enemy2 {

  constructor() {
    // initialize coordinates
    this.posX = CANV_WIDTH * random();
    this.posY = random(CANV_HEIGHT*(-50/400), 0);

    this.size = 10*CANV_SCALAR;
    this.readyToSpawn = false;
    this.lastSpawnedTime = 0;
    this.hit = false;
    this.scoreIncrease = 5;
    this.health = 3;

    // radius of placeholder
    this.radius = sqrt(random(pow(width / 2, 2))); //need to check this for scalability

    // sets hit to true
    this.setHitTrue = function() {hit = true;};
  }


  update(t){

    // finds angle to player for trig calculations using distance equation and arccos
    let distanceToPlayer = sqrt(pow((this.posX - player.x),2) + pow((this.posY - player.y),2));
    let angleToPlayer = acos((Math.abs(this.posY - player.y)) / (distanceToPlayer));
    
    // moves X position depending on if the enemy is left/right of the player
    if (this.posX < player.x)
    this.posX += ((CANV_SCALAR/3) * sin(angleToPlayer));
    else
    this.posX -= ((CANV_SCALAR/3) * sin(angleToPlayer));

    // moves Y position depending on if the enemy is above/below the player
    if (this.posY < player.y)
    this.posY += ((CANV_SCALAR/3) * cos(angleToPlayer));
    else
    this.posY -= ((CANV_SCALAR/3) * cos(angleToPlayer));

    // reduces health of enemy if hit
    if (this.hit == true) {
      this.takeDamage();
    }
    // delete enemy if past end of screen or if hp reaches 0
    if (this.posY > height || this.health <= 0) {
      let index = enemies.indexOf(this);
      enemies.splice(index, 1);
    }
  }

  display(){
    fill(0,0,0,0);
    stroke(0,0,0,0);
    ellipse(this.posX, this.posY, this.size);
    let img = enemy2Image; 
    let width = img.width;
    let height = img.height;
    let centerX = this.posX;
    let centerY = this.posY;
    image(img, centerX - width/2, centerY - height/2);
  }

  showcase(delay){
    if(enemyOn){
      if(this.readyToSpawn) {
        enemies.push(new Enemy2()); // append enemy object
        this.readyToSpawn = false;
        this.lastSpawnedTime = millis();
      }
      else{
        if(millis() - this.lastSpawnedTime > delay*3) {
          this.readyToSpawn = true;
        }
      } 
      let t = frameCount / 60; // update time

      for(let enmy of enemies) {
        enmy.update(t); // update enemy position
      }
    }
    // loop through enemies with a for..of loop
    for (let enmy of enemies) {
      enmy.display(); // draw enemy
    }
  }

  takeDamage(){
    this.health = this.health - 1;
    this.hit=false;
  }
}
