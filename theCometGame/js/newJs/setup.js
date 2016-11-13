function div_pc() {
    $("#outputArea").css('height', '' + Math.round(.8 * window.innerHeight)-50);
    $("#inputArea").css('height',''+ Math.round(.2*window.innerHeight)-50);
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
  "Bits of the words of the walkers came to you.\n\"The comet?\"\n'The comet--'\nEverybody was talking about it."),
  //1. bank lobby
  new Room("Bank Lobby","It was not a big bank"),
  //2. vault clerk's office
  new Room("Vault Clerk's Office","The vault clerk sat at his desk, smiling as you approached."),
  //3. president's office
  new Room("President's office", "The president was hunched over dead on his desk."),
  //4. Vault Stairs
  new Room("Vault Stairs","Musty down here..."),
  //5. Lower Vaults
  new Room("Lower Vaults","The room was pretty bare...")
]

var exits=[
  //0. bank steps to lobby, stage 0
  new Exit("Doors to Bank Lobby","You followed the president into the bank.\nYou are tired",
    function(world){
      if (world.stage<1){
        return true;
      }else{
        return "You don't want to get caught with all of those bodies lying around...";
      }
    }
  ),

  //1. bank lobby to bank steps
  new Exit("Doors to Bank Steps","You pushed through the doors to the bank steps. You just needed to get out of there-- away from those bodies.",
    function(world){
      if (world.stage==0){
        return "The president was watching. Even though the vaults are bad, you didn't want to get fired.";
      }else{
        return true;
      }
    }
  ),

  //2. bank lobby to president's office
  new Exit("Door to president's office","The door clicked open. You carefully stepped inside.",
    function(world){
      if(world.stage==0){
        return "There was no reason to go into the president's office.";
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
  //6. vault clerk's office to Vault Stairs
  new Exit("Door to vault stairs","You unlocked the door to the vault stairs.\nDown you went.",
    function(world){
      if(player.hasItem("Vault Clerk's Key")){
        return true;
      }else{
        return "The vault clerk looked at you confused, \"Um... Jim? You forgot to take the key.\"";
      }
    }
  ),
  //7. Vault Stairs to vault clerk's office
  new Exit("Door to vault clerk's office","You slammed open the door and scrambled into the vault clerk's office",
    function(world){
      if (world.stage>0){
        return true;
      }else{
        return "You didn't want to turn back without those records."
      }
    }
  )
]
var items=[]
w.addRooms(rooms);
w.linkRooms(0, 1, exits[0],exits[1]);
w.linkRooms(1, 3, exits[2],exits[3]);
w.linkRooms(1, 2, exits[4],exits[5]);
w.linkRooms(2, 4, exits[6],exits[7]);
w.setCurrentRoom(0);
