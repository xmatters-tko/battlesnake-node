var express = require('express');
var router  = express.Router();




// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
 console.log(req.body)
  // Response data
  var data = {
    color: "#6a6676",
    name: "Popped Collars 4 Life",
    head_url: "ttps://upload.wikimedia.org/wikipedia/commons/5/5e/Enl_popped.jpg", // optional, but encouraged!
    taunt: "You don't know me!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  var moves = {};
  // NOTE: Do something here to generate your move
   //console.log(req.body)
   let move = findFood(req.body);
   let availableMoves = getAvailableMoves(req.body);
   let taunt = 'Outta my way, snake!';
   if (!availableMoves[move]) {
      taunt = 'Food is too hard to find.';
      if (availableMoves['up']) {
        move = 'up';
      } else if (availableMoves['left']) {
        move = 'left';
      } else if (availableMoves['down']) {
        move = 'down';
      } else {
        move = 'right';
      }
   }

  // Response data
  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt, // optional, but encouraged!
  }

  return res.json(data)
});

function getAvailableMoves(gameState) {
  let mySnake = getMySnake(gameState);
  let headX = mySnake.coords[0][0];
  let headY = mySnake.coords[0][1];
  let maxHeight = gameState.height;
  let maxWidth = gameState.width;
  let occupiedCoords = [];
  snakes.each(snake => occupiedCoords.concat(snake.coords));
  
  return {
    'left': (headX > 0) && isCoordOccupied(headX - 1, headY, occupiedCoords),
    'up': (headY > 0) && isCoordOccupied(headX, headY + 1, occupiedCoords),
    'right': (headX < maxWidth) && isCoordOccupied(headX + 1, headY, occupiedCoords),
    'down': (headY < maxHeight) && isCoordOccupied(headX, headY + 1, occupiedCoords),
  };
}

function isCoordOccupied(x, y, coords) {
  return coords.find(coord => coord[0] === x && coord[1] === y);
}

function getMySnake(gameState){
  return getSnake(gameState,gameState.you)
}
function getSnake(gameState, id){
  let snake = gameState.snakes.find(snake => snake.id === id )
  return snake;
}
function findFood(gameState) {

  let mySnake = getMySnake(gameState) 
  let head = mySnake.coords[0];
        if (gameState.food[0][0] < head[0]) {
            move = "left"
        }

        if (gameState.food[0][0] > head[0]) {
          move = "right"
        }

        if (gameState.food[0][1] < head[1]) {
          move = "up"
        }

        if (gameState.food[0][1] > head[1]) {
          move = "down"
        }
        return move;
}

module.exports = router;
