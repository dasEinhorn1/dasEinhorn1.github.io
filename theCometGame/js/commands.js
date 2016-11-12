function takeCommand(e){
  e.preventDefault();
  var form=e.currentTarget;
  var comm=$(form).serializeArray()[0].value.split(" ");
  callCommand(comm[0],comm.slice(1));
  form.reset();
}

function sectionHelper(title){
  var lText="------ "+title+" ------";
  var eText=""
  for(var i in lText){
    eText+='-';
  }
  return [lText,eText];
}

function callCommand(comm,params){
  console.log(comm,params);
  if(comm== 'help'){
    outputResult(help());
  }else if(comm=="say"){
    outputResult(say(params));
  }else if (comm=="go") {
    outputResult(go(params));
  }else if(comm=="look"){
    outputResults(look(params));
  }else if (comm=="clear"){
    clearTerminal();
  }else if (comm=="") {
    return;
  }else{
    outputResult(commandNotFound(comm));
  }
}
function commandNotFound(comm){
  return new OutputObject("No such command: <i>&quot;"+comm+"&quot;</i>","error");
}

function clearTerminal(){
  var allPs=$("#outputArea").children("p,ol,ul");
  for(var i=1;i<allPs.length;i++){
    $(allPs[i]).remove();
  }
}

function outputResult(outObj){
  console.log(outObj)
  if(outObj==null){
    return;
  }
  var lineStarter="<span class='lStart'>&gt;&gt;&nbsp;&nbsp;</span>";
  var cls= outObj.getCls();
  if(outObj.isList()){
    $("#outputArea").append("<p class='listHead'>"+lineStarter+"<span "+cls+">"+outObj.getHeader()+"</span>"+"</p>");
    $("#outputArea").append(outObj.represent());
  }else{
    $("#outputArea").append(outObj.represent(lineStarter));
  }
  var elem = document.getElementById('outputArea');
  elem.scrollTop = elem.scrollHeight;
  return;
}

function outputResults(outObjs){
  for(let o of outObjs){
    console.log(o)
    outputResult(o);
  }
}

function help(){
  var helpOut=["Help Menu",
    "Commands:",
    ["help- prints important info on how to play","go &lt;destination&gt;"+
      "- allows you to move from area to area in the game. To see options for where you can go, use "+
      "&quot;go&quot; without any destination after","look- describes your surroundings, including people "+
      "and items with which to interact","say- allows you to say anything you want-- unless in conversation.",
      "clear- clears the terminal of everything but the heading and subheading"
    ],
    "Movement:",
    [
      "Use <i>&quot;go&quot;</i> to navigate the world. Typing this without"+
      " any destination will list off the destinations you can go to",
      "You can go to a destination using <i>go</i> plus the name, or <i>go</i>"+
      " plus the number listed next to it as an option",
      "Sometimes, you might have the option to go one way, but then you will"+
      " be blocked. It is okay! just find another way",
      "If you try to enter a destination which doesn't exist, you'll stay right where you are."
    ],
    "Conversation:",
    [
      "Use <i>&quot;say&quot;</i> to talk to people, or to yourself.",
      "Whatever you type after &quot;say&quot; will be said in the game.",
      "In converations, other characters will only understand preset phrases.",
      "To see available preset phrases, use <i>say</i> with no other words after it."
    ],
    "Items:",["Not yet supported."]
  ];
  return new OutputObject(helpOut,"system",1);
}

function say(params){
  var words = params.join(" ");
  if(words==""){
    return new OutputObject(["Speech:",w.currentRoom.getSayings()],"talkTip",1);
  }else{
    outputResult(new OutputObject('<i>"'+words+'"</i>',"you"));
    return w.currentRoom.respond(words);
  }
}

function go(params){
  if(params.join(" ")==""){
    return new OutputObject(["Exits:",w.currentRoom.getExits()],"locator",1);
  }
  return w.changeRooms(params.join(" "));
}

function look(params){
  var leText=sectionHelper("You looked around");
  var tempA=w.currentRoom.describe();
  tempA.push(new OutputObject(leText[1],"descriptive"));
  tempA.unshift(new OutputObject(leText[0],"descriptive"));
  return tempA;
}
