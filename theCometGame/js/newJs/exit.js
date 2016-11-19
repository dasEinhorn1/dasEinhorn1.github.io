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
Exit.prototype.tryOpen = function (world,test=false) { // check to see that all requirementshave been met
  return this.requirement(world,test);
};
Exit.prototype.open = function (world) {
  var opn=this.tryOpen(world,true);
  console.log(opn);
  if(opn===true){
    console.log("open");
    return this.description;
  }else{
    return opn;
  }
};
Exit.prototype.setRoom=function(room){
  this.room=room;
};
