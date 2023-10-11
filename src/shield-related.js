/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  SHIELD FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function energie(){// Generate an energy block every 5 seconds
  if(energies<10 && prop == false){
    energiesarray[energies] = 40+energies*17;
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
 
 //Draws Shield
 if(prop == true){
   stroke(58, 214, 134);
   fill(255, 255, 255);
   rect(this.x, this.y, this.size*3, this.size*6, 20); 
   textSize(10*CANV_SCALAR);
   text('Shield time: '+(ShieldCT+1)+' sec',CANV_WIDTH*(60/72),CANV_HEIGHT/20); // Shield time
 }
}
