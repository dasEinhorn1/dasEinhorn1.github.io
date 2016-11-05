function div_pc() {
    $("#outputArea").css('height', '' + Math.round(.8 * window.innerHeight)-50);
    $("#inputArea").css('height',''+ Math.round(.2*window.innerHeight)-50);
}

$(document).ready(function() {
    div_pc();
    $(window).bind('resize', div_pc);
    $("#inputArea").on("submit",takeCommand);
    outputResult(look());
});


function takeCommand(e){
  e.preventDefault();
  var form=e.currentTarget;
  var comm=$(form).serializeArray()[0].value.split(" ");
  callCommand(comm[0],comm.slice(1));
  form.reset();
}

function callCommand(comm,params){
  console.log(comm,params);
  if(comm== 'help'){
    help();
  }else if(comm=="say"){
    outputResult(say(params));
  }else if (comm=="go") {
    outputResult(go(params));
  }else if(comm=="look"){
    outputResult(look(params));
  }else if (comm=="clear"){
    clearTerminal();
  }else if (comm=="") {
    return;
  }else{
    outputResult(commandNotFound(comm));
  }
}
function commandNotFound(comm){
  return ["No such command: <i>&quot;"+comm+"&quot;</i>","error"];
}

function clearTerminal(){
  var allPs=$("#outputArea").children("p,ol");
  for(var i=1;i<allPs.length;i++){
    $(allPs[i]).remove();
  }
}

function outputResult(outArr){
  if(outArr==null){
    return;
  }
  var lineStarter="<span>&gt;&gt;&nbsp;&nbsp;</span>";
  var cls= (outArr[1]!=undefined) ? "class="+outArr[1]:"";
  $("#outputArea").append("<p>"+lineStarter+"<span "+cls+">"+outArr[0]+"</span>"+"</p>");
  var elem = document.getElementById('outputArea');
  elem.scrollTop = elem.scrollHeight;
  return;
}

function help(){
  var helpText=
  "<ol class='system'>"+
  "<li> Commands:"+
    "<ul>"+
      "<li>help- prints important info on how to play</li>"+
      "<li>go &lt;destination&gt;- allows you to move from area to area in the game. To see "+
        "options for where you can go, use &quot;go&quot; without any destination after</li>"+
      "<li>look- describes your surroundings, including people and items with which to interact</li>"+
      "<li>say- allows you to say anything you want-- unless in conversation.</li>"+
      "<li>clear- clears the terminal of everything but the heading and subheading</li>"+
    "</ul>"+
  "</li>"+
  "<li> Movement:"+
    "<ul>"+
      "<li>Use <i>&quot;go&quot;</i> to navigate the world. Typing this without"+
      " any destination will list off the destinations you can go to.</li>"+
      "<li>You can go to a destination using <i>go</i> plus the name, or <i>go</i>"+
      " plus the number listed next to it as an option</li>"+
      "<li>Sometimes, you might have the option to go one way, but then you will"+
      " be blocked. It is okay! just find another way</li>"+
      "<li> If you enter a destination which doesn't exist, you'll stay right where you are.</li>"+
    "</ul>"+
  "</li>"+
  "<li> Conversation:"+
    "<ul>"+
      "<li>Use <i>&quot;say&quot;</i> to talk to people, or to yourself.</li>"+
      "<li>Whatever you type after say will be said in the game.</li>"+
      "<li>In converations, other characters will only understand preset phrases.</li>"+
      "<li>To see available preset phrases, use <i>say</i> with no other words after it.</li>"+
    "</ul>"+
  "</li>"+
  "<li> Items:"+
    "<ul><li>Not yet supported</li></ul>"+
  "</li>"+
  "</ol>";
  $("#outputArea").append("<p><span>&gt;&gt;&nbsp;&nbsp;Help Menu</span></p>");
  $("#outputArea").append(helpText);
}

function say(params){
  var words = params.join(" ");
  if(words==""){
    $("#outputArea").append(w.currentRoom.getSayings());
    return null;
  }else{
    outputResult(['<i>"'+words+'"</i>',undefined]);
    return w.currentRoom.respond(words);
  }
}

function go(params){
  if(params.join(" ")==""){
    return w.currentRoom.getExits()
  }
  return w.changeRooms(params.join(" "));
}

function look(params){
  return w.currentRoom.describe();
}
