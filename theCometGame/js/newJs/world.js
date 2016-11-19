var World = function(){
  this.player=new Player();
  this.rooms=[];
  this.currentRoom=null;
  this.stage=0;
  this.updated=false;
}
World.prototype.nextStage = function(){
  this.stage++;
  this.update();
}
World.prototype.setStage = function(stage){
  this.stage=stage;
  this.update();
}
World.prototype.addRoom = function (room) {
  this.rooms.push(room);
};
World.prototype.linkRooms = function(r1,r2,exit1,exit2){
  exit1.setRoom(this.rooms[r2]); // exit 1 now leads to room two
  exit2.setRoom(this.rooms[r1]); // exit two now leads to room one
  this.rooms[r1].addExit(exit1); // add exit1 to r1
  this.rooms[r2].addExit(exit2); // ad exit2 to r2
}
World.prototype.addRooms = function(room){
  for(let room of rooms){
    this.addRoom(room);
  }
};
World.prototype.setCurrentRoom = function (i) {
  this.currentRoom=this.rooms[i]
};
World.prototype.playerEnters = function(exitName){
  var exits=this.currentRoom.getExits()
  if(isInt(exitName)){
    var i=parseInt(exitName)-1;
    if (i>-1 && i<exits.length){
      var exit = exits[i];
      console.log(exit);
    }else{
      throw "Not a room.";
    }
  }else{
    var exit = findByName(exits,exitName);
    if(exit==null){
      throw "Not a room.";
    }
  }
  if(exit.isOpen(this)){
    this.currentRoom=exit.room;
    this.updated=false;
  }else{
    this.updated=true;
  }
  return exit.open(this);
}


World.prototype.update = function () {
  // this function will update all necessary things to meet current stage (rooms, exits, people, etc.)
  if(this.updated){
    return;
  }
  look([],this);
};
