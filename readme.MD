# Marine Mania

## Overview
This game project, developed as part of a software engineering course, is a simulation-based game created using p5.js. It involves a player-controlled boat shooting enemies, earning points, and advancing levels.

### State Design Pattern Implementation
The game utilizes the State design pattern to manage various states throughout the gameplay. This pattern facilitates seamless transitions between menu, gameplay, and level progression, encapsulating specific behaviors for each state.

#### State Management
The game encompasses several states:
- **Menu State:** Controls the initial menu display and user interactions.
- **Gameplay State:** Manages core game mechanics, player controls, scoring, and shield functionalities.
- **Level Transition State:** Handles transitions between levels upon reaching a score threshold.

#### State Transition
Transitions between states are orchestrated by a centralized state manager, responding to user interactions and game conditions.

#### State-specific Behavior
Each state is contained within specific classes, managing their distinct behavior and functionalities.

## Setup and Installation
To run the game:
1. Clone the repository.
2. Open the game in Visual Studio Code.
3. Use the Live Server extension in Visual Studio Code to launch the game.

Controls:
- Use `W`, `A`, `S`, `D` keys to control the boat's movements.
- Click the tutorial button on the main menu for an interactive tutorial.

## Enjoy the Game!
We hope you enjoy playing this simulation-based game. Have fun navigating the boat, shooting enemies, and advancing levels!

Feel free to explore, contribute, or provide feedback. Happy gaming!
