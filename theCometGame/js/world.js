var Room= function(nm, desc, silence="Nobody can hear you.", exits=[], npcs=[]){
  this.name=nm;
  this.description=desc;
  this.silence=silence;
  this.exits=exits;
  this.npcs=npcs;
}

Room.prototype.enterText = function () {
  return ["You have entered the "+this.name+"... "+this.description,"locator"]
};
Room.prototype.describe = function () {
  outputResult(["You are in the "+this.name+"... "+this.description,"locator"]);
  outputResult(this.getExits());
  return(this.getSayings());
};

Room.prototype.respond=function(said) {
  if(this.npcs.length==0){
    return [this.silence,"locator"]
  }
}
Room.prototype.getSayings=function(said) {
  if(this.npcs.length==0){
    return ["Sayings: There's nobody around, say what you want",'locator'];
  }
}
Room.prototype.addExit=function(name){
  this.exits.push(name);
}
Room.prototype.getExits=function () {
  if(this.exits.length==0){
    return ["It seems you may be stuck here...","locator"];
  }else{
    var exts="";
    for(var i=1;i<this.exits.length+1;i++){
      exts+=" "+i+") "+this.exits[i-1]+" |"
    }
    return ["Destinations:"+exts.slice(0,exts.length-2),"locator"]
  }
}

Room.prototype.checkExits=function(name){
  if(this.exits.includes(name)){
    return name;
  }else if(!isNaN(parseInt(name))){
    try{
      return this.exits[parseInt(name)-1];
    }catch(e){
      return false
    }
  }else{
    return false;
  }
}


var World= function(){
  this.rooms=new JSdict();
  this.currentRoom=null;
  this.lastRoom=null;
}

World.prototype.addRoom=function(r){
  this.rooms.add(r.name,r);
}
World.prototype.changeRooms=function(name){
  if(this.lastRoom!=null && name=="back"){
    console.log("back");
    name=this.lastRoom;
  }
  var nm=this.currentRoom.checkExits(name);
  if(nm){
    this.lastRoom=this.currentRoom.name;
    this.currentRoom=this.rooms.getVal(nm);
    return this.currentRoom.enterText();
  }else{
    return ["You can't go that way.","error"];
  }
}
World.prototype.setCurrentRoom=function(name){
  this.currentRoom=this.rooms.getVal(name);
}
var w=new World();
var testRoom= new Room("testing room", "It fills you with a sense of despair.");
testRoom.addExit("other testing room");
var nextRoom= new Room("other testing room", "It smells like oranges in here!",
"Your words echo off the orange scented walls. You are all alone....");
nextRoom.addExit("testing room");
w.addRoom(testRoom);
w.addRoom(nextRoom);
w.setCurrentRoom("testing room");
