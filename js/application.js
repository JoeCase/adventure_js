$(document).ready(function() {

  var worldArgs = {size:  4,
                   bombs: 2,
                   health: 2
                  };

  var world = new World(worldArgs);

  world.gridGen();
  world.bombGen();
  world.healthGen();
  world.treasureGen();
  world.startGen();

  var gameArgs = { health:  50,
                   position: world.playerStart,
                   gridSize: world.gridSize
  };

  var game = new Game(gameArgs);

  alert("Are you ready to play?")

  Mousetrap.bind('up', function(){
    var newPos = [[ game.position[0][0], game.position[0][1] + 1 ]];
    var edge =  game.edgeCheck(newPos, game);
    if ( edge ) {
      alert("You hit a wall! Try again")
    } else {
      move(newPos, game, world);
      print_position(game.position);
    };
  });


  Mousetrap.bind('down', function(){
    var newPos =  [ [game.position[0][0], game.position[0][1] - 1 ]];
    move(newPos, game, world);
    print_position(game.position);
  });


  Mousetrap.bind('left', function(){
    var newPos = [[game.position[0][0] - 1, game.position[0][1] ]];
    move(newPos, game, world);
    print_position(game.position);
  });


  Mousetrap.bind('right', function(){
    var newPos = [[ game.position[0][0] + 1, game.position[0][1] ]];
    move(newPos, game, world);
    print_position(game.position);
  });




});
