function deleteFromArray(array,i){
  var tempA=[];
  if(i<array.length-1){
    for(var j in array){
      if (j!=i){
        tempA.push(array[j]);
      }
    }
  }else{
    throw "Error - list index out of range";
  }
  return tempA;
}
function removeFromArray(array, el){
  array.find()
  return tempA;
}
