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
  this.items=[];
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
Room.prototype.addContainers = function (containers) {
  for(let container of containers){
    this.addContainer(container);
  }
};
Room.prototype.getContainer = function (containerName) {
  for(let container of this.containers){
    if (container.name.toLowerCase()==containerName.toLowerCase()){
      return container;
    }
  }
  return null;
};
Room.prototype.retrieveItem = function(itemName,containerName=null){
  if (containerName===null){
    var item= (isInt(itemName))? this.items[parseInt(itemName)-1]: findByName(this.items,itemName,false);
    console.log(item);
    if(item!=null){
      this.items=removeFromArray(this.items,item);
    }
    return item;
  }else{
    itemName= (isInt(itemName))? this.items[parseInt(itemName)-1].name: findByName(this.items,itemName,false);
    return this.getContainer(containerName).removeItem(itemName);
  }
};
Room.prototype.retrieveItems = function(i){
  var container=this.containers[i];
  if (container===undefined){
    return null;
  }
  var opn=container.open(window.w);
  if(!container.searched){
    return opn
  }
  var items=container.removeAll();
  console.log(items);
  printParagraph(container.description,"system");
  return items;
};
Room.prototype.addItem = function(item,containerName=null){
  if (containerName===null){
    return this.items.push(item);
  }
  return this.getContainer(containerName).addItem(item);
};

Room.prototype.search=function(world,target=null){
  if(target===null){
    return [getNamesWithDesc(this.items),getNames(this.containers)];
  }else{
    var items=this.retrieveItems(target);
    if(items == null){
      return "Couldn't find any left to search.";
    }else if(items.length<1){
      return "It was empty."
    }else{
      console.log(items);
      return items
    }
  }
}
