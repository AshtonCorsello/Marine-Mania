//////////////////////////////////////////////////////////////////////
/////////////////////////////MINIGAME FUNCTIONS///////////////////////
//////////////////////////////////////////////////////////////////////

var death = true;
var currentDead = false;
var displaySize = 200;
var displayX = CANV_WIDTH/2 - displaySize/2;
var displayY = CANV_HEIGHT/2 - displaySize/2;
var displayBox;

function isFirstDeath(){ // Checks to see if this is the player's first death
  return death;
}

function isCurrentlyDead(){
  return currentDead;
}

function minigameDisplay(){
  removeElements(pauseText,pauseButton);
  displaybox = rect(displayX, displayY, displaySize, displaySize);
}
