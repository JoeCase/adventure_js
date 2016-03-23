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
  i = _.random(0,this.coordinates.length);
  this.treasure.push(this.coordinates.splice(i, 1)[0]);
};

World.prototype.startGen = function() {
  i = _.random(0,this.coordinates.length);
  this.playerStart.push(this.coordinates.splice(i, 1)[0]);
};

// AUDIO

var audio1 = new Audio('./audio/kick.mp3');
audio1.loop = true;
var audio2 = new Audio('./audio/kick_snare.mp3');
audio2.loop = true;
var audio3 = new Audio('./audio/kick_snare_hats.mp3');
audio3.loop = true;
var audio4 = new Audio('./audio/kick_snare_hats_bass.mp3');
audio4.loop = true;
var audio5 = new Audio('./audio/kick_snare_hats_bass_synth.mp3');
audio5.loop = true;
var boo = new Audio('./audio/boo.mp3');

var loops = [audio1, audio2, audio3, audio4, audio5];
var loop_i = 0;
var audio = false;


// GAME ////////////////////////////////////////////

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
      if (audio) {audio.pause();}
      loop_i = 0;
      boo.play();
      // alert("BOMB!!!!!!!!!!!!! You health is now :" +  this.health);
    }
  };
};

Game.prototype.healthCheck = function(healthCoord, newPos, game) {
  for (var i = healthCoord.length - 1; i >= 0; i--) {
    if ( healthCoord[i][0] == newPos[0][0] && healthCoord[i][1] == newPos[0][1] ) {
      this.health += 10
      healthCoord.splice(i,1);

      if(!audio) {
        audio = loops[loop_i];
        audio.play();
      } else {
        audio.pause();
        audio = loops[loop_i];
        audio.play();
        if (loop_i < 5) {
          loop_i += 1 } else {
            loop_i = loop_i
          };
      }

      // alert("Healthpack!!!! Your health is now :" +  this.health);
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
  if ( ( newPos[0][0] < 0 || newPos[0][0] > game.gridSize) || ( newPos[0][1] < 0 || newPos[0][1] > game.gridSize) ) {
    return true;
  }
  // body...
};


function move(newPos, game, world) {
  $(make_id(game.position[0])).removeClass('player').addClass('played');
  $(make_id(newPos[0])).addClass('player');
  game.position = newPos;

  game.bombCheck(world.bombCoord, newPos, game);
  game.healthCheck(world.healthCoord, newPos, game);
  game.gameOver(world.treasure, newPos, game);


};




function print_position(position) {
  console.log(position[0][0] + "-" + position[0][1]);
};

  function boardCreate(game, world) {
    var size = game.gridSize;
    var body = document.body;
    var tbl = document.createElement('table');
    for (var i = size; i >= 0; i--) {
      var row = tbl.insertRow();
      for ( var j = 0; j <= size; j++) {
        var cell = row.insertCell();
        cell.id = i + "-" + j;
      }
    }
    body.appendChild(tbl);
  };

  function make_id(coord) {
    return "#" + coord[0] + "-" + coord[1];
   };


   function place_items(world) {

    world.bombCoord.forEach(function(coord){
      $(make_id(coord)).addClass('bomb');
    });

    world.healthCoord.forEach(function(coord){
      $(make_id(coord)).addClass('health');
    });

    world.treasure.forEach(function(coord){
      $(make_id(coord)).addClass('treasure');
    });

    world.playerStart.forEach(function(coord){
      $(make_id(coord)).addClass('player');
    });
   };