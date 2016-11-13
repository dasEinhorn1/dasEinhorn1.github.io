/*
  A room contains npcs, containers, and interactables
  Every room starts with a floor container, which has not requirements to access
  it will automatically be searched when the player tries to take an item.

  It also has exits, which should be considered open or closed.

  See exit.js for more info on that.

   Rooms also have unique names and descriptions.
*/

var Room = function(name, description){
  this.npcs=[];
  this.exits=[];
  this.containers=[];
  this.name=name;
  this.description=description;
}
Room.prototype.addNPC = function (npc) {
  this.npcs.push(npc);
};

Room.prototype.removeNPC = function (name) {
  var tempA=[];
  for(let npc of this.npcs){
    if(npc.name!=name){
      tempA.push(npc);
    }
  }
  this.npcs=tempA.slice();
};

Room.prototype.addExit = function (exit) {
  this.exits.push(exit);
};
Room.prototype.getExits = function () {
  return this.exits;
};
Room.prototype.getExitNames = function () {
  var tempA=[];
  for(let exit of this.exits){
    tempA.push(exit.name);
  }
  return tempA;
};
Room.prototype.addContainer = function (container) {
  this.containers.push(container);
};
Room.prototype.getContainer = function (containerName) {
  for(container in this.containers){
    if (container.name==containerName){
      return container;
    }
  }
};
Room.prototype.retrieveItem = function(itemName,containerName='floor'){
  return this.getContainer(containerName).removeItem(itemName);
};
Room.prototype.placeItem = function(itemName,containerName='floor'){
  return this.getContainer(containerName).removeItem(itemName);
};
