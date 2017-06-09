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
    }else{
      throw "Not a room.";
    }
  }else{
    var exit = findByName(exits,exitName);
    if(exit==null){
      throw "Not a room.";
    }
  }
  if(exit.tryOpen(this)===true){
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
  }if(this.stage==3){
    this.rooms[4].description="Nothing moved in the vaults as you stood cut from the world above. Your lantern flickered nervously.\n Time to figure out a way out."
    this.rooms[4].exits[1].name="Door to secret vault";
    this.rooms[2].description="You awoke with a sense of horror, leaped from the body, and groped up the stairs, calling to the guard. Nobody answered.";
    this.rooms[1].description="The stillness of death lay everywhere and everywhere bowed, bent, and stretched the silent forms of men. "+
      "You paused and glanced about. You were not a man easily moved; but the sight was appalling! The lobby, which just hours ago had been full "+
      "of lively New Yorkers was now a maze of bodies. At her desk in front of the president's office, the secretary was collapsed in a mess of frothy sick. "+
      "Her hand, frozen in place, held out a note.";
    this.rooms[1].addContainer(containers.secretary);
    this.stage=4;
  }if(this.stage==5){
    this.rooms[1].description="The stillness of death lay everywhere and everywhere bowed, bent, and stretched the silent forms of men. "+
      "You paused and glanced about. You were not a man easily moved; but the sight was appalling! The lobby, which just hours ago had been full "+
      "of lively New Yorkers was now a maze of bodies. At her desk in front of the president's office, the secretary was collapsed in a mess of frothy sick"
  }
  console.log("!!!!!!!UPDATING!!!!!!!");
  look([],this);
};
