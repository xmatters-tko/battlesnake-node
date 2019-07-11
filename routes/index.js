var express = require('express');
var router  = express.Router();

const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
 console.log(req.body)
  // Response data
  var data = {
    color: "#ff00ee",
    name: "Solid",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Wakey wakey!", // optional, but encouraged!
    HeadType: 'bendr',
    TailType: 'block-bum'
  }

  return res.json(data)
})

function isNextWall(intendedMove, mySnake, body) {
    //if()
    return false;
}

let moves = ['left','up','down','right'];

function randomMove(exclude) {
    let move = moves[getRandomInt(4)];
    if (move === exclude) {
        randomMove(exclude);
    }
}

function getCheckMove() {

}

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  console.log(req.body);
  const mySnake = getMySnake(gameState);
   let move = '';
   const intendedMove = findFood(mySnake, req.body);
   // TODO implement function that runs all validation functions here.
   const { moveAllowed, oppositeDirection } = isSelfThere(mySnake, intendedMove);
   move = moveAllowed ? intendedMove : oppositeDirection;

   if (isNextWall(intendedMove,mySnake,req.body)) {

   }

  // Response data
  var data = {
    move: move, // one of: ['up','down','left','right']
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})
function getMySnake(gameState){
  return getSnake(gameState,gameState.you)
}
function getSnake(gameState, id){
  let snake = gameState.snakes.find(snake => snake.id === id )
  return snake;
}
function findFood(mySnake, gameState) {
  let head = mySnake.coords[0];
        if (gameState.food[0][0] < head[0]) {
            move = LEFT;
        }

        if (gameState.food[0][0] > head[0]) {
          move = RIGHT;
        }

        if (gameState.food[0][1] < head[1]) {
          move = UP;
        }

        if (gameState.food[0][1] > head[1]) {
          move = DOWN;
        }
        return move ;
}

function isSelfThere(mySnake, intendedMove) {
  let moveAllowed = true;
  let oppositeDirection = '';
  const body = mySnake.coords;
  const head = body[0];
  let destinationCoord;
  switch (intendedMove) {
    case LEFT:
      destinationCoord = [(head[0] - 1), head[1]];
      const [destX, destY] = destinationCoord;
      body.forEach(part => {
        const [partX, partY] = part;
        if (destX === partX && destY === partY) {
          moveAllowed = false;
          oppositeDirection = RIGHT;
        }
      });
      break;
    case RIGHT:
      destinationCoord = [(head[0] + 1), head[1]];
      const [destX, destY] = destinationCoord;
      if (destX === partX && destY === partY) {
        moveAllowed = false;
        oppositeDirection = LEFT;
      }
      break;
    case UP:
      destinationCoord = [head[0], (head[1] + 1)];
      const [destX, destY] = destinationCoord;
      if (destX === partX && destY === partY) {
        moveAllowed = false;
        oppositeDirection = DOWN;
      }
      break;
    case DOWN:
      destinationCoord = [head[0], (head[1] - 1)];
      const [destX, destY] = destinationCoord;
      if (destX === partX && destY === partY) {
        moveAllowed = false;
        oppositeDirection = UP;
      }
      break;
    default:
      break;
  }
  return { moveAllowed, oppositeDirection };
}



module.exports = router
