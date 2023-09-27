/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  PROJECTILE CLASS AND FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Projectile {
   constructor(targetX, targetY) {
      // initialize coordinates
     this.posX = player.x;
     this.posY = player.y + player.size/2;
     this.hit = false;
     
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
  
      // delete projectile if past end of screen or if it hits an enemy
      if (this.posY > CANV_HEIGHT || this.posX > CANV_WIDTH || this.posX < 0 || this.hit == true) {
        let index = projectiles.indexOf(this);
        projectiles.splice(index, 1);
        console.log('projectile deleted');
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

      for (let prjctl of projectiles) {
         prjctl.update(t); // update projectile position
      }

      for (let prjctl of projectiles) {
         prjctl.display(); // draw projectile
      }
    }
}
