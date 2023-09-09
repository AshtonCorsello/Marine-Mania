const CANV_WIDTH = 720; 
const CANV_HEIGHT = 400;
var score = 0; // Used to keep track of player score
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  PLAYER CLASS AND FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Player {
    constructor(x, y, size) {
        this.x = x; // x position of the player
        this.y = y; // y position of the player
        this.size = size; // size of the player
    }
    display() { //Draws the player
        stroke(0,0,0); //Outline color
        fill(0,0,255); //Color of shape
        square(this.x, this.y, this.size) //Draws the shape
    }
}

function movePlayer(event) {
    if (event.keyCode == 37) { // left arrow
        player.x -= 10; // move the player left
        if (player.x < 0) { //Don't let the player go off the screen
            player.x = 0;
        }
    } else if (event.keyCode == 39) { // right arrow
        player.x += 10;
        if (player.x > CANV_WIDTH - player.size) {
            player.x = CANV_WIDTH - player.size;
        }
    } else if (event.keyCode == 38) { // up arrow
        player.y -= 10;
        if (player.y < (CANV_HEIGHT - (CANV_HEIGHT / 8))) { //Don't let the player go above 1/8 of the screen
            player.y = (CANV_HEIGHT - (CANV_HEIGHT / 8));
        }
    } else if (event.keyCode == 40) { // down arrow
        player.y += 10;
        if (player.y >= CANV_HEIGHT) {
            player.y = CANV_HEIGHT - player.size;
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////  P5JS MAIN FUNCTIONS  //////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let player; // player object

function setup() {
    createCanvas(CANV_WIDTH, CANV_HEIGHT);
    player = new Player(CANV_WIDTH/2,(CANV_HEIGHT - CANV_HEIGHT/16),10); // create a new player object
    document.addEventListener('keydown', movePlayer); // add event listener for key presses in order to move the player
}

function draw() {
    background(220); // set the background to white
    textSize(18); // determines size of font
    fill(51); // determines color of text
    text('Score: ' + score, 0, 15);// determines what is displayed, at what x,y
    player.display(); // draw the player
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
