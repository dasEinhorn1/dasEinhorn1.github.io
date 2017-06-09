var Room= function(nm, desc, silence="Nobody can hear you.", exits=[], npcs=[]){
  this.name=nm;
  this.description=desc;
  this.silence=silence;
  this.exits=exits;
  this.npcs=npcs;
}

Room.prototype.enterText = function () {
  var leText=sectionHelper("Moving to "+this.name);
  var tempA=this.description.slice();
  tempA.unshift(leText[0]);
  tempA.push(leText[1]);
  return tempA;
};
Room.prototype.describe = function () {
  var out = [
    new OutputObject(this.description,"descriptive"),
    new OutputObject(["Exits:",this.getExits()],"locator",1)
  ];
  if(this.getSayings()!=null){
    out.push(new OutputObject(["Speech:",this.getSayings()],"talkTip",1));
  }else{
    out.push(new OutputObject(["Speech:",["You were all alone."]],"talkTip",2));
  }
  return out;
};

Room.prototype.respond=function(said) {
  if(this.npcs.length==0){
    return new OutputObject(this.silence,"talkTip");
  }
}
Room.prototype.getSayings=function(said) {
  if(this.npcs.length==0){
    return null;
  }else{
    var tempA=[]
    for(let p of this.npcs){
      tempA.push(p.speak());
    }
    return tempA;
  }
}
Room.prototype.addPerson = function (person) {
  this.npcs.push(person);
};
Room.prototype.addExit=function(name){
  this.exits.push(name);
}
Room.prototype.getExits=function () {
  if(this.exits.length==0){
    return "You couldn't find a way out...";
  }else{
    var exts="";
    for(var i=1;i<this.exits.length+1;i++){
      exts+=" "+i+") "+this.exits[i-1]+" |"
    }
    return this.exits;
  }
}

Room.prototype.checkExits=function(name){
  console.log(name);
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
};

var Person= function(name, description,cls, discussion, canIgnore=false){//sayings is a list of sayings that the character says, along with responses which can be used to respond
  this.name= name;            // the name of the person
  this.cls=cls;               // the class to designate this person's speaking
  this.desc=description;      // the description of the person
  this.discussion=discussion; // the discussion handler for this person
  this.canIgnore=canIgnore;   // whether you can ignore this person
}

Person.prototype.allowsLeave=function(room){
  if(!this.discussion.blocks(room) || this.canIgnore){
    return true;
  }else{
    return false;
  }
}

Person.prototype.discuss=function(response){
  var output=this.discussion.discuss(response);
  return output;
}
Person.prototype.responseOptions=function(response){
  return this.discussion.getCurrentResponses();
}
Person.prototype.speak=function(){
  return this.discussion.curr;
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
  console.log(nm);
  if(nm){
    this.lastRoom=this.currentRoom.name;
    this.currentRoom=this.rooms.getVal(nm);
    return new OutputObject(this.currentRoom.enterText(),"descriptive");
  }else{
    return new OutputObject("You can't go that way.","error");
  }
}
World.prototype.setCurrentRoom=function(name){
  this.currentRoom=this.rooms.getVal(name);
}
var w=new World();
var testRoom= new Room("Bank steps", ["You stood on the steps of the bank, "+
"watching the human river that swirled down Broadway. Few noticed you. Few ever noticed you save in a way that stung.... "+
"Bits of the words of the walkers came to you.","&quot;The comet?&quot;","&quot;The comet--&quot;","Everybody was talking about it."]);
testRoom.addExit("Lower Vaults");
var nextRoom= new Room("Lower Vaults", ["Down you went beneath Broadway, where the dim light filtered through the feet of hurrying men; "+
"down to the dark basement beneath; down into blackness and silence beneath that was the lowest cavern. Here with your dark lantern you groped "+
"in the bowels of the earth, under the world."," You drew a long breath as you threw back the last iron door..."]);
nextRoom.addExit("Bank steps");
var wooRoom= new Room("Strange Room", ["Woo!","It smells like oranges in here... You LOVE oranges!"]);
testRoom.addExit("Strange Room");
w.addRoom(testRoom);
w.addRoom(nextRoom);
w.addRoom(wooRoom);
w.setCurrentRoom("Bank steps");
var president=new Person("The president","He smiled at you patronizingly.","pres",presDisc)
w.currentRoom.addPerson(president);
