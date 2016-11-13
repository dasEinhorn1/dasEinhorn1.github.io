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
  if(params==[]){
    printOrderedList(room.describeContainers())
  }
  params.join(" ");
  printParagraph("not yet implemented","error");
}

var go= function(params,world){
  if(params.length<1){
    printParagraph("Exits:","descriptive locator");
    printOrderedList(world.currentRoom.getExitNames(),"descriptive locator");
  }else{
    var enterText=world.playerEnters(params.join(" "));
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
  }else if(comm=="say"){
    say(params,window.w);
  }else if (comm=="go") {
    go(params,window.w);
  }else if(comm=="look"){
    look(params,window.w);
  }else if (comm=="search"){
    search(params,window.w);
  }else if (comm=="") {
    return;
  }else{
    printParagraph("That isn't a command. Type help for help","error descriptive");
  }
}