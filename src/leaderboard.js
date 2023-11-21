class Leaderboard{

  constructor(){
    this.size = 25;
    
    //fill array with empty scores
    this.scores = Array(this.size).fill(0);
    this.usernames = Array(this.size).fill("None");
  }

  draw(){
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
    for (let i = 0; i < leaderboard.usernames.length; i++) {
      const username = leaderboard.usernames[i];
      const score = leaderboard.scores[i];
      const entryText = `${i + 1}. ${username}: ${score}`;
      text(entryText, width / 2, height * 0.2 + i * fontSize * 1.5);
    }
  }

}
