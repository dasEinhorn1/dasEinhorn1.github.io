/*
  An exit has a name, a description, and a room to lead to
*/
var Exit= function(name, description,requirement=function(){return true;}){
  this.cls='descriptive'
  this.requirement=requirement;           // a list of functions which must all return true before exit opens
  this.name=name;                 // the name of the exit
  this.description= description;  // a description to be output when the exit is used
  this.room=null;
};
Exit.prototype.setRequirement = function (reqFunc) { // add a requirement to the exit
  this.requirement=reqFunc;
};
Exit.prototype.isOpen = function (world) { // check to see that all requirementshave been met
  if(this.requirement(world)!==true){
    return false;
  }
  return true;
};
Exit.prototype.getReason = function (world) { // get reason why exit is closed
  if(!this.isOpen(world)){
    return this.requirement(world);
  }
};
Exit.prototype.open = function (world) {
  if(this.isOpen(world)){
    return this.description;
  }else{
    return this.getReason(world);
  }
};
Exit.prototype.setRoom=function(room){
  this.room=room;
};
