function div_pc() {
    $("#outputArea").css('height', '' + Math.round(.8 * window.innerHeight)-50);
    $("#inputArea").css('height',''+ Math.round(.2*window.innerHeight)-50);
}

$(document).ready(function() {
    div_pc();
    $(window).bind('resize', div_pc);
    $("#inputArea").on("submit",takeCommand);
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
    outputResult(help());
  }else if(comm=="say"){
    outputResult(say(params));
  }else if (comm=="go") {
    outputResult(go(params));
  }else if (comm=="") {
    return;
  }else{
    outputResult(commandNotFound(comm));
  }
}
function commandNotFound(comm){
  return [["The command: <i>&quot;"+comm+"&quot;</i> does not exist. Type 'help' for a list of commands you can use."],"system"];
}
function outputResult(outArr){
  var lineStarter="<span>&gt;&gt;&nbsp;&nbsp;</span>";
  var cls= (outArr[1]!=undefined) ? "class="+outArr[1]:"";
  for(var i in outArr[0]){
    $("#outputArea").append("<p>"+lineStarter+"<span "+cls+">"+outArr[0][i]+"</span>"+"</p>");
  }
  var elem = document.getElementById('outputArea');
  elem.scrollTop = elem.scrollHeight;
  return;
}

function help(){
  return [["No help for you yet..."],undefined];
}

function say(params){
  var words = params.join(" ");
  return([['You said: <i>"'+words+'"</i>'],undefined])
}

function go(params){
  return testRoom.enterText();
}

function look(params){
  return testRoom.describe();
}
