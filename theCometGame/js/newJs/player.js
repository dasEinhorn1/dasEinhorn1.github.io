var Player= function(){
  this.class="you";
  this.items=[];
  this.equipped=[];
}
Player.prototype.addItem = function (item) {
  this.items.push(item);
};
this
