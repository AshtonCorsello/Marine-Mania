
var pausedTime = 0;
var paused = false;
var pauseScore = 0;
var pausedShieldCells = 0;
var pausedEnergy = 0;
var pausedShieldCD = 0;
var pausedEnergyArray = [];
var pausedEnemies1 = [];
var pausedProjectiles = [];

function isPaused(){
  return paused;
}
  
function pause(){
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

 function unpause(){
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

function pauseDisplay(){
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
