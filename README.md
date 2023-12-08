# Tic-Tac-Toe
# Tic Tac Toe Game Documentation

## Introduction

This documentation provides an overview of the implementation of a simple turn-based Tic Tac Toe game. The application is built using JavaScript and React, with a server-side component written in Node.js using Express. The game includes features such as a game creation screen, a list of games screen, and an actual game screen. Additionally, the application employs a basic AI component for the computer player using OpenAI's GPT (Generative Pre-trained Transformer). 

## Api Part

To run the application, you need to replace YOUR_API_KEY part with your key and YOUR_ASSISTANT_KEY with your assistant key. For the assistant, use the description below:

 Assistant Description: `You play tic-tac-toe very well Play the game to win, losing is shameful. We will play tic-tac-toe in array format like this: ["", "", "", "", "", "", "", "X", "",], ["", "", "", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", ""] If there are three X's in a row, column, or diagonally, indicating that X is about to win the game, prioritize preventing this. In addition, try to win the game by strategically placing O's, but remember that you can make at most 1 move.
In this way, we will have three different arrays. I'm asking you to make a move in place of whoever's turn it is and send it back to me. When you message me, don't write your own comments, just send the array. Do not change the filled parts in the array I send you. This mean do not change "X" parts place. To make move, just add your move to the empty parts and send it back to me.`
    


## Uncompleted Parts

Sometimes assistant is not working well and changing places of X and Y. In these times my win/lose functions is not working. Also when you refresh the page current game recording
as a draw. Beside the css, I narrowed my scope on bonus and backend parts.

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Components](#components)
    - [CreateGame](#create-game)
    - [NameEntry](#name-entry)
    - [TicTacToe](#tic-tac-toe)
3. [Server](#server)
4. [Usage](#usage)
5. [Bonus Features](#bonus-features)
6. [Conclusion](#conclusion)

app/
  frontend/
    src/
      components/
        CreateGame.js
        NameEntry.js
        TicTacToe.js
    styles/
        CreateGame.css
        NameEntry.css
        TicTacToe.css
  backend/
    src/
      server.js



## Components

### CreateGame

- **Purpose**: This component is responsible for allowing the user to create a new Tic Tac Toe game. It includes functionalities for setting the board size and background color, displaying game history, and initiating the game.

- **Props**:
  - `onGameCreated`: Callback function triggered when a game is created.
  - `onBgColorChange`: Callback function triggered when the background color is changed.

- **State**:
  - `boardSize`: Represents the size of the game board.
  - `bgColor`: Represents the background color of the game board.
  - `gameHistory`: Keeps track of the history of created games.
  - `gameCreated`: Indicates whether a game has been created.

- **Methods**:
  - `handleBoardSizeChange`: Handles the change in board size.
  - `handleBgColorChange`: Handles the change in background color.
  - `handleCreateGameClick`: Handles the click event to create a new game.

### NameEntry

- **Purpose**: This component handles user name entry before accessing the list of games. It ensures that the user enters a name before proceeding.

- **Props**:
  - `onNameEntered`: Callback function triggered when the user enters a name.

- **State**:
  - `name`: Represents the user's name.

- **Methods**:
  - `handleNameChange`: Handles the change in the user's name.
  - `handleEnterClick`: Handles the click event after the user enters their name.

### TicTacToe

- **Purpose**: Represents the actual Tic Tac Toe game board. It handles player moves, updates the board, checks for a winner or draw, and communicates with the GPT-based AI for the computer player.

- **Props**:
  - `bgColor`: Represents the background color of the game board.
  - `boardSize`: Represents the size of the game board.

- **State**:
  - `initialBoard`: Represents the initial state of the game board.
  - `board`: Represents the current state of the game board.
  - `currentPlayer`: Represents the current player ('X' or 'O').
  - `gameOver`: Indicates whether the game is over.
  - `winner`: Represents the winner of the game.
  - `currentTurn`: Represents the current turn ('X' or 'O').
  - `gameHistory`: Keeps track of the history of completed games.

- **Methods**:
  - `handleSquareClick`: Handles the click event when a player makes a move.
  - `calculateWinner`: Checks for a winner or draw.
  - `renderSquare`: Renders an individual square on the game board.

### Server

- **Purpose**: The server-side component handles communication with the GPT-based AI to make moves for the computer player. It utilizes Express for routing and communication with the OpenAI API.

- **Dependencies**:
  - `express`: Web application framework for Node.js.
  - `body-parser`: Middleware to parse incoming request bodies.
  - `dotenv`: Loads environment variables from a .env file.
  - `openai`: Official OpenAI API wrapper.
  - `cors`: Middleware to enable Cross-Origin Resource Sharing.

## Usage

1. Clone the repository.
2. Install dependencies using `npm install` in both the root directory and the `src` directory.
3. Start the server using `node src/server.js`.
4. Run the React app using `npm start` in the root directory.
5. Access the application in a web browser.

## Bonus Features

- The implementation includes a basic AI component using OpenAI for the computer player.
- The CreateGame component allows users to select a custom grid size (more than 3 columns and 3 rows).

## Conclusion

This Tic Tac Toe application fulfills the specified requirements, providing a simple and enjoyable turn-based game experience. The code is structured to be clean, understandable, and maintainable. The use of React, Node.js, and OpenAI enhances the functionality and user experience. The implementation of bonus features adds extra value to the application.


