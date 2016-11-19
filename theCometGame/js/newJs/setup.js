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

var exits={
  //0. bank steps to lobby, stage 0
  steps2Lobby:new Exit("Doors to Bank Lobby","You followed the president into the bank.\n Of course he wanted you to go down to the lower vaults. "+
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
  lobby2Steps:new Exit("Doors to Bank Steps","You pushed through the doors to the bank steps. You just needed to get out of there-- away from those bodies.",
    function(world){
      if (world.stage==0){
        return "The president was watching. You're black. He's white. Do not cross him.";
      }else{
        return true;
      }
    }
  ),

  //2. bank lobby to president's office
  lobby2Pres:new Exit("Door to president's office","The door clicked open. You carefully stepped inside.",
    function(world){
      if(world.stage==0){
        return "The president's secretary stopped you. \"Jim the president told you to go to the vaults. Get along now.\"";
      }else{
        return true;
      }
    }
  ),

  //3. president's office to bank lobby
  pres2Lobby:new Exit("Door to bank lobby", "You frantically flung the door open and rushed back into the lobby."),

  //4. bank lobby to vault clerk's office
  lobby2Clerk:new Exit("Entrance to vault clerk's office", "You entered the vault clerk's office.",
    function(world){
      if (world.stage>0){
        return "You did not want to go back in there.";
      }
      return true;
    }
  ),
  //5. vault clerk's office to bank lobby
  clerk2Lobby:new Exit("Door to bank lobby","You needed to get help. You ran from the vault clerk's office.",
    function(world){
      if(world.stage<1){
        return "Better to just get this over with.";
      }else{
        return true;
      }
    }
  ),
  //6. vault clerk's office to Lower Vaults
  clerk2Vault:new Exit("Door to lower vaults","You opened the great iron door with the vault key, and passed silently down the stairs.\n"+
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
  vault2Clerk:new Exit("Door to vault clerk's office","You slammed open the door and scrambled into the vault clerk's office.",
    function(world){
      if (world.stage>0){
        return true;
      }else{
        return "You didn't want to turn back without those records."
      }
    }
  ),
  //8. Restart
  vault2Secret: new Exit("False Wall?","You pushed hard against the wall, and suddenly the whole black wall swung as on mighty hinges, and blackness yawned beyond. "+
    "You peered in; it was evidently a secret vault — some hiding place of the old bank unknown in newer times. You entered hesitatingly.",
    function(world){
      if(world.stage==2){
        console.log("What")
        return true;
      }else{
        world.stage+=1;
        return "The wall seemed to give a bit as you threw yourself against it. Try again.";
      }
    }
  ),
  secret2Vault: new Exit("Exit to Lower Vault","\"Boom!\"\nA low, grinding, reverberating crash struck upon your ear as you emerged from the secret vault. "+
    "You started up and looked about. All was black and still. You groped for your light and swung it about you. Then you knew! The great door had swung to."+
    "You were trapped in the lower vaults."
  )
}
var items={
  vaultKey:new Item("Vault Key","It was large, cold, and slightly rusted."),
  gold:new Item("Gold","You took the gold. It shined in your hands"),
  ironBar:new Item("Iron Bar", "It was heavy, coated in a thick layer of mildew and slime, but it would certainly come in handy."),
  sunglasses:new Item("Special sunglasses","They were metallic with a small horizontal slit on each metal eye covering. What a strange fashion choice..."),
  blackBox: new Item("Black box","Etched into it were the words \"DATA THIEF\" Whatever that meant..."),
  record1: new Item("Record: 1900-1901","It had collected dust for years. The title peeked through layers of dust: \"BANK RECORDS: 1900-1901\""),
  record2: new Item("Record: 1901-1902","It had collected dust for years. The title peeked through layers of dust: \"BANK RECORDS: 1901-1902\""),
  presCode: new Item("President's code", "His secretary had written something at the top of the note:\"SAFE CODE: 28 42 9\""),
  nyTimes: new Item("New York Times","\"Danger!\" screamed its black headlines, \"Warnings wired around the world. The Comet's tail sweeps past us at noon. "+
    "Deadly gases expected. Close doors and windows. Seek the cellar\""),
  food: new Item("Gourmet food","It was a gourmet meal--one you never could've gotten before the apocalypse."),
  natEnquirer: new Item("\"President Harding A Criminal?\" its headline read. \"The Federal Bureau of Investigation has recovered a new batch "+
    "of highly classified mail sent by Harding to fellow leadership from his personal post office! "+
    "Despite having denied the severity of this blunder, Harding will face criminal charges once the next administration takes office.\""),
  juliaPhoto: new Item("Photo of Julia","Julia standing and a man about her age. They looked happy..."),
  carKey: new Item("Car key","What kind of luxury car did this belong to?"),
  babyPhoto: new Item("Baby Photo", "There she was--your baby girl. Hopefully she didn't have to suffer."),
  wifePhoto: new Item("Wedding Photo", "They took this on your wedding day. Nothing fancy, but you can tell howmuch she loved you from the look on her face. Now you were alone."),
  elevatorKey:  new Item("Elevator Key", "It was a key, nothing exciting. Go use it already."),
  juliaNote: new Item("Note for Julia","\"Dear Daughter:\" it read. \"I have gone for a hundred-mile spin in Fred's new Mercedes. "+
    "Shall not be back before dinner. I'll bring Fred with me. --J.B.H.\""),
  largeRug: new Item("Large rug","It was a large, ornate rug, big enough to keep you both warm."),
  blazer: new Item("Blazer","It was a bit small for you, but it would keep Julia warm."),
  coat: new Item("Coat","It fit perfectly. No worries about being cold now."),
  mConn:new Item("Strange album","\"Parliament: Mothership Connection.\" Never heard of it… The man on the album cover had the strangest outfit"+
    "-- some chrome colored getup. He seemed to be sliding out of the door of a flying saucer."),
  bills: new Item("Roll of bills", "Their attempt to turn your good will into a business transaction. Still, it was good money--about $60.")
}
var containers = {
  feChest:new Container("Iron chest","You began to pry with your iron bar. The rust had eaten a hundred years, and it had gone deep."+
  " Slowly, wearily, the old lid lifted, and with a last, low groan lay bare its treasure — and you saw the dull sheen of gold!",
    function(world){
      if(world.player.items.includes(items.ironBar)){
        return true;
      }else{
        return "You pull, barehanded, on the lid of the chest. It doesn't budge. Maybefind something to pry it open...";
      }
  }),
  preSafe:new Container("President's Safe","You turned the dial carefully. 28. 42. 9... Click! The safe opened.",
    function(world){
      if(world.player.items.includes(items.presCode)){
        return true;
      }else{
        return "This was quality lock. You would need to find the poor bastard's code to open it.";
      }
    }
  )
};
rooms[2].addItem(items.vaultKey);
containers.preSafe.addItem(items.sunglasses)
rooms[3].addContainer(containers.preSafe);
w.addRooms(rooms);
w.linkRooms(0, 1, exits.steps2Lobby,exits.lobby2Steps);
w.linkRooms(1, 3, exits.lobby2Pres,exits.pres2Lobby);
w.linkRooms(1, 2, exits.lobby2Clerk,exits.clerk2Lobby);
w.linkRooms(2, 4, exits.clerk2Vault,exits.vault2Clerk);
w.linkRooms(4, 5, exits.vault2Secret, exits.secret2Vault);
w.setCurrentRoom(0);
