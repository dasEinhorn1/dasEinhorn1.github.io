function div_pc() {
    $("#outputArea").css('height', '' + Math.round(.8 *(window.innerHeight-54.4))-50);
    $("#inputArea").css('height',''+ Math.round(.2*(window.innerHeight-54.4))-50);
}

$(document).ready(function() {
    div_pc();
    $(window).bind('resize', div_pc);
    $("#inputArea").on("submit",takeCommand);
});

window.w=new World();
var rooms=[
  //0. bank steps
  new Room("Bank steps", "You stood on the steps of the bank, "+
  "watching the human river that swirled down Broadway. Few noticed you. Few ever noticed you save in a way that stung.... "+
  "Bits of the words of the walkers came to you.\n\"The comet?\"\n'The comet--'\nEverybody was talking of it. Even the president,"+
  " as he arrived, smiled patronizingly at you, and asked: \"Well, Jim, are you scared?\"\n\"No,\" you said shortly.\n"+
  "\"I thought we'd journeyed through the comet's tail once,\" broke in the junior clerk affably.\n\"Oh that was Haley's,\""+
  "said the president. \"This is a new comet, quite a stranger they say--wonderful, wonderful! I saw it last night....\"\n"+
  "He turned to you. \"Oh, by the way Jim, I want you to go down into the vaults today,\" he said as he walked into the bank."),
  //1. bank lobby
  new Room("Bank Lobby","The lobby was already packed with people. The president spoke over his shoulder as he moved away from you toward his office."+
  "\"Everything of value has been moved out since the water began to seep in, but we miss two volumes of old records. Suppose you nose around there--"+
  "it isn't very pleasant I suppose....\"\n\"Not very,\" you said."),
  //2. vault clerk's office
  new Room("Vault Clerk's Office","The vault clerk sat at his desk, smiling as you approached.\"Well, Jim, the tail of the new comet hits us at noon "+
  "this time\" he said, placing the Vault Key in front of you."),
  //3. president's office
  new Room("President's office", "The president was hunched over dead on his desk. Behind him, embedded in the wall, was a small safe."),
  //4. Lower Vaults
  new Room("Lower Vaults","Here at last was peace. You groped moodily forward as a great rat leapt past you and cobwebs crept across your face. "+
  "You felt carefully around the room. Nothing but an iron bar on the floor. At the far end, the wall felt different. You pounded and pushed and pried. Nothing."),
  //5. Secret Vaults
  new Room("Secret Vault","It was a long, narrow room with shelves, and at the far end an old iron chest. It was old, strong, and rusty.")
]

var exits=[
  //0. bank steps to lobby, stage 0
  new Exit("Doors to Bank Lobby","You followed the president into the bank.\n Of course he wanted you to go down to the lower vaults. "+
  "It was too dangerous for more valuable men.",
    function(world){
      if (world.stage<1){
        return true;
      }else{
        return "You don't want to get caught with all of those bodies lying around. They would lynch you for sure.";
      }
    }
  ),

  //1. bank lobby to bank steps
  new Exit("Doors to Bank Steps","You pushed through the doors to the bank steps. You just needed to get out of there-- away from those bodies.",
    function(world){
      if (world.stage==0){
        return "The president was watching. You're black. He's white. Don't cross him.";
      }else{
        return true;
      }
    }
  ),

  //2. bank lobby to president's office
  new Exit("Door to president's office","The door clicked open. You carefully stepped inside.",
    function(world){
      if(world.stage==0){
        return "The president's secretary stopped you. \"Jim the president told you to go to the vaults. Get along now.\"";
      }else{
        return true;
      }
    }
  ),

  //3. president's office to bank lobby
  new Exit("Door to bank lobby", "You frantically flung the door open and rushed back into the lobby."),

  //4. bank lobby to vault clerk's office
  new Exit("Entrance to vault clerk's office", "You entered the vault clerk's office.",
    function(world){
      if (world.stage>0){
        return "You did not want to go back in there.";
      }
      return true;
    }
  ),
  //5. vault clerk's office to bank lobby
  new Exit("Door to bank lobby","You needed to get help. You ran from the vault clerk's office.",
    function(world){
      if(world.stage<1){
        return "Better to just get this over with.";
      }else{
        return true;
      }
    }
  ),
  //6. vault clerk's office to Lower Vaults
  new Exit("Door to lower vaults","You opened the great iron door with the vault key, and passed silently down the stairs.\n"+
  "Down you went beneath Broadway, where the dim light filtered through the feet of hurrying men; down to the dark basement beneath; "+
  "down into the blackness and silence beneath that lowest cavern. Here with your dark lantern you groped in the bowel of the earth, under the world.",
    function(world){
      if(world.player.hasItem("Vault Clerk's Key")){
        return true;
      }else{
        return "The vault clerk looked at you confused, \"Um... Jim? You forgot to take the key.\"";
      }
    }
  ),
  //7. Vault Stairs to vault clerk's office
  new Exit("Door to vault clerk's office","You slammed open the door and scrambled into the vault clerk's office.",
    function(world){
      if (world.stage>0){
        return true;
      }else{
        return "You didn't want to turn back without those records."
      }
    }
  ),
  //8. Restart
  new Exit("End of demo","More coming soon!",
    function(world){return "End of demo";}
  )
]
var items=[
  new Item("Vault Key","You took the key off from the vault clerk. It was large, cold, and slightly rusted."),
  new Item("Gold","You took the gold. It shined in your hands"),
  new Item("Iron Bar", "You picked up the iron bar. It was heavy--but not so heavy that you couldn't lift it--and covered in a thin layer of mildew from sitting on the floor of the vault for so long.")
]
rooms[2].addItem(items[0]);
w.addRooms(rooms);
w.linkRooms(0, 1, exits[0],exits[1]);
w.linkRooms(1, 3, exits[2],exits[3]);
w.linkRooms(1, 2, exits[4],exits[5]);
w.linkRooms(2, 4, exits[6],exits[7]);
w.linkRooms(4, 0, exits[8],exits[8]);
w.setCurrentRoom(0);
