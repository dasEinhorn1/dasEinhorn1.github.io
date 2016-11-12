/*
  An exit has a name corresponding
*/
var Exit= function(room,description){
  this.requirements=[];           // a list of functions which must all return true before exit opens
  this.name=name;                 // the name of the exit
  this.description= description;  // a description to be output when the exit is used
};
Exit.prototype.addRequirement = function (reqFunc) { // add a requirement to the exit
  this.requirements.push(reqFunc);
};
Exit.prototype.isOpen = function () { // check to see that all requirementshave been met
  return this.requirements.length<1
};
Exit.prototype.getReason = function () { // get reason why exit is closed
  if(this.requirements.length>0){
    return this.requirements[0]("");
  }
};
Exit.prototype.open = function (room) {
  for(var i in requirements){
    if(requirements[i](room)===true){
      this.requirements=deleteFromArray(this.requirements,i);
    }
  }
  if(this.isOpen()){
    return this.description;
  }else{
    return this.reason;
  }
};
