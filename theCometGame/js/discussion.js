var Discussion=function(says,resps,confusion,blk){
  this.curr=says.Keys[0];
  this.sayings=says;        // dictionary of sayings with responses associated
  this.responses=resps; // a dictionary of possible responses with next saying associated
  this.blocked=blk;         // a dictionary of blocked rooms with sayings as to why they are blocked.
  this.confusion=confusion; // text response to nonsensical input
};
Discussion.prototype.getCurrentResponses = function(){
  return this.sayings.getVal(this.curr);
}
Discussion.prototype.respond = function(response){ // returns a response to input
  var rNum=parseInt(response)
  var rs=this.getCurrentResponses();//all possible responses right now
  if(isNaN(rNum)){
    if(rs!==false){
      if(rs.includes(response)){
        this.curr=this.responses.getVal(response);
        return this.curr;
      }
    }
  }else{
    if(rNum<=rs.length){
      this.curr=this.responses.Values[rNum-1];
      return this.curr;
    }
  }
  return this.confusion;
};
Discussion.prototype.isBlocked=function(room){
  var say= this.blocked.getVal(room);
  if(say!==false){
    return true
  }else{
    return false;
  }
}
Discussion.prototype.block=function(room){
  return this.blocked.getVal(room);
}
Discussion.prototype.addSaying=function(saying, options){
  this.sayings.add(saying,options);
}

var presDisc=new Discussion(new JSdict(),new JSdict(),"The president's brow furrowed, &quot;I have no idea what that means&quot;")
presDisc.addSaying("Well, Jim, are you scared?",["Yes.","No."]);
