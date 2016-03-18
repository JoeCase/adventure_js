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

// PLAYER

function Game(args) {
  args = args ? args : {};
  this.position = args['position'] || [[0,0]]
  this.health = args['health'] || 50;
  this.win    = false;
}

// Game.prototype.move = function() {

//   direction = prompt("What's your move?");

//   switch (direction) {
//     case 'f':
//       this.position[0][1] += 1;
//       break;
//     case 'b':
//       this.position[0][1] -= 1;
//       break;
//     case 'l':
//       this.position[0][0] -= 1;
//       break;
//     case 'r':
//       this.position[0][0] += 1;
//       break;
//     case 'q':
//       this.position[0][0] += 1;
//       break;
//     default:
//       console.log("Please enter a correct direction!")
//   } //switch

// };

Game.prototype.move = function() {

  var position = this.position

  Mousetrap.bind('up', function(){this.position[0][1] += 1;});
  Mousetrap.bind('down', function(){this.position[0][1] -= 1;;});
  Mousetrap.bind('left', function(){this.position[0][0] -= 1;});
  Mousetrap.bind('right', function(){this.position[0][0] += 1;});


};

Game.prototype.bombCheck = function(bombCoord, position) {
  for (var i = bombCoord.length - 1; i >= 0; i--) {
    if ( bombCoord[i][0] == position[0][0] && bombCoord[i][1] == position[0][1] ) {
      this.health -= 10
      bombCoord.splice(i,1);
      alert("BOMB!!!!!!!!!!!!! You health is now :" +  this.health);
      console.log(bombCoord);
    }
  };
};

Game.prototype.healthCheck = function(healthCoord, position) {
  for (var i = healthCoord.length - 1; i >= 0; i--) {
    if ( healthCoord[i][0] == position[0][0] && healthCoord[i][1] == position[0][1] ) {
      this.health += 10
      healthCoord.splice(i,1);
      alert("Healthpack!!!! Your health is now :" +  this.health);
      console.log(healthCoord);
    }
  };
};

Game.prototype.gameOver = function(treasure, position) {
  for (var i = treasure.length - 1; i >= 0; i--) {
    if ( treasure[i][0] == position[0][0] && treasure[i][1] == position[0][1] ) {
      alert("You found the treasure!!! Game over");
      window.location.reload();
    }
  };
};


// DRIVERS

var worldArgs = {  size:  4,
                   bombs: 2,
                   health: 2
                  };

var myWorld = new World(worldArgs);
myWorld.gridGen();
myWorld.bombGen();
myWorld.healthGen();
myWorld.treasureGen();
myWorld.startGen();

// console.log(myWorld);
// console.log(myWorld.bombCoord);
// console.log(myWorld.healthCoord);
// console.log(myWorld.playerStart);
console.log(myWorld.treasure);


var gameArgs = { health:  50,
                 position: myWorld.playerStart
};

function print_position(position) {
  console.log(position[0][0] + "-" + position[0][1]);
}

myGame = new Game(gameArgs);

function play() {
  var playing = prompt("Keep going?");
  switch (playing) {
    case 'n':
      break;
    default:
      console.log("Current Position");
      print_position(myGame.position);
      myGame.move();
      console.log("New Position");
      print_position(myGame.position);
      myGame.bombCheck(myWorld.bombCoord, myGame.position);
      myGame.healthCheck(myWorld.healthCoord, myGame.position);
      myGame.gameOver(myWorld.treasure, myGame.position);
      play();

  };
}

// play();



Mousetrap.bind('up', function(){alert("up")});