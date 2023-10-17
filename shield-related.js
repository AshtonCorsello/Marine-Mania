/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  SHIELD FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function energie(){// Generate an energy block every 5 seconds
  if(energies<10 && prop == false){
    energiesarray[energies] = CANV_HEIGHT*(37/400)+energies*CANV_HEIGHT*(17/400);
    energies++;
    ShieldCT = ShieldCT + 5;
    setTimeout(energie, 5000);
  }
}

function Shieldtime(){// Turns off invincibility mode at the end of the energy shield's duration and changes the shield's state
  player.display(prop = false);
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
  player.display(prop = true);// Change shield status and display shield
  mode = 5; //Toggle Invincible Mode
  ShieldCountdown();// Shield Countdown
  setTimeout(Shieldtime, 5000*(energies));// Shield Duration
  energies = 0;// Empty energy
  energiesarray = [];// Empty energy
}
