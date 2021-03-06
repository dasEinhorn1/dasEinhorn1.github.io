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
  new Room("Secret Vault","It was a long, narrow room with shelves, and at the far end an old iron chest. A network of cobwebs, caught in the dim light of your lantern,"+
  " wove across the ceiling above. Small white spiders retreated into it, fearful of the light which they had lived so long without. "),
  //6. Wall Street
  new Room("Wall St.", "How silent the street was! Not a soul was stirring, and yet it was high-noon — Wall Street? Broadway? He glanced almost wildly up and down, then "+
  "across the street, and as he looked, a sickening horror froze in his limbs. With a choking cry of utter fright he lunged, leaned giddily against the cold building, "+
  "and stared helplessly at the sight.\nIn the great stone doorway a hundred men and women and children lay crushed and twisted and jammed, forced into that great, "+
  "gaping doorway like refuse in a can — as if in one wild, frantic rush to safety, they had rushed and ground themselves to death. Slowly the messenger crept along "+
  "the walls, wetting his parched mouth and trying to comprehend, stilling the tremor in his limbs and the rising terror in his heart. He met a business man, silk-hatted "+
  "and frock-coated, who had crept, too, along that smooth wall and stood now stone dead with wonder written on his lips. The messenger turned his eyes hastily away and "+
  "sought the curb. A woman leaned wearily against the signpost, her head bowed motionless on her lace and silken bosom. Before her stood a street car, silent, and within "+
  "— but the messenger but glanced and hurried on. A grimy newsboy sat in the gutter with the “last edition” in his uplifted hand.")
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
        return "The president looked disapprovingly from his office. \"I am black,\" you said under your breath. \"I can't get away with leaving work like this.\"";
      }else{
        return "If you went out the front, someone might see you. You're black. No trial necessary. You'd somehow survived, you weren't about to throw it away.\n"+
        "Find another exit.";
      }
    }
  ),

  //2. bank lobby to president's office
  lobby2Pres:new Exit("Door to president's office","The door clicked open. You carefully stepped inside.",
    function(world){
      if(world.stage==0){
        return "The president's secretary stopped you. \"The president told you to go to the vaults. If he wanted to talk more, he'd have set up a meeting with you. Get along.\"";
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
      return true;
    }
  ),
  //5. vault clerk's office to bank lobby
  clerk2Lobby:new Exit("Door to bank lobby","You needed to get help. You ran from the vault clerk's office.",
    function(world){
      if(world.stage<1){
        return "\"Boy, the vaults are back there. Where are you going?\" The vault clerk said adjusting his spectacles as he peered over his paper at you.";
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
      if(world.player.hasItem("Vault Key")){
        return true;
      }else{
        return "The vault clerk looked at you confused.\"Pick up the vault key.\"";
      }
    }
  ),
  //7. Vault Stairs to vault clerk's office
  vault2Clerk:new Exit("Door to vault clerk's office","With a sigh you went methodically to work. Cold sweat stood on your forehead; "+
    "but you searched, pounded, pushed, and worked until after what seemed endless hours thi iron bar struck a cold bit of metal and the great "+
    "door swung again harshly on its hinges, and then, striking against something soft and heavy, stopped. You had just room to squeeze through.\n"+
    "There lay the body of the vault clerk, cold and stiff. You stared at it, and then felt sick and nauseated. The air seemed unaccountably foul, "+
    "with a strong, peculiar odor. You stepped forward, clutched at the air, and fell fainting across the corpse.",
    function(world){
      if (world.stage>2){
        return true;
      }else{
        return "You didn't want to turn back without those records."
      }
    }
  ),
  //8. Restart
  vault2Secret: new Exit("False Wall?","You pushed hard against the wall, and suddenly the whole black wall swung as on mighty hinges, and blackness yawned beyond. "+
    "You peered in; it was evidently a secret vault — some hiding place of the old bank unknown in newer times. You entered hesitatingly.",
    function(world,t=false){
      if(world.stage>0){
        return true;
      }else{
        if(t){
          world.stage+=1;
        }
        return "The wall seemed to give a bit as you threw yourself against it. Try again.";
      }
    }
  ),
  secret2Vault: new Exit("Exit to Lower Vault","\"Boom!\"\nA low, grinding, reverberating crash struck upon your ear as you emerged from the secret vault. "+
    "You started up and looked about. All was black and still. You groped for your light and swung it about you. Then you knew! The great door had swung to."+
    "You were trapped in the lower vaults.",
    function(world){
      if(world.player.items.includes(items.record2) && world.player.items.includes(items.record2)){
        world.stage=3;
        return true;
      }
      return "\"I am here for the records first. They must be in here somewhere,\" you thought to yourself as you backed away from the exit."
    }
  ),
  lobby2WallSt: new Exit("Side door to Wall St.","You glanced about, tiptoed cautiously to the side door, and again looked behind. Quietly you turned the latch and stepped out into Wall Street.",
    function(world){
      if(world.stage>2){
        return true;
      }
      return "The president looked disapprovingly from his office. \"I am black,\" you said under your breath. \"I can't get away with leaving work like this.\"";
    }
  ),
  wallSt2Lobby: new Exit("Side door to bank","You broke the game.",
    function(world){
      return "The door must have locked behind you... no more getting into the bank."
    }
  )
}
var items={
  vaultKey:new Item("Vault Key","It was coated in rust, but it would open the door to the lower vaults. "),
  gold:new Item("Gold","You took the gold. It shined in your hands"),
  ironBar:new Item("Iron Bar", "It was heavy, coated in a thick layer of mildew and slime, but it would certainly come in handy."),
  sunglasses:new Item("Special sunglasses","They were metallic with a small horizontal slit on each metal eye covering. What a strange fashion choice..."),
  blackBox: new Item("Black box","Etched into it were the words \"DATA THIEF\" Whatever that meant..."),
  record1: new Item("Record: 1900-1901","It had collected dust for years. The title peeked through layers of dust: \"BANK RECORDS: 1900-1901\""),
  record2: new Item("Record: 1901-1902","It had collected dust for years. The title peeked through layers of dust: \"BANK RECORDS: 1901-1902\""),
  presCode: new Item("President's code", "His secretary had written something at the top of the note:\"SAFE CODE: 28 42 9\""),
  nyTimes: new Item("Last Edition","\"Danger!\" screamed its black headlines, \"Warnings wired around the world. The Comet's tail sweeps past us at noon. "+
    "Deadly gases expected. Close doors and windows. Seek the cellar\""),
  food: new Item("Gourmet food","It was a gourmet meal--one you never could've gotten before the apocalypse."),
  natEnquirer: new Item("National Enquirer","\"President Harding A Criminal?\" its headline read. \"The Federal Bureau of Investigation has recovered a new batch "+
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
        return "You pulled, barehanded, on the lid of the chest. It didn't budge. You needed something to pry it open...";
      }
  }),
  shelves:[
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf."),
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf."),
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf."),
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf."),
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf."),
    new Container("shelf","You brushed back cobwebs to uncover the items on the old shelf.")
  ],
  secretary:new Container("The secretary","You did your best not to make eye contact with her as you took the note from her hand.",
    function(world){
      world.stage=5;
    }
  ),
  preSafe:new Container("President's Safe","You turned the dial carefully. 28. 42. 9... Click! The safe opened.",
    function(world){
      if(world.player.items.includes(items.presCode)){
        return true;
      }else{
        return "This was quality lock. You would need to find the poor bastard's code to open it.";
      }
    }
  ),
  newsboy:new Container("the newsboy","You pulled the newspaper from his grip. He reminded you of yourself. "+
  "You choked back tears as you closed his eyes and folded his arms over his chest.",
    function(world){
      if(world.currentRoom.containers[0].searched){
        return "You didn't want to disturb his body again.";
      }
      return true;
    }
  )
};
var int1=getRandomInt(0,6);
var int2=getRandomInt(0,6);
containers.shelves[int2].addItem(items.record1);
containers.shelves[int1].addItem(items.record2);
containers.secretary.addItem(items.presCode);
containers.newsboy.addItem(items.nyTimes);
rooms[2].addItem(items.vaultKey);
containers.feChest.addItems([items.gold,items.gold,items.gold,items.blackBox]);
rooms[5].addItem(items.ironBar);
rooms[5].addContainer(containers.feChest);
rooms[5].addContainers(containers.shelves);
rooms[6].addContainer(containers.newsboy);
containers.preSafe.addItem(items.natEnquirer);
rooms[3].addContainer(containers.preSafe);
w.addRooms(rooms);
w.linkRooms(0, 1, exits.steps2Lobby,exits.lobby2Steps);
w.linkRooms(1, 3, exits.lobby2Pres,exits.pres2Lobby);
w.linkRooms(1, 2, exits.lobby2Clerk,exits.clerk2Lobby);
w.linkRooms(2, 4, exits.clerk2Vault,exits.vault2Clerk);
w.linkRooms(4, 5, exits.vault2Secret, exits.secret2Vault);
w.linkRooms(1, 6, exits.lobby2WallSt, exits.wallSt2Lobby);
w.setCurrentRoom(0);
