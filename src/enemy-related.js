/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  ENEMY CLASS AND FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// enemy class
class Enemy1 {

    constructor() {
      // initialize coordinates
      this.posX = 0;
      this.posY = random(-50, 0);
      this.initialangle = random(0, 360); // degrees
      this.size = 15*CANV_SCALAR;
      this.readyToSpawn = false;
      this.lastSpawnedTime = 0;

      //get enemy instance's curvetype
      let curvesArr = ["sin", "cos"];
      this.curveType = random(curvesArr);

      // radius of placeholder
      this.radius = sqrt(random(pow(width / 2, 2)));

    }
  
  
    update(time) {
      // x position follows a circle
      let w = 50; // angular speed
      let angle = w * time + this.initialangle;

      if(this.curveType === "sin"){
        this.posX = width / 2 + this.radius * sin(angle);
      }
      else if(this.curveType === "cos"){ 
        this.posX = width / 2 + this.radius * cos(angle);
      }
      
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

    showcase(delay) {
      if (enemyOn){
        if(this.readyToSpawn) {
          enemies.push(new Enemy1()); // append enemy object
          this.readyToSpawn = false;
          this.lastSpawnedTime = millis();
        }
        else {
          if(millis() - this.lastSpawnedTime > delay) {
            this.readyToSpawn = true;
          }
        } 
        let t = frameCount / 60; // update time

        for (let enmy of enemies) {
          enmy.update(t); // update enemy position
        }
 
      // loop through enemies with a for..of loop
        for (let enmy of enemies) {
          enmy.display(); // draw enemy
        }
      }
    }
}
