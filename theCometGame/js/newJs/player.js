var Player= function(){
  this.cls="you";
  this.items=[];
  this.equipped=[];
};

Player.prototype.addItem = function (item) {
  this.items.push(item);
};
Player.prototype.hasItem = function (itemName){
  var item=findByName(this.items,itemName);
  return item!=null
}
Player.prototype.removeItem = function (itemName) {
  var item=findByName(this.items,itemName);
  this.items=removeByName(this.items,itemName);
  return item;
};

Player.prototype.equipItem = function (itemName) {
  var item=findByName(this.items,itemName);
  this.equipped.push(item.name);
};
Player.prototype.unequipItem = function (itemName) {
  this.equipped=removeFromArray(this.equipped,itemName)
};
Player.prototype.say = function(words){
  return "'"+words+"'";
};
