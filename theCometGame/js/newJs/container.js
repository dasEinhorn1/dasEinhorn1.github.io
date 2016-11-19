var Container = function(name,description="",req=function(w){return true;}){
  this.cls="container";
  this.requirement=req;
  this.name=name;
  this.description= description;
  this.items=[];
  this.searched=false;
};
Container.prototype.addItem = function (item) {
  this.items.push(item);
};
Container.prototype.addItems = function (items) {
  for(let item of items){
    this.addItem(item);
  }
};
Container.prototype.removeItem = function (itemName) {
  var item=findByName(this.items,itemName);
  this.items=removeByName(this.items,itemName);
  return item;
};
Container.prototype.removeItems = function (itemNames) {
  var tempA=[];
  for(let itemName of itemNames){
    var item=this.removeItem(itemName);
    if(item!=null){
      tempA.push(itemName);
    }
  }
  return tempA;
};
Container.prototype.removeAll = function(){
  var temp=this.items;
  this.items=[];
  return temp;
}
Container.prototype.getContents = function(world){
  var opn=this.tryOpen(world)
  if(opn===true){
    if(this.items.length>0){
      return this.items.slice();
    }else{
      return "It was empty."
    }
  }else{
    return opn;
  }
};
Container.prototype.addRequirement = function (reqFunc) { // add a requirement to the Container
  this.requirement=reqFunc;
};
Container.prototype.tryOpen = function (world,t=false) { // check to see that all requirementshave been met
  return this.requirement(world,t);
};
Container.prototype.open = function (world) {
  var opn=this.tryOpen(world,true);
  if(opn===true){
    this.searched=true;
    this.name+= "*";
    return this.description;
  }else{
    return opn;
  }
};
