/*
  look prints all info about the current room
    1) description
    2) containers
    3) exits
*/
var inputHistory = [],
    inputIndex=-1,
    modHist=false,
    currentIn="";
var look= function(params, world){
  var room= world.currentRoom;
  printParagraph(room.description,"descriptive");
  printParagraph("Exits:","descriptive locator listHead");
  printOrderedList(room.getExitNames(),"descriptive locator");
}

var search=function(params, world){
  if(params.length<1){
    printParagraph("You looked around","descriptive items");
    var nada1=false,
        nada2=false;
    var icList=world.currentRoom.search(world);
    if(icList[0].length!=0){
      printParagraph("You saw the following item(s):","descriptive items listHead");
      printOrderedList(icList[0],"descriptive items");
    }else{
      nada1=true;
    }if(icList[1].length!=0){
      printParagraph("You found the following container(s):","descriptive items listHead");
      printOrderedList(icList[1],"descriptive items");
    }else{
      nada2=true;
    }
    if(nada1 && nada2){
      printParagraph("You didn't find anything.","error")
    }else if(nada1){
      printParagraph("You didn't find any items.","error")
    }else if(nada2){
      printParagraph("You didn't find any containers.","error")
    }
  }else{
    var targetName=params.join(" ").toLowerCase();
    var target=null;
    if(isInt(targetName) && (parseInt(targetName)>0 && parseInt(targetName)<=world.currentRoom.containers.length)){
      target=parseInt(targetName)-1;
      targetName=getNames(world.currentRoom.containers)[parseInt(targetName)-1];
    }else{
      target=getNames(world.currentRoom.containers).findIndex(function(nm){
        return nm.toLowerCase()==targetName.toLowerCase();
      });
    }
    var items=world.currentRoom.search(world, target);
    if(typeof items != 'string'){
      printParagraph("From the "+targetName+" you took:","descriptive listHead");
      printUnorderedList(getNames(items),"descriptive");
      world.player.addItems(items);
      printParagraph("You cleared out the "+targetName+".","descriptive");
    }else{
      printParagraph(items,"descriptive error");
    }
  }
}
var take = function(params, world){
  if(params==[]){
    printParagraph("Specify what to take, or use search to take everything.","error")
    return;
  }
  var itemName=params.join(" ");
  var item=world.currentRoom.retrieveItem(itemName,null);
  if (item==null){
    printParagraph("You couldn't find it.","error")
    return;
  }else{
    world.player.addItem(item);
    printParagraph("You took the "+item.name.toLowerCase(),"system");
    printParagraph(item.description,"descriptive");
    return;
  }
}
var go= function(params,world){
  if(params.length<1){
    printParagraph("Exits:","descriptive locator listHead");
    printOrderedList(world.currentRoom.getExitNames(),"descriptive locator");
  }else{
    try{
      var enterText=world.playerEnters(params.join(" "));
    }catch(e){
      printParagraph("Not a valid exit.","descriptive error");
      return go([],world);
    }
    console.log(enterText);
    if(!world.updated){
      printDivider(world.currentRoom.name.toUpperCase(),"locator");
      printParagraph(enterText,"descriptive locator");
    }else{
      printParagraph(enterText,"descriptive error");
    }
    world.update();
  }
}

function help(params, world){
  printParagraph("Help Menu","system listHead");
  printOrderedList(["Commands:",
    ["help- prints important info on how to play","go \<destination\>"+
      "- allows you to move from area to area in the game. To see options for where you can go, use "+
      "\"go\" without any destination after","look- describes your surroundings, including people "+
      "and items with which to interact","say- allows you to say anything you want-- unless in conversation.",
      "clear- clears the terminal of everything but the heading and subheading"
    ],
    "Movement:",
    [
      "Use \"go\" to navigate the world. Typing this without"+
      " any destination will list off the destinations you can go to",
      "You can go to a destination using \"go\" plus the name, or go"+
      " plus the number listed next to it as an option",
      "Sometimes, you might have the option to go one way, but then you will"+
      " be blocked. It is okay! just find another way",
      "If you try to enter a destination which doesn't exist, you'll stay right where you are."
    ],
    "Conversation:",
    [
      "Use \"say\" to talk to people, or to yourself.",
      "Whatever you type after \"say\" will be said in the game.",
      "In converations, other characters will only understand preset phrases.",
      "To see available preset phrases, use \"say\" with no other words after it."
    ],
    "Items:",["Not yet supported."]
  ],"system");
}
var inventory= function(params,world){
  if(params.length<1){
    var items=getNamesWithDesc(world.player.items);
    if(items.length<1){
      printParagraph("Your inventory is empty.","error")
    }else{
      printParagraph("INVENTORY","listHead descriptive");
      printOrderedList(items,"descriptive");
    }
  }
}
function takeCommand(e){
  e.preventDefault();
  var form=e.currentTarget,
      data=$(form).serializeArray()[0].value.trim();
  if(data!="" && data!=inputHistory[0]){
    inputHistory.unshift(data);
    inputIndex=-1;
    if(inputHistory.length>20){
      inputHistory.pop();
    }
  }
  printInput(data)
  var comm=data.split(" ");
  callCommand(comm[0],comm.slice(1));
  form.reset();
}

function callCommand(comm,params){
  if(comm== 'help'){
    help();
  }else if(comm=="take"){
    take(params,window.w);
  }else if (comm=="go") {
    go(params,window.w);
  }else if(comm=="look"){
    look(params,window.w);
  }else if (comm=="search"){
    search(params,window.w);
  }else if (comm=="inventory") {
    inventory(params,window.w)
  }else if (comm=="") {
    return;
  }else{
    printParagraph("That isn't a command. Type help for help","error descriptive");
  }
}

function inputHelper(e){
  if(e.code=='ArrowUp' && inputHistory.length>0){
    if(inputIndex==-1 && !(e.currentTarget.value=="" || e.currentTarget.value==inputHistory[0] )){
      inputHistory.unshift(e.currentTarget.value);
      inputIndex+=1;
    }
    inputIndex+=1;
    console.log(inputIndex);
    console.log(inputHistory);
    if(inputIndex>=inputHistory.length){
      inputIndex=inputHistory.length-1;
    }
    e.target.value=inputHistory[inputIndex];
  }else if(e.code=='ArrowDown' && inputHistory.length>0){
    console.log(inputIndex);
    inputIndex-=1;
    console.log(inputIndex);
    console.log(inputHistory);
    if(inputIndex<0){
      inputIndex=-1;
      e.target.value="";
    }else{
      console.log(inputIndex);
      e.target.value=inputHistory[inputIndex];
    }
  }
}
