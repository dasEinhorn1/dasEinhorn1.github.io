/*
  look prints all info about the current room
    1) description
    2) containers
    3) exits
*/
var look= function(params, world){
  var room= world.currentRoom;
  printParagraph(room.description,"descriptive");
  printParagraph("Exits:","descriptive locator listHead");
  printOrderedList(room.getExitNames(),"descriptive locator");
  if(room.npcs.length>0){
    printParagraph("People","descriptive talkTips listHead");
    printUnorderedList(room.getNpcDesciptions());
  }
}

var search=function(params, world){
  if(params.length<1){
    var nada1=false,
        nada2=false;
    var icList=world.currentRoom.search(world);
    if(icList[0].length!=0){
      printParagraph("Items:","descriptive listHead");
      printOrderedList(icList[0],"descriptive");
    }else{
      nada1=true;
    }if(icList[1].length!=0){
      printParagraph("Containers:","descriptive listHead");
      printOrderedList(icList[1],"descriptive");
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
    target=params.join(" ").toLowerCase();
    var items=world.currentRoom.search(world, target);
    if(typeof items != 'string'){
      printParagraph("Inside the "+target+" you found:","descriptive listHead");
      printUnorderedList(getNames(items),"descriptive");
      world.player.addItems(items);
      printParagraph("You cleared out the "+target+".","descriptive");
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
    printParagraph(item.description,"descriptive");
    return;
  }
}
var go= function(params,world){
  if(params.length<1){
    printParagraph("Exits:","descriptive locator listHead");
    printOrderedList(world.currentRoom.getExitNames(),"descriptive locator");
  }else{
    var enterText=world.playerEnters(params.join(" "));
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
      printOrderedList(items);
    }
  }
}
function takeCommand(e){
  e.preventDefault();
  var form=e.currentTarget;
  printInput($(form).serializeArray()[0].value.trim())
  var comm=$(form).serializeArray()[0].value.trim().split(" ");
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
