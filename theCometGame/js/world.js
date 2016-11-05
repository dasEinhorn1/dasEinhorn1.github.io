var Room= function(nm, desc){
  this.name=nm;
  this.description=desc;
}

Room.prototype.enterText = function () {
  return [["You have entered the "+this.name,this.description],"locator"]
};
Room.prototype.describe = function () {
  return [["You are in the "+this.name,this.description],"locator"]
};

var testRoom= new Room("testing room", "It fills you with a sense of despair.");
