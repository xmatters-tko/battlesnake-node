var express = require('express');
var router  = express.Router();

var snakeCounter = 1;

const SOLO_MODE = 'SOLO';
const H2H_MODE = 'H2H';
const BR_MODE = 'BR';


// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
 console.log(req.body)
  // Response data
  var data = {
    color: "#6a6676",
    name: "Popped Collars 4 Life" + snakeCounter++,
    head_url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Enl_popped.jpg", // optional, but encouraged!
    taunt: "You don't know me!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  var moves = {};
  // NOTE: Do something here to generate your move
   //console.log(req.body)
   
   var gameState = req.body;

   let taunt = 'Me so hungry!';
   let mySnake = getMySnake(gameState);
   console.log("Turn for " + mySnake.name + ": " + gameState.turn);

   var numSnakes = gameState.snakes.length;
   let mode;
   if (numSnakes === 1) {
    console.log('SOLO MODE');
    mode = SOLO_MODE;
   } else if (numSnakes === 2) {
    console.log('HEAD-TO-HEAD MODE');
    mode = H2H_MODE;
   } else {
    console.log('BATTLE_ROYALE MODE');
    mode = BR_MODE;
   }

   let availableMoves = getMyAvailableMoves(gameState);
   console.log("availableMoves: " + JSON.stringify(availableMoves));

   let foodTarget = gameState.food[0];
   if (H2H_MODE) {
    var opponent = getOtherSnake(gameState);
    if (mySnake.coords.length > opponent.coords.length) {
      taunt = 'You look like food, ' + opponent.name;
      foodTarget = opponent.coords[0];
      var opponentMoves = getAvailableMoves(gameState, opponent);
      if (opponentMoves['up']) {
        foodTarget = getNewCoords(opponent.coords, 'up');
        taunt += ' and I think you are going up.';
      } else if (opponentMoves['left']) {
        foodTarget = getNewCoords(opponent.coords, 'left');
        taunt += ' and I think you are going left.';
      } else if (opponentMoves['down']) {
        foodTarget = getNewCoords(opponent.coords, 'down');
        taunt += ' and I think you are going down.';
      } else if (opponentMoves['right']) {
        foodTarget = getNewCoords(opponent.coords, 'right');
        taunt += ' and I think you are going right.';
      } else {
        taunt += ' and I think you are doomed.';
      }
    }
   }

   let move = findPathTo(gameState, foodTarget, availableMoves);
  
   if (!availableMoves[move]) {
      taunt = 'Food is too hard to find.';
      if (availableMoves['up']) {
        move = 'up';
      } else if (availableMoves['left']) {
        move = 'left';
      } else if (availableMoves['down']) {
        move = 'down';
      } else if (availableMoves['right']) {
        move = 'right';
      }
   }
   if (!move) {
    move = 'up';
    taunt = 'goodbye cruel world';
   }

  // Response data
  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt, // optional, but encouraged!
  }

  return res.json(data)
});

function getNewCoords(oldCoords, direction) {
    var newCoords = [].concat(oldCoords);
    if (direction === 'up') {
      newCoords[1] = newCoords[1] - 1;
    } else if (direction === 'left') {
      newCoords[0] = newCoords[0] - 1;
    } else if (direction === 'down') {
      newCoords[1] = newCoords[1] + 1;
    } else if (direction === 'right') {
      newCoords[0] = newCoords[0] + 1;
    }
    return newCoords;
}

function getMyAvailableMoves(gameState) {
  let mySnake = getMySnake(gameState);
  return getAvailableMoves(gameState, mySnake);
}

function getAvailableMoves(gameState, snake) {
  let headX = snake.coords[0];
  let headY = snake.coords[1];
  let maxHeight = gameState.height;
  let maxWidth = gameState.width;
  let occupiedCoords = [];
  console.log("snake.coords: " + JSON.stringify(snake.coords));
  gameState.snakes.forEach(snake => {
    //console.log("snake.coords: " + JSON.stringify(snake.coords));
    occupiedCoords = occupiedCoords.concat(snake.coords)
  });
  
  //console.log("occupiedCoords: " + JSON.stringify(occupiedCoords));
  return {
    'left': (headX > 0) && !isCoordOccupied(headX - 1, headY, occupiedCoords),
    'up': (headY > 0) && !isCoordOccupied(headX, headY - 1, occupiedCoords),
    'right': (headX < maxWidth - 1) && !isCoordOccupied(headX + 1, headY, occupiedCoords),
    'down': (headY < maxHeight - 1) && !isCoordOccupied(headX, headY + 1, occupiedCoords),
  };
}

function isCoordOccupied(x, y, coords) {
  return coords.find(coord => coord[0] === x && coord[1] === y);
}

function getMySnake(gameState){
  return getSnake(gameState,gameState.you)
}

function getOtherSnake(gameState){
  const myId = gameState.you;
  let snake = gameState.snakes.find(snake => snake.id !== myId )
  return snake;
  }

function getSnake(gameState, id){
  let snake = gameState.snakes.find(snake => snake.id === id )
  return snake;
}
function findPathTo(gameState, foodTargetCoords, availableMoves) {

  let mySnake = getMySnake(gameState) 
  let head = mySnake.coords[0];
  if (foodTargetCoords[0] < head[0] && availableMoves['left']) {
      move = "left"
  }

  if (foodTargetCoords[0] > head[0] && availableMoves['right']) {
    move = "right"
  }

  if (foodTargetCoords[1] < head[1] && availableMoves['up']) {
    move = "up"
  }

  if (foodTargetCoords[1] > head[1] && availableMoves['down']) {
    move = "down"
  }
  return move;
}

module.exports = router;
