var x = 0;

function Tutorial(){
      removeElements(button1,button2);
      background(0, 204, 255) // set the background to blue
      textSize(32);
      text('Newbie Tutorial', 250, 50); 
      button_Back = createButton('Back'); // set text of button
      button_Back.position(50, 20); // set button position
      button_Back.size(50, 20); // sets size of button
      player.display(); // draw the player
      player.update();
  if(prop == false){
      button1 = createButton('Shield');
      button1.position(650, 210); // set button position
      button1.size(55, 40); 
  }
  if(prop == true){
      button2 = createButton('Off Shield');
      button2.position(650, 250); // set button position
      button2.size(55, 40);
  }
  projectile1.showcase();
  for(var i = 0; i < 10; i++){
          stroke(0,0,0);
          fill(255, 156, 51);
          rect(677, 40+i*17, 30, 15, 20);
        }
  textSize(20);
  fill(0);
      text('Shields can be triggered using ', 350, 95);
      text('a click on the right shield ', 350, 120);
      text('button or shield button or by ', 350, 145);
      text('pressing shift on your keyboard', 350, 170);
      text('Each energy block = 5sec shield ', 350, 195);
      text('"W" "A" "S" "D" ', 75, 170);
      text('to control the boat movement ', 40, 195);
      Button();
  if(mouseX >= 650 && mouseX <= 705 && mouseY >= 210 && mouseY <= 250 && mouseIsPressed == true||keyCode == SHIFT){
    removeElements(button1);
    prop = true;
  }
  if(mouseX >= 650 && mouseX <= 705 && mouseY >= 250 && mouseY <= 290 && mouseIsPressed == true){
    removeElements(button2);
    prop = false;
  }
  if(mouseX >= 50 && mouseX <= 100 && mouseY >= 20 && mouseY <= 40 && mouseIsPressed == true){
    removeElements(button_Back,button1,button2);
    mode = 0;
  }
}

function Button(){
  if(keyIsPressed == true && key == 'a') {
    fill(150);
    rect(100, 120, 55, 55, 20);
    textSize(30);
    stroke(0,0,0);
    fill(0);
    text('A',90, 130)
  }else{
    fill(150);
    rect(100, 120, 55, 55, 20);
    fill(225);
    rect(97, 123, 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('A',87, 133)
  }
  if(keyIsPressed == true && key == 's') {
    fill(150);
    rect(155, 120, 55, 55, 20);
    textSize(30);
    fill(0);
    text('S',145, 130)
  }else{
    fill(150);
    rect(155, 120, 55, 55, 20);
    fill(225);
    rect(152, 123, 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('S',142, 133)
  }
  if(keyIsPressed == true && key == 'd') {
    fill(150);
    rect(210, 120, 55, 55, 20);
    textSize(30);
    fill(0);
    text('D',200, 130)
  }else{
    fill(150);
    rect(210, 120, 55, 55, 20);
    fill(225);
    rect(207, 123, 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('D',195, 133)
  }
  if(keyIsPressed == true && key == 'w') {
    fill(150);
    rect(155, 65, 55, 55, 20);
    textSize(30);
    fill(0);
    text('W',141, 78)
  }else{
    fill(150);
    rect(155, 65, 55, 55, 20);
    fill(225);
    rect(152, 68, 55, 55, 20);
    stroke(0,0,0);
    textSize(30);
    fill(0);
    text('W',138, 81)
  }
}