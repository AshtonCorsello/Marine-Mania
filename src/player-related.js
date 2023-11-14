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
        this.imgShift = this.size*3; // should be 1/2 of the 4th and 5th arguments of image() call in player's display fn
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
        rect(this.x-this.imgShift/2, this.y-this.imgShift, this.size*3, this.size*6, 20); 
      }

      // draws player icon
      image(playerImg, this.x-this.imgShift, this.y-this.imgShift, this.size*6, this.size*6);
    }



}
