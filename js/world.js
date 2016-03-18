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
