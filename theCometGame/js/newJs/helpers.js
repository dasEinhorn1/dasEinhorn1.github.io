function deleteFromArray(array,i){
  if(i>=0 && i<array.length){
    var a=array.slice(0,i),
        b=array.slice(i+1);
    return a.concat(b);
  }else{
    throw "Error: list index out of range";
  }
}
function removeFromArray(array, el){
  var ind=array.indexOf(el);
  return deleteFromArray(array,ind);
}
function indexByName(array,name){
  for(i in array){
    if(array[i].name==name){
      return i;
    }
  }
  return -1;
}
function findByName(array,name,caseSense=true){
  for(i in array){
    var n1=(caseSense) ? array[i].name:array[i].name.toUpperCase();
    var n2=(caseSense) ? name:name.toUpperCase();
    if(n1==n2){
      return array[i];
    }
  }
  return null;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function removeByName(array,name){
  console.log("removeByName");
  try{
    return deleteFromArray(array,indexByName(array,name));
  }catch(e){
    if(e!="Error - list index out of range"){
      throw "Error: unable to remove "+name+" from array";
    }
    return array;
  }
}

function getNames(objects){
  var tempA=[]
  for(let ob of objects){
    tempA.push(ob.name);
  }
  return tempA;
}
function getNamesWithDesc(objects){
  var tempA=[]
  for(let ob of objects){
    tempA.push(ob.name+"-- "+ob.description);
  }
  return tempA;
}
function isInt(string){
  return !isNaN(parseInt(string));
}

function printParagraph(text,cls=""){
  if(typeof text==='string'){
    return printParagraph(text.split("\n"),cls);
  }else{
    var count=0;
    for(let para of text){
      var outArea=document.getElementById("outputArea");
      var p= document.createElement("P");
      slowPrint(para,p);
      if(cls!=""){
        p.className= cls;
      }if(text.length>1){
        p.className+= (count>0) ? " addP":" firstP";
      }
      outArea.appendChild(p);
      count++;
    }
    var elem = document.getElementById('outputArea');
    elem.scrollTop = elem.scrollHeight;
    return;
  }
}

function printOrderedList(text,cls=""){
  printList(text,cls);
  var elem = document.getElementById('outputArea');
  elem.scrollTop = elem.scrollHeight;
  return;
}
function printUnorderedList(text,cls=""){
  printList(text,cls,"ul");
  var elem = document.getElementById('outputArea');
  elem.scrollTop = elem.scrollHeight;
  return;
}
function printList(list,cls,type="ol",parent=document.getElementById("outputArea")){
  console.log(list);
  var oul=document.createElement(type);
  parent.appendChild(oul);
  if (cls!=""){
    oul.className=cls;
  }
  for(let el of list){
    if(typeof el ==='string'){
      var li=document.createElement("LI");
      oul.appendChild(li);
      slowPrint(el,li);
    }else{
      oul.appendChild(printList(el,cls,"ul",oul));
    }
  }
  return oul;
}

function printInput(text){
  printParagraph(["\>\> "+text],"")
}
function printDivider(text,cls=""){
  var divider=document.createElement("p");
  divider.innerHTML=text;
  divider.className=cls+" divider";
  document.getElementById("outputArea").appendChild(divider);
}

function slowPrint(text,target){
  if (text.length<1){
    return;
  }else{
    target.innerHTML += text[0];
  }
  slowPrint(text.slice(1),target);
}

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
