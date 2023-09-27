
class FpsCounter {
  
  yOffset = -20;
  xOffset = -20;

  updateDelay = 500; // time between updating/drawing fps 

  constructor(){
    this.currentTime = 0;
    this.currentFPS = 0;
    this.textContent = "0";
    this.fontSize = height / 20;
    textSize(this.fontSize);

    this.posX = width - textWidth(this.textContent) + this.xOffset;
    this.posY = height - this.fontSize + this.yOffset; 

    fill(10, 247, 65); //start as green

    text(this.textContent, this.posX, this.posY);
    this.lastUpdated = millis();
  }

  update(){
    this.currentFPS = Math.round(frameRate()); 
    this.textContent = `${this.currentFPS}`;
    //update posX in case textContent got longer 
    this.posX = width - textWidth(this.textContent) + this.xOffset;

    this.lastUpdated = millis();
  }

  draw(){
    //update the text color depending on current fps
    if(this.currentFPS >= 45) {
      fill(10, 247, 65); //green if good fps
    }
    else if(this.currentFPS < 45 && this.currentFPS >= 30) {
      fill('Yellow'); //yellow if 30-44 fps
    }
    else{ //fps is < 30
      fill('Red');
    }

    textSize(this.fontSize);
    text(this.textContent, this.posX, this.posY);
  }

  readyToUpdate(){
    this.currentTime = millis();
    return (this.currentTime - this.lastUpdated) > this.updateDelay;
  }

}

