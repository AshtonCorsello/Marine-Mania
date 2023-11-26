const CANV_WIDTH = window.innerWidth; //originally 720
const CANV_HEIGHT = window.innerHeight; //originally 400
const CANV_AREA = CANV_HEIGHT * CANV_WIDTH;
const CANV_SCALAR = CANV_AREA/288000;

const MIN_ENMY_DELAY = 50; // least possible spawn delay for enemies in miliseconds
const STARTING_ENMY_DELAY = 1000;
const DELAY_DECR_MULT = 10; //how fast level progresses //dont use large number

const FPS_ON = true; //flag for toggling fps counter on and off

var mode = 0; // Stores weither the user has left the main menu
let loadTime = 3; // Stores the number of seconds to load
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  P5JS MAIN FUNCTIONS  //////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let player; // player object
let pressedKeys = {}; // Holding for the pressed keys
let enemies = []; // array to hold enemy objects
let projectiles = []; // array to hold projectile objects
let fpsCounter;
let energiesarray = [];// Array of shield energy cycles
let energies = 0;// Number of energy blocks
let enemyOn = new Boolean(true); // For use in debug. Defaults to true in normal mode. Will turn on or off enemy spawning.
var time = 0; // Playtime
var ShieldCT = 0; // Shield time
let gameOverFlag = false; // flag for being on game over screen
let gameStarted = false;

////// all SFX /////////////////////////////////////////////////
// background music, 321, go, wavesambiance, shield sounds    //
let mySound; let startSound1; let startSound2; let wavesSound;//
let shieldOnSound; let shieldOffSound;                        //
let cannonSounds = []; let enemyDieSounds = [];               // 
let gameOverSound; let startedAudio = false;                  //
////////////////////////////////////////////////////////////////

let mainMenu; // main menu gif
let level1; // level 1 gif

//name input
let nameInputFieldRef;
let nameInputLabelRef;
let nameInputFieldShown;
let currentName = "Anonymous";
let nameFieldHeight;
let nameFieldWidth;

//buttons are shown flags
let menuButtonsShown;
let gameoverButtonsShown;

//button references
let startButton;
let debugButton;
let pauseButton;
let leaderboardButton;
let retryButton;
let returntoMenuButton;
let button3;

let playerImg;

function preload() {
   //mySound = loadSound('./src/BeepBox-Song.wav'); // load music file
   mySound = loadSound('./src/SFX/bgm1.wav');  // alternative BGM choice.  comment, and uncomment the above line to get other back.
   mainMenu = loadImage('./src/mainMenu.gif'); // load main menu gif
   level1 = loadImage('./src/level1.gif'); // load level 1 gif
   gameover = loadImage('./src/gameover.png'); // load gameover file
   playerImg = loadImage('./src/img/boat1.0.png');
  countdownSound = loadSound('./src/SFX/start/321.wav');          // load 321 sound : bottom of GameInitialization()
  goSound = loadSound('./src/SFX/start/go.wav');                  // load go sound : bottom of GameInitialization()
  wavesSound = loadSound('./src/SFX/waves.wav');                  // load waves ambiance : bottom of GameInitialization()
  shieldOnSound = loadSound('./src/SFX/shield/shield-on.wav');    // load shieldon sound : in OpenShield()
  shieldOffSound = loadSound('./src/SFX/shield/shield-fail.wav'); // load shieldfail sound : in Shieldtime()
  gameOverSound = loadSound('./src/SFX/died.wav');                // load gameover sound : ~line161
  enemy1Image = loadImage("./src/img/enmy1.png");   
  enemy2Image = loadImage("./src/img/enemy2.png");                
  for (let i = 1; i <= 8; i++) {  // load sounds into array       // used in Projectile Class definition
    cannonSounds.push(loadSound('./src/SFX/cannon/cannon' + i + '.wav'));
  }
  for (let i = 1; i <= 8; i++) {  // load sounds into array       // used in projectile func hitEnemy()
    enemyDieSounds.push(loadSound('./src/SFX/enemy-die/exp' + i + '.wav'));
  }
}


function setup() {
    angleMode(DEGREES);
    createCanvas(CANV_WIDTH, CANV_HEIGHT);
    fill(240);
    noStroke();
    player = new Player(CANV_WIDTH/2,(CANV_HEIGHT - CANV_HEIGHT/16),7*CANV_SCALAR); // create a new player object
    enemy1 = new Enemy1()
    enemy2 = new Enemy2()
    fpsCounter = new FpsCounter();

    lastPrint = millis() - 1000;

    if(mousePressed && !startedAudio){
      userStartAudio();  // starts audio based on user mouse click
      startedAudio = true
    }

    //create the main menu buttons once
    startButton = createButton('Start Game'); // set text of button
    startButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/1.6); // set button position
    startButton.size(CANV_WIDTH/6, CANV_HEIGHT/20); // sets size of button
    startButton.mousePressed(GameInitialization);

    debugButton = createButton('Debug Room');
    debugButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/1.4); // set button position
    debugButton.size(CANV_WIDTH/6, CANV_HEIGHT/20); // sets size of button
    debugButton.mousePressed(Debug);

    TutorialButton = createButton('Tutorial');
    TutorialButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/1.8); // set button position
    TutorialButton.size(CANV_WIDTH/6, CANV_HEIGHT/20); // sets size of button
    TutorialButton.mousePressed(Tutorial);

    leaderboardButton = createButton('Leaderboard');
    leaderboardButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/1.25); 
    leaderboardButton.size(CANV_WIDTH/6, CANV_HEIGHT/20); 
    leaderboardButton.mousePressed(SwitchLeaderboardMode);  

    //create gameover buttons
    retryButton = createButton('Try Again?'); // set text of button
    retryButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/(1.3)); // set button position
    retryButton.size(CANV_WIDTH/6, CANV_HEIGHT/20); // sets size of button
    retryButton.mousePressed(RoundSetup);

    returntoMenuButton = createButton('Return to Main Menu'); // Sets the text of the button
    returntoMenuButton.position(CANV_WIDTH*(5/12), CANV_HEIGHT/(1.2)); // Sets the button position
    returntoMenuButton.size(CANV_WIDTH/6, CANV_HEIGHT/18); // Sets the size of the button
    returntoMenuButton.mousePressed(returntoMenu); // Calls the return to menu function

    initNameInputField(); //create the input field element

    //disabled buttons and input field to start
    HideMenuButtons(); 
    HideGameoverButtons();
}


function draw() {
    if(mode == 0){ // Main menu
      background(mainMenu) // set the background to white
      textSize(32*CANV_SCALAR);
      textAlign(CENTER);

      //if buttons and input field are disabled, reenable them
      if(!menuButtonsShown) ShowMenuButtons();
      
      drawNameInputFieldLabel(); //draws label thats above input field for usernames

    }
    if(mode == 1 | mode == 5){ // Game has started
      if(isPaused() == true && isCurrentlyDead() == false){ // If the game is paused display the pause menu
        pauseDisplay();
      }
      else if(isPaused() == true && isCurrentlyDead() == true && isFirstDeath() == true){ // If the player has died for the first time display the on death minigame
        minigameDisplay();
      }
      else{
        let currentTime = int(millis()/1000) // Converts mil secs into seconds
        let countDown = loadTime - currentTime; // Amount of time passed
        var timeElapsed = millis() - lastPrint;
        if(countDown < 0){
          gameStarted = true;
          // Drawing the level
          background(level1); // set the background to the level 1 gif

          if (timeElapsed > 1000) {
            player.score++;
            lastPrint = millis();
          }

          if(pressedKeys.Escape){// Checks to see if the escape key was pressed to pause the game
            pause();
          }

          if(!player.isHit()){ // stops drawing the player if they get hit
            player.display(); // draw the player
            player.update()
          }

          if (player.level == 1 && player.score >= 100) ++player.level;

          let calcdDelay = STARTING_ENMY_DELAY - time * DELAY_DECR_MULT; // delay decreases over time
          let enemySpawnDelay = (calcdDelay > MIN_ENMY_DELAY) ? calcdDelay : MIN_ENMY_DELAY;
          enemy1.showcase(enemySpawnDelay); //update, draw, and spawn enemies

          if (player.level >= 2) {
            enemy2.showcase(enemySpawnDelay+2); 
          }

          //Draws rectangle for score and time (AFTER DRAWING ENEMIES)
          fill('rgb(173, 216, 230)');// determines the color of the rectangle
          rect(0,0,CANV_WIDTH*2, CANV_HEIGHT/4.8);// Used to block out the background for the score



          //update and draw any projectiles
          for(let i = 0; i < projectiles.length; ++i){
            projectiles[i].showcase();
          }

          if (energies > 0 && player.shield == false && button3 == null){// Start shield button is displayed when the number of energy blocks is greater than 1
            button3 = createButton('Shield');
            button3.position(CANV_WIDTH*(65/72), CANV_HEIGHT*(21/36)); // set button position
            button3.size(CANV_WIDTH*(55/720), CANV_HEIGHT/10); // sets size of button
            button3.mousePressed(OpenShield);
          }

          if(energies > 0 && keyCode == SHIFT){
            OpenShield();
          }

          gameUI();
          displayShieldInfo();


          if(mode == 5){// Invincible Mode
              for (let enmy of enemies){ // Shield Mode checks each enemy for collision
                if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size))
                  player.setHitFalse();
              }
            }else{
              for (let enmy of enemies){                     // checks each enemy for collision
                if (intersect(player.x, player.y, player.size-5, enmy.posX, enmy.posY, enmy.size)){
                  player.setHitTrue();
                  if(energies > 0 && player.shield == false && button3 != null){// Death removes shield button if present
                    button3.remove();
                    button3 = null;
                  }

                  gameOverSound.play(0, 0.5, 4);             // play gameover sound
                  if(isFirstDeath() == false){ // If this isn't the player's first time dying, gameover
                    changeMode(9);
                  }
                  else{ // If this is the player's first time dying, pause and display the on death minigame
                    currentDead = true;
                    pause();
                  }
                }
              }
            }

            //collision between player projectile and enemies
            //create a standalone function for this
            checkProjectileHit();

          }
          else{
            // Draws the countdown
            background(0, 204, 255) // Used to remove text, Title
            textSize(20*CANV_SCALAR);
            fill(0, 0, 0);
            text("The game will start in: " + countDown, CANV_WIDTH/2, CANV_HEIGHT/3);
          }

        }
      }
    if(mode == 2){ // debug room implementation
      DebugDraw();
    }
    if(mode == 3){ //leaderboard mode
      DrawLeaderboard();
    }
    if(mode == 9){ // Game Over Screen
      GameOver();
    } 

    if(mode == 10){
      Tutorial();
    }

  //fps counter stuff
  if(FPS_ON && isPaused() == false){
    if(fpsCounter.readyToUpdate())
      fpsCounter.update();

    fpsCounter.draw();
  }

  //hides or shows name input field
  if(mode == 0 && !nameInputFieldShown){
    nameInputFieldRef.show();
    nameInputFieldShown = true;
  }else if(mode != 0 && nameInputFieldShown){
    nameInputFieldRef.hide();
    nameInputFieldShown = false;
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////           function          ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GameInitialization(){ // initialization
        HideMenuButtons(); //hide buttons and input field on game start

        //could make retry initializations in a separate function and do them depending on a flag
        RoundSetup(); // done, it was required for sound reasons. but i dont think we need a flag - mike A

        if(mode != 1)
          mode = 1;                 // change mode at the end to ensure all this code is processed before the code in draw:mode1 is ran.
                                  // eg, LoadTime is uninitialized until 3 lines above here, while it is being used 2 lines into draw():mode1

////// SFX-related  ////////////////////////////////////////////////
//                  
        if (!mySound.isPlaying()) {                                    
          mySound.loop(0, 1, 0.2);  
        }       
        if (!wavesSound.isPlaying()) {   // loop waves ambiance          //         
          wavesSound.loop(); 
        }     
                                                          //
////////////////////////////////////////////////////////////////////   
}        

// this function runs every time the rety button is clicked. it also runs with GameInitialization()
function RoundSetup(){

  if (gameOverFlag && gameoverButtonsShown)
    HideGameoverButtons();

  player.setHitFalse();             // draws player again when retrying
  currentTime = 0;                  // resets difficulty on retry
  enemies = [];                     // resets enemies on retry
  energies = 0;                     // initialization
  energiesarray = [];               // initialization
  player.score = 0;                 // resets score on retry
  time = 0;                         // resets game time
  player.level = 1;
  ShieldCT = 0;
  calcdDelay = STARTING_ENMY_DELAY; // resets enemy difficulty
  enemySpawnDelay = STARTING_ENMY_DELAY;
  death = true;
  setTimeout(gameOverFlag = false, 1500); // resets flag to false on retry. Timer prevents previous Gametime func from not being stopped
  setTimeout("shieldCounter = 0", 2000);
  player.x = CANV_WIDTH/2;
  player.y = (CANV_HEIGHT - CANV_HEIGHT/16);

  setTimeout(Gametime, 4000);       // start counting
  setTimeout(energie, 8000);        // start shield charge

  loadTime = 3;
  loadTime =  int(millis()/1000) + loadTime;// Sets the load time to be the loadtime + whenever the button was pressed

  countdownSound.play();    // countdown321 sfx            
  setTimeout(function() {                                  
      goSound.play();   // "go!" plays after 3.5 seconds   
  }, 3500); 

  if(mode != 1)
    mode = 1;
}

function GameOver(){ // Game over
      background(gameover); // sets the gameover image as the background
      fill(220, 250, 253);
      textSize(32*CANV_SCALAR);
      text('Score: ' + player.score, CANV_WIDTH/2, CANV_HEIGHT/1.5);// determines what is displayed, at what x,y

      gameOverFlag = true;

      if(!gameoverButtonsShown) ShowGameoverButtons();
}

function returntoMenu(){ // used to return to the main menu
  if(gameoverButtonsShown) HideGameoverButtons();
  changeMode(0);
}

function Gametime(){// Playtime
  time++;
  if(gameOverFlag == true) {return;} 
  setTimeout(Gametime, 1000);
}

function changeMode(i){
  mode = i;
}

function Debug(){
  if(menuButtonsShown) HideMenuButtons();
  changeMode(2);
}

function DebugDraw(){ //Draw function specifically for Debug menu (AKA Mode 2)
  background(145, 240, 243); //White background

  if(!player.isHit()){ // stops drawing the player if they get hit
    player.display(); // draw the player
    player.update();
  }

  //update and draw any projectiles
  for(let i = 0; i < projectiles.length; ++i){
    projectiles[i].showcase();
  }

  enemy1.showcase();

  if (keyCode === 49){
    if (enemyOn)
    {
      enemyOn = false;
    }
    else
    {
      enemyOn = true;
    }
  }
}

function DrawLeaderboard(){
  background(0, 204, 255)
  // Calculate font size based on a percentage of the canvas size
  const fontSize = min(width / 15, height / 50);

  // Draw title
  textAlign(CENTER, CENTER);
  textSize(fontSize * 1.5);
  fill(0);
  text("Leaderboard", width / 2, height * 0.1);

  // Draw scores
  textSize(fontSize);
  for (let i = 0; i < window.userScores.length; i++) {
    const username = window.userScores[i]['username'];
    const score = window.userScores[i]['score'];
    const entryText = `${i + 1}. ${username}: ${score}`;
    text(entryText, width / 2, height * 0.2 + i * fontSize * 1.5);
  }
}

//setup name input field
function initNameInputField(){
  nameFieldWidth = CANV_WIDTH * (1/6);
  nameFieldHeight = CANV_HEIGHT * (1/25);
  nameInputFieldRef = createInput(currentName);
  nameInputFieldRef.input(changeUsername);
  nameInputFieldRef.size(nameFieldWidth, nameFieldHeight);
  nameInputFieldRef.position(CANV_WIDTH / 2 - (nameFieldWidth / 2), CANV_HEIGHT * (11/12));
  nameInputFieldRef.elt.maxLength = 18; //18 characters max length of name
  nameInputFieldRef.style('font-size', `${nameFieldHeight * (7/8)}px`);
  nameInputFieldRef.hide();
  nameInputFieldShown = false;
}


//disables menu buttons and input field for usernames
function HideMenuButtons(){
    startButton.style('pointer-events', 'none');
    startButton.hide();

    debugButton.style('pointer-events', 'none');
    debugButton.hide();

    TutorialButton.style('pointer-events', 'none');
    TutorialButton.hide();

    leaderboardButton.style('pointer-events', 'none');
    leaderboardButton.hide();

    nameInputFieldRef.attribute('disabled', true);
    nameInputFieldRef.hide();

    menuButtonsShown = false;
}

//enables menu buttons and input field for username
function ShowMenuButtons(){
    startButton.style('pointer-events', 'auto');
    startButton.show();

    debugButton.style('pointer-events', 'auto');
    debugButton.show();

    TutorialButton.style('pointer-events', 'auto');
    TutorialButton.show();

    leaderboardButton.style('pointer-events', 'auto');
    leaderboardButton.show();

    nameInputFieldRef.removeAttribute('disabled');
    nameInputFieldRef.show();

    menuButtonsShown = true;
}

function HideGameoverButtons(){
    retryButton.style('pointer-events', 'none');
    retryButton.hide();

    returntoMenuButton.style('pointer-events', 'none');
    returntoMenuButton.hide();

    gameoverButtonsShown = false;
}

function ShowGameoverButtons(){
    retryButton.style('pointer-events', 'auto');
    retryButton.show();

    returntoMenuButton.style('pointer-events', 'auto');
    returntoMenuButton.show();

    gameoverButtonsShown = true;
}

//display username input field label
function drawNameInputFieldLabel(){
  let enterUserText = "[Enter Username]";
  let inputFieldPos = nameInputFieldRef.position();
  textSize(nameFieldHeight * (7/8));
  fill(0, 255, 0);
  text(enterUserText,  inputFieldPos.x + (nameFieldWidth / 2), inputFieldPos.y - 5);
}

function SwitchLeaderboardMode(){
  mode = 3;
  HideMenuButtons();
}

//callback function for when user types into text field
function changeUsername(){
  currentName = this.value();
}

function keyPressed(){
    pressedKeys[key] = true;
   if(keyCode === 32 && gameStarted){  // if spacebar is pressed && playing game
      if(!player.isHit()){
        projectiles.push(new Projectile(player.x, player.y+1));
      }
    }
}

function keyReleased(){
    delete pressedKeys[key];
}

//checks if two objects intersect using (x,y) and radius
function intersect(obj1X, obj1Y, obj1R, obj2X, obj2Y, obj2R){
    if (sqrt(pow((obj1X - obj2X),2) + pow((obj1Y - obj2Y),2)) < (obj1R + obj2R)) {return true;}
    else {return false;}
}

function checkProjectileHit() {
  for (let prjctl of projectiles){
    for (let enmy of enemies){
      if (intersect(prjctl.posX, prjctl.posY, prjctl.size, enmy.posX, enmy.posY, enmy.size)){
        enmy.hit = true;
        prjctl.hitEnemy(enmy);
      }
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function gameUI() {
  textSize(10*CANV_SCALAR);
  fill('black');
  stroke(0,0,0);
  text('Gametime: '+time+' sec',CANV_WIDTH/2,CANV_HEIGHT/20);// Show game time
  textAlign(LEFT);
  text('Score: ' + player.score, CANV_WIDTH/20, CANV_HEIGHT/20);// determines what is displayed, at what x,y
  text('Level: ' + player.level, CANV_WIDTH/20, CANV_HEIGHT/10); // ... 
  textAlign(CENTER);
}

//checks if two objects intersect using (x,y) and radius
function intersect(obj1X, obj1Y, obj1R, obj2X, obj2Y, obj2R){
    if (sqrt(pow((obj1X - obj2X),2) + pow((obj1Y - obj2Y),2)) < (obj1R + obj2R)) {return true;}
    else {return false;}
}

function mousePressed(){
  if(!player.isHit() && gameStarted) { // if playing game and not hit
    projectiles.push(new Projectile(mouseX, mouseY));
  }
}
