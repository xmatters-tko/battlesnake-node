# battlesnake-nodejs

A simple [BattleSnake AI](http://battlesnake.io) written for NodeJS.

To get started you'll need a working NodeJS development environment, and at least read the Heroku docs on [deploying a NodeJS app](https://devcenter.heroku.com/articles/getting-started-with-nodejs). This client uses [Express4](http://expressjs.com/en/4x/api.html) for easy route management, read up on the docs to learn more about reading incoming JSON params, writing responses, etc.

## Pre-requisite Accounts
Every team must show up with a laptop and create the following accounts in order to use the provided start snake. You are welcome to use existing accounts if you have them already.
* Create a free account on Github - https://www.github.com/
* Create a free account on Heroku - https://www.heroku.com/

## Prerequisite Software
You'll need the follwing software on your computer before you can get started with this project:
- [GitHub CLI ](https://git-scm.com/downloads)
- [Heroku CLI ](https://cli.heroku.com/).

You'll need the following software on your computer if you want to compile and run the application locally. This is completely optional but probably desired since troubleshooting coding errors and testing behaviour will be much easier. 
- [NodeJs 6.x or 7.x or 8.x](https://nodejs.org/)
- [NPM 3.x or 4.x or 5.x](https://www.npmjs.com/get-npm) - This is installed with NodeJS

If you haven't setup a NodeJS development environment before, read [how to get started with NodeJS](http://nodejs.org/documentation/tutorials/). You'll also need [npm](https://www.npmjs.com/) for easy JS dependency management.

If you have the software installed already, confirm by running the respective commands on the command prompt and check the versions:
- ```npm -v```
- ```node -v```
- ```git --version```
- ```heroku --version```

## Preparing your project
DON'T SKIP THIS STEP. You'll need your own copy of this project under your own GitHub account in order to make and publish changes to your snake.
- Make sure you are signed in to your GitHub account
- Fork this [project](https://github.com/xmatters-tko/xm-battlesnake-java/fork)

## Test Your Environment Setup
At this point, make sure that all of you software is installed, and you've forked this project correctly. Run the following commands:

```sh
$ git clone https://github.com/<your account>/xm-battlesnake-nodejs.git
$ cd xm-battlesnake-nodejs
$ heroku local
```

Your app should now be running on [localhost:5000/health](http://localhost:5000/health).

### Testing your local app
You can use curl commands to easily test if you snake is working and responding to end points.

Run it locally using heroku command:
```
$ heroku local
```
#### /start Endpoint
```
$ curl localhost:5000/start -X POST -H "Content-Type: application/json" -d '{"width":20,"height":20,"game_id":"example-game-id"}'
```
#### /move Endpoint
```
$ curl localhost:5000/move -X POST -H "Content-Type: application/json" -d '{ "you": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98","width": 2,"turn": 0,"snakes": [{ "taunt": "git gud","name": "my-snake","id": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98","health_points": 93,"coords": [[0,0],[0,0],[0,0]] },{ "taunt": "gotta go fast","name": "other-snake","id": "c35dcf26-7f48-492c-b7b5-94ae78fbc713","health_points": 50,"coords": [[1,0],[1,0],[1,0]] }],"height": 2,"game_id": "a2facef2-b031-44ba-a36c-0859c389ef96","food": [[1,1]],"dead_snakes": [{ "taunt": "gotta go fast","name": "other-snake","id": "83fdf2b9-c8d0-44f4-acb2-0c506139079e","health_points": 50,"coords": [[5,0],[5,0],[5,0]] }] }'
```

## Deploying to Heroku

You will be provided a heroku project name to deploy your snake to
inside your git repo  do the following commands 
```sh
$ heroku git:remote -a [HEROKU_PROJECT_NAME]
```
then everytime you want to deploy changes you can simply do  
```sh
 $ git push heroku master
```
The output should end with the URL endpoint of your snake. Use this URL to add your snake to a game on the server.
```
remote: -----> Launching...
remote:        Released v3
remote:        https://my-snake.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
```
#### Testing the app
Your app should now be running on [https://my-snake.herokuapp.com/health](https://my-snake.herokuapp.com/health). You can use curl commands to easily test if you snake is working and responding to end points.

#### /start Endpoint
```
$ curl https://my-snake.herokuapp.com/start -X POST -H "Content-Type: application/json" -d '{"width":20,"height":20,"game_id":"example-game-id"}'
```
#### /move Endpoint
```
$ curl https://my-snake.herokuapp.com/move -X POST -H "Content-Type: application/json" -d '{ "you": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98","width": 2,"turn": 0,"snakes": [{ "taunt": "git gud","name": "my-snake","id": "2c4d4d70-8cca-48e0-ac9d-03ecafca0c98","health_points": 93,"coords": [[0,0],[0,0],[0,0]] },{ "taunt": "gotta go fast","name": "other-snake","id": "c35dcf26-7f48-492c-b7b5-94ae78fbc713","health_points": 50,"coords": [[1,0],[1,0],[1,0]] }],"height": 2,"game_id": "a2facef2-b031-44ba-a36c-0859c389ef96","food": [[1,1]],"dead_snakes": [{ "taunt": "gotta go fast","name": "other-snake","id": "83fdf2b9-c8d0-44f4-acb2-0c506139079e","health_points": 50,"coords": [[5,0],[5,0],[5,0]] }] }'
```
### Pushing Updates to Heroku
You have to commit your changes to your git project as part of pushing them to the remote heroku git.
```sh
$ git add --all; git commit -m "Updated"; git push
$ git push heroku master
```

### Debugging Logs on Heroku
Once your snake is running, you can tail the logs any time in the console using the command:
```sh
$ heroku logs --tail
```
### Local Development
In order to shorten the devlopment cycle, or do step-through debugging, you probably want to develop locally. Firstly, run a game server locally using docker:

$ docker run -it -p 4000:4000 stembolt/battle_snake
Leave this running and go to http://localhost:4000, you should see a grey screen. Meanwhile, you want to get your snake running locally. 
Run it locally using heroku command:
```
$ heroku local
```

Now you can try your snake out on your local game server. Since the server is running in a docker container, and your snake is running outside that container, you need to determine your IP address so that the server can talk to your local snake. Maybe use something like ifconfig or check your System Preferences. Once you figure that out, click "New Game" on your game server running at localhost:4000.

You might want a smaller board than 20x20, and a much longer API timeout which will give you time to step-through debug your snake. Enter your snake's location in the Snake's url section using your IP address (e.g. mine is http://10.3.6.123:8080). Play around with the singleplayer / multiplayer Game Mode setting. You can enter multipe versions of your own snake. If you want someone to fight against, my snake is running at https://stk-battlesnake.herokuapp.com


## Documentation

For more information about using NodeJS on Heroku, see these Dev Center articles:

- [NodeJS on Heroku](https://devcenter.heroku.com/categories/nodejs)
