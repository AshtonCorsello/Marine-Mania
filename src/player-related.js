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
        this.level = 1;
        this.task_done = false;
        this.last_done = 0;
        this.shield = false
        //creates private hit flag
        let hit = false;
        this.isHit = function() { return hit; };
        this.setHitTrue = function() { hit = true; };
        this.setHitFalse = function() { hit = false; };
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

      //Draws Shield
      if(player.shield == true){
        stroke(58, 214, 134);
        fill(255, 255, 255);
        rect(this.x, this.y, this.size*3, this.size*6, 20); 
        textSize(10*CANV_SCALAR);
        text('Shield time: '+(ShieldCT)+' sec',CANV_WIDTH*(60/72),CANV_HEIGHT/20); // Shield time
      }

      imageMode(CENTER);
      image(playerImg, this.x, this.y);
    /*
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
    */
      //  textSize(10*CANV_SCALAR);

      //  text('Gametime: '+time+' sec',CANV_WIDTH/2,CANV_HEIGHT/20);// Show game time
      //  textAlign(LEFT);
      //  text('Score: ' + this.score, CANV_WIDTH/20, CANV_HEIGHT/20);// determines what is displayed, at what x,y
      //  textAlign(CENTER);
    }



}
