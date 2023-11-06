
var pausedTime = 0; // Keeps track of gametime
var paused = false; // If the game is paused
var pauseScore = 0; // Keeps track of gamescore
var pausedShieldCells = 0; // Keeps track of the energy cells
var pausedEnergy = 0; // Keeps track of the energy
var pausedShieldCD = 0; // Keeps track of the shield count down
var pausedEnergyArray = []; // Keeps track of the energy array
var pausedEnemies = []; // Keeps track of the enemies
var pausedProjectiles = []; // Keeps track of the projectiles

function isPaused(){ // Checks to see if the game is paused
  return paused;
}
  
function pause(){ // Pauses the game
  paused = true;
  pausedTime = time;
  pausedScore = player.score;
  pausedShieldCells = shieldCounter;
  pausedEnergy = energies;
  pausedShieldCD = ShieldCT;
  pausedEnergyArray = [...energiesarray];
  pausedEnemies = [...enemies];
  pausedProjectiles = [...projectiles];
  keyReleased();
}

 function unpause(){ // Unpauses the game
  paused = false;
  time = pausedTime;
  player.score = pausedScore;
  shieldCounter = pausedShieldCells
  energies = pausedEnergy;
  SheildCT = pausedShieldCD;
  energiesarray = [...pausedEnergyArray];
  enemies = [...pausedEnemies];
  projectiles = [...pausedProjectiles];
  removeElements(pauseText,pauseButton);
  keyReleased();
}

function pauseDisplay(){ // Displays the Pause text when game is paused
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 0, 0); // Set the text color to red
  pauseText = text("Paused", CANV_WIDTH / 2, CANV_HEIGHT / 2); // Display the message
  pauseButton = createButton('Unpause');
  pauseButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/1.8);
  pauseButton.size(CANV_WIDTH/6, CANV_HEIGHT/20);
  pauseButton.mousePressed(unpause);
  if(pressedKeys.Escape){
    unpause();
  }
}
