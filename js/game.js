// WORLD
function World(args) {
  args = args ? args : {};

  this.gridSize     = args['size'] || 20;
  this.bombNum      = args['bombs'] || rand(this.gridSize,6);
  this.healthNum    = args['health'] || rand(this.gridSize,7);

  this.coordinates  = [];

  this.bombCoord    = [];
  this.healthCoord  = [];
  this.playerStart  = [];
  this.treasure     = [];
}

World.prototype.gridGen = function() {
  var size = this.gridSize;
  for (var h = 1; h <= size; h++) {
    for (var w = 1; w <= size; w++) {
     this.coordinates.push([h,w])
    }
  }
};

World.prototype.bombGen = function() {
  amount = this.bombNum
  for (var b = 1; b <= amount; b++) {
    i = _.random(0,this.coordinates.length);
    this.bombCoord.push(this.coordinates.splice(i, 1)[0]);
  }
};

World.prototype.healthGen = function() {
  amount = this.healthNum
  for (var b = 1; b <= amount; b++) {
    i = _.random(0,this.coordinates.length);
    this.healthCoord.push(this.coordinates.splice(i, 1)[0]);
  }
};

World.prototype.treasureGen = function() {
  this.treasure.push(this.coordinates.splice(i, 1)[0]);
};

World.prototype.startGen = function() {
  this.playerStart.push(this.coordinates.splice(i, 1)[0]);
};

// GAME

function Game(args) {
  args = args ? args : {};
  this.position = args['position'] || [[0,0]];
  this.health = args['health'] || 50;
  this.win    = false;
  this.gridSize = args['gridSize'] || 0;
}


Game.prototype.bombCheck = function(bombCoord, newPos, game) {
  for (var i = bombCoord.length - 1; i >= 0; i--) {
    if ( bombCoord[i][0] == newPos[0][0] && bombCoord[i][1] == newPos[0][1] ) {
      this.health -= 10
      bombCoord.splice(i,1);
      alert("BOMB!!!!!!!!!!!!! You health is now :" +  this.health);
      game.position = newPos;
    }
  };
};

Game.prototype.healthCheck = function(healthCoord, newPos, game) {
  for (var i = healthCoord.length - 1; i >= 0; i--) {
    if ( healthCoord[i][0] == newPos[0][0] && healthCoord[i][1] == newPos[0][1] ) {
      this.health += 10
      healthCoord.splice(i,1);
      alert("Healthpack!!!! Your health is now :" +  this.health);
      game.position = newPos;
    }
  };
};

Game.prototype.gameOver = function(treasure, newPos, game) {
  for (var i = treasure.length - 1; i >= 0; i--) {
    if ( treasure[i][0] == newPos[0][0] && treasure[i][1] == newPos[0][1] ) {
      alert("You found the treasure!!! Game over. Click to play again");
      window.location.reload();
    }
  };
};

Game.prototype.edgeCheck = function(newPos, game) {
  debugger;
  if ( ( newPos[0] < 0 || newPos[0] > game.gridSize) || ( newPos[1] < 0 || newPos[1] > game.gridSize) ) {
    return true;
  }
  // body...
};




function move(newPos, game, world) {
  var newPos = newPos;
  game.bombCheck(world.bombCoord, newPos, game);
  game.healthCheck(world.healthCoord, newPos, game);
  game.gameOver(world.treasure, newPos, game);
  game.position = newPos;
};




function print_position(position) {
  console.log(position[0][0] + "-" + position[0][1]);
}





// DRIVERS



// var worldArgs = {  size:  4,
//                    bombs: 2,
//                    health: 2
//                   };

// var myWorld = new World(worldArgs);
// myWorld.gridGen();
// myWorld.bombGen();
// myWorld.healthGen();
// myWorld.treasureGen();
// myWorld.startGen();

// console.log(myWorld);
// console.log(myWorld.bombCoord);
// console.log(myWorld.healthCoord);
// console.log(myWorld.playerStart);
// console.log(myWorld.treasure);


// var gameArgs = { health:  50,
//                  position: myWorld.playerStart,
//                  gridSize: myWorld.gridSize
// };


// myGame = new Game(gameArgs);

// function play(game, world) {

//   Mousetrap.bind('up', function(game, world){game.position[0][1] += 1;});





//   Mousetrap.bind('up', function(){game.position[0][1] += 1;});
//   Mousetrap.bind('down', function(){game.position[0][1] -= 1;;});
//   Mousetrap.bind('left', function(){game.position[0][0] -= 1;});
//   Mousetrap.bind('right', function(){game.position[0][0] += 1;});



//////////////////////////////////////////////////////

//   var playing = prompt("Keep going?");
//   switch (playing) {
//     case 'n':
//       break;
//     default:
//       console.log("Current Position");
//       print_position(myGame.position);
//       // myGame.move();
//       console.log("New Position");
//       print_position(myGame.position);
//       myGame.bombCheck(myWorld.bombCoord, myGame.position);
//       myGame.healthCheck(myWorld.healthCoord, myGame.position);
//       myGame.gameOver(myWorld.treasure, myGame.position);
//       play();

//   };
// }



// play();



// Mousetrap.bind('up', function(){alert("up")});



