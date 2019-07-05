var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game
 console.log(req.body)
  // Response data
  var data = {
    color: "#DFFF00",
    name: "ContraSnake",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "I won't run into walls and i am made of javascript", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
   //console.log(req.body)
   let move = findFood(req.body)
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
        return move ;
}
module.exports = router
