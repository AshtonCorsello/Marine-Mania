//////////////////////////////////////////////////////////////////////
/////////////////////////////MINIGAME FUNCTIONS///////////////////////
//////////////////////////////////////////////////////////////////////

var death = true;
var currentDead = false;
var displayBox;

function isFirstDeath(){ // Checks to see if this is the player's first death
  return death;
}

function isCurrentlyDead(){ // Checks to see if the player is currently dead
  return currentDead;
}

function minigameDisplay(){
  // Remove when minigame is implemented
  testpauseButton = createButton('Unpause');
  testpauseButton.position(0, 0);
  testpauseButton.size(CANV_WIDTH/6, CANV_HEIGHT/20);
  testpauseButton.mousePressed(minigameEnd);
  // Remove when minigame is implemented ^^^
  // Implement Game below
  displaybox = rect(CANV_WIDTH/2, CANV_HEIGHT/2, CANV_HEIGHT/2, CANV_HEIGHT/2); // Dedicates the space the on death minigame should be displayed in
}

function minigameEnd(){
  removeElements(testpauseButton); // Remove when minigame is implemented
  unpause();
  minigameOpenShield(); // Gives the player a shield for 5 secs after death
  currentDead = false;
  death = false;
  player.setHitFalse();
}
