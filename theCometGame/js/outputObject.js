var OutputObject=function(outs,cls="",tp=0){
  this.cls=cls; //class for formatting
  this.type=tp; //nums 0-paragraph, 1-ordered list
  this.outputs=outs; // if in list form, then 1st in list is header.
}
OutputObject.prototype.getCls=function(){
  if (this.cls!=""){
    return " class='"+this.cls+"' ";
  }
  return this.cls;
}
OutputObject.prototype.isList=function(){
  return this.type==1 || this.type==2;
}
OutputObject.prototype.getHeader=function(){
  return this.outputs[0];
}
OutputObject.prototype.getListType=function(){
  if(this.type==1){
    return "ol";
  }else if (this.type==2) {
    return "ul";
  }else{
    throw "Error- output object not in list format.";
  }
}
OutputObject.prototype.represent=function(lineStarter=""){
  var out="";
  var l=""
  if (this.type==0){
    if(typeof this.outputs==='string'){
      return "<p"+this.getCls()+">"+lineStarter+this.outputs+"</p>"
    }
    for(var i in this.outputs){
      var l="";
      if(i==0){
        l=lineStarter;
      }
      out+="<p"+this.getCls()+">"+l+this.outputs[i]+"</p>";
    }
  }else if(this.isList()){
    out+=this.repList(this.outputs.slice(1),this.getCls());
  }
  return out;
};
OutputObject.prototype.repList=function(list,cls=""){
  var out="<"+this.getListType()+cls+">";
  for(let el of list){
    if(typeof el !== 'string'){
      out+=this.repList(el);
    }else{
      out+="<li>"+el+"</li>";
    }
  }
  return out+"</"+this.getListType()+">"
};
