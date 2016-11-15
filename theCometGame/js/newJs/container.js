var Container = function(name,description,openDescription=""){
  this.cls="container";
  this.requirements=[];
  this.name=name;
  this.description= description;
  this.openDescription=openDescription;
  this.items=[];
};
Container.prototype.addItem = function (item) {
  this.items.push();
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
Container.prototype.getContents = function(){
  if(this.isOpen()){
      return this.items.slice();
  }else{
    return false;
  }
};
Container.prototype.addRequirement = function (reqFunc) { // add a requirement to the Container
  this.requirements.push(reqFunc);
};
Container.prototype.isOpen = function () { // check to see that all requirementshave been met
  return requirement(world)===true;
};
Container.prototype.getReason = function (world) { // get reason why Container is closed
  return this.requirement(world);
};
Container.prototype.open = function (world) {
  if(this.isOpen()){
    return this.openDescription;
  }else{
    return getReason();
  }
};
