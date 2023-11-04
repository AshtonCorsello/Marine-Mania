/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  SHIELD FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let shieldCounter = 0;
function energie(){// Generate an energy block every 5 seconds
  if(energies<10 && player.shield == false){

    ++shieldCounter; //done so the game over check can be done per second
    if (shieldCounter >= 5) energiesarray[energies] = CANV_HEIGHT*(37/400)+energies*CANV_HEIGHT*(17/400);
    if (shieldCounter >= 5) ShieldCT = ShieldCT + 5;
    if (shieldCounter >= 5) {energies++; shieldCounter = 0;}

    // end if game ends for retry
    if (gameOverFlag) return;
    setTimeout(energie, 1000);
  }
}

function Shieldtime(){// Turns off invincibility mode at the end of the energy shield's duration and changes the shield's state
  player.shield = false
  shieldOffSound.play(0, 1, 3);
  player.display();
  mode = 1;
  setTimeout(energie, 5000);
}

function ShieldCountdown(){ //Shield Countdown
  if(ShieldCT > 0){
    ShieldCT--;
    setTimeout(ShieldCountdown, 1000)
  }  
}

function OpenShield(){ //  Open Shield
  removeElements(button3); // Disable Shield Button
  player.shield = true
  shieldOnSound.play();    // play sfx for shield on
  player.display();// Change shield status and display shield
  mode = 5; //Toggle Invincible Mode
  ShieldCountdown();// Shield Countdown
  setTimeout(Shieldtime, 5000*(energies));// Shield Duration
  energies = 0;// Empty energy
  energiesarray = [];// Empty energy
}

function displayShieldInfo() {
   //Draws energy tanks
   stroke(58, 127, 214);
   fill(205, 205, 205);
   rect(CANV_WIDTH*(677/720), CANV_HEIGHT*(116/400), CANV_WIDTH*(30/720), CANV_HEIGHT*(176/400), 5);
 
 // Draws Energy Blocks
   for(var i = 0; i < 10; i++){
     stroke(0,0,0);
     fill(255, 156, 51);
     rect(CANV_WIDTH*(677/720), energiesarray[i], CANV_WIDTH*(30/720), CANV_HEIGHT*(15/400), 20);
   }
 
}
