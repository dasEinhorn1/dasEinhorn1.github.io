var widthFix=function(e){
  if(window.innerWidth<544){
    $("#navItems").removeClass("pushRight");
    $("#navItems").addClass("vertNav");
    $("#firstNav").addClass("clear");
  }else{
    $("#navItems").addClass("pushRight");
    $("#navItems").removeClass("vertNav");
    $("#firstNav").removeClass("clear");
  }
}

var heightFix=function(e){
  $(".overlay").height(window.innerHeight - $("#navContainer").height());
  $("#home").height(window.innerHeight - $("#navContainer").height());
}

var overlayIsOpen=function(){
  return !($(".overlay.active").length==0)
}

var openOverlay=function(e){
  changeCurrentNav(e.target);
  if(!overlayIsOpen()){
    var overlay=$(e.target).attr("href");
    if(overlay!="#"){
      $(overlay).removeClass("inactive").addClass("active");
    }
  }else{
    console.log("closing an overlay")
    $(".overlay.active").addClass("inactive").removeClass("active");
    var overlay=$(e.target).attr("href");
    if(overlay!="#"){
      $(overlay).removeClass("inactive").addClass("active");
    }
  }
}

var closeOverlay=function(e){
  changeCurrentNav(e.target)
  var overlay=$(e.target).attr("href");
  if(overlay!="#"){
    $(overlay).addClass("inactive").removeClass("active");
  }
}

var changeCurrentNav= function(el){
  console.log(el);
  $(".nav-link").removeClass("active");
  $(".nav-item .nav-link[href='"+$(el).attr("href")+"']").addClass("active");
}
