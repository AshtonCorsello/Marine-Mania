var x = 0;

function Tutorial(){
      mode = 10;
      removeElements(startButton, debugButton, TutorialButton);
      background(0, 204, 255); // set the background to blue
      textSize(32*CANV_SCALAR);
      textAlign(CENTER); 
      button_Back = createButton('Back'); // set text of button
      button_Back.position(CANV_WIDTH*(25/720), CANV_HEIGHT*(8/400)); // set button position
      button_Back.size(CANV_WIDTH/6, CANV_HEIGHT/20); // sets size of button
      button_Back.mousePressed(back);
      player.display(); // draw the player
      player.update();
  if(player.shield == false){ //on shield
    button1 = createButton('Shield');
    button1.position(CANV_WIDTH*(65/72), CANV_HEIGHT*(21/40)); // set button position
    button1.size(CANV_WIDTH*(55/720), CANV_HEIGHT/10); // sets size of button
    button1.mousePressed(onShield);
  }
  if(player.shield == false && keyCode == SHIFT){ //shift on shield
    onShield();
  }
  if(player.shield == true){ //off shield 
    button2 = createButton('Off Shield');
    button2.position(CANV_WIDTH*(65/72), CANV_HEIGHT*(21/40)); // set button position
    button2.size(CANV_WIDTH*(55/720), CANV_HEIGHT/10); // sets size of button
    button2.mousePressed(offShield);
  }
  projectile1.showcase();
  stroke(58, 127, 214);
   fill(205, 205, 205);
   rect(CANV_WIDTH*(677/720), CANV_HEIGHT*(116/400), CANV_WIDTH*(30/720), CANV_HEIGHT*(176/400), 5);
  for(var i = 0; i < 10; i++){
          stroke(0,0,0);
          fill(255, 156, 51);
          rect(CANV_WIDTH*(677/720), CANV_HEIGHT*(37/400)+i*CANV_HEIGHT*(17/400), CANV_WIDTH*(30/720), CANV_HEIGHT*(15/400), 20);
        }
  textSize(10*CANV_SCALAR);
  fill(0);
      text('Shields can be triggered using ', CANV_WIDTH*(500/720), CANV_HEIGHT*(20/400));
      text('a click on the right shield ', CANV_WIDTH*(500/720), CANV_HEIGHT*(40/400));
      text('button or shield button or by ', CANV_WIDTH*(500/720), CANV_HEIGHT*(60/400));
      text('pressing shift on your keyboard', CANV_WIDTH*(500/720), CANV_HEIGHT*(80/400));
      text('Each energy block = 5sec shield ', CANV_WIDTH*(500/720), CANV_HEIGHT*(100/400));
      text(' ', CANV_WIDTH*(500/720), CANV_HEIGHT*(120/400));
      text('Kill Enemy by pressing mouse ', CANV_WIDTH*(500/720), CANV_HEIGHT*(140/400));
      text('Equals 5 additional points', CANV_WIDTH*(500/720), CANV_HEIGHT*(160/400));
      text('"W" "A" "S" "D" ', CANV_WIDTH*(150/720), CANV_HEIGHT*(340/400));
      text('control the boat movement ', CANV_WIDTH*(170/720), CANV_HEIGHT*(360/400));
      text('(or arrow keys)', CANV_WIDTH*(170/720), CANV_HEIGHT*(380/400));
      Button();
}
function onShield(){
  removeElements(button1);
  player.shield = true;
}

function offShield(){
  removeElements(button2);
  player.shield = false;
}

function back(){ //back
  removeElements(button_Back);
  player.shield = false;
  mode = 0;
}

function Button(){ //Print 3d WASD buttons
  if(keyIsPressed == true && key == 'a') {
    fill(150);
    rect(CANV_WIDTH*(100/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    textSize(30);
    stroke(0,0,0);
    fill(0);
    text('A',CANV_WIDTH*(100/720), CANV_HEIGHT*(300/400))
  }else{
    fill(150);
    rect(CANV_WIDTH*(100/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    fill(225);
    rect(CANV_WIDTH*(97/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('A',CANV_WIDTH*(97/720), CANV_HEIGHT*(300/400))
  }
  if(keyIsPressed == true && key == 's') {
    fill(150);
    rect(CANV_WIDTH*(155/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    textSize(30);
    fill(0);
    text('S',CANV_WIDTH*(155/720), CANV_HEIGHT*(300/400))
  }else{
    fill(150);
    rect(CANV_WIDTH*(155/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    fill(225);
    rect(CANV_WIDTH*(152/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('S',CANV_WIDTH*(152/720), CANV_HEIGHT*(300/400))
  }
  if(keyIsPressed == true && key == 'd') {
    fill(150);
    rect(CANV_WIDTH*(210/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    textSize(30);
    fill(0);
    text('D',CANV_WIDTH*(212/720), CANV_HEIGHT*(300/400))
  }else{
    fill(150);
    rect(CANV_WIDTH*(210/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    fill(225);
    rect(CANV_WIDTH*(207/720), CANV_HEIGHT*(300/400), 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('D',CANV_WIDTH*(207/720), CANV_HEIGHT*(300/400))
  }
  if(keyIsPressed == true && key == 'w') {
    fill(150);
    rect(CANV_WIDTH*(155/720), CANV_HEIGHT*(250/400), 55, 55, 20);
    textSize(30);
    fill(0);
    text('W',CANV_WIDTH*(156/720), CANV_HEIGHT*(250/400))
  }else{
    fill(150);
    rect(CANV_WIDTH*(155/720), CANV_HEIGHT*(250/400), 55, 55, 20);
    fill(225);
    rect(CANV_WIDTH*(152/720), CANV_HEIGHT*(250/400), 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('W',CANV_WIDTH*(151/720), CANV_HEIGHT*(250/400))
  }
}