var widthFix=function(e){
  /*
  if(window.innerWidth<544){
    $("#navItems").removeClass("pushRight");
    $("#navItems").addClass("vertNav");
    $("#firstNav").addClass("clear");
  }else{
    $("#navItems").addClass("pushRight");
    $("#navItems").removeClass("vertNav");
    $("#firstNav").removeClass("clear");
  }
  */
}

var heightFix=function(e){
  $("#mainContent").height(window.innerHeight - $("#navContainer").height());
}

var overlayIsOpen=function(){
  return !($(".overlay.active").length==0)
}

var openOverlay=function(e){
  changeCurrentNav(e.target);
  if(!overlayIsOpen()){
    var overlay=$(e.target).attr("href");
    if(overlay=="#"){
      overlay="#home"
    }
    $(overlay).removeClass("inactive").addClass("active");
  }else{
    console.log("closing an overlay")
    $(".overlay.active").addClass("inactive").removeClass("active");
    var overlay=$(e.target).attr("href");
    if(overlay=="#"){
      overlay="#home";
    }
    $(overlay).removeClass("inactive").addClass("active");
  }
}

var closeOverlay=function(e){
  changeCurrentNav(e.target)
  var overlay=$(e.target).attr("href");
  if(overlay=="#"){
    overlay="#home";
  }
  $(overlay).addClass("inactive").removeClass("active");
}

var changeCurrentNav= function(el){
  console.log(el);
  $(".nav-link").removeClass("active");
  $(".nav-item .nav-link[href='"+$(el).attr("href")+"']").addClass("active");
}

var readMore= function(e){
  $(e.target).siblings
}
//borrowed from codepen
$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 100;  // How many characters are shown by default
    var ellipsestext = "...&nbsp;";
    var moretext = "See more >";
    var lesstext = "< See less";


    $('.more').each(function() {
        var c = '<span class="moreellipses">' + ellipsestext+
        '</span>&nbsp;<a class="morelink" href="#">'+
        moretext + '</a>';
        $(this).append(c);
    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
          $($(this).parent().siblings("p")[0]).append($('<span class="moreellipses"></span>').html(ellipsestext));
          $($(this).parent().siblings("p")[0]).append(this);
          $(this).removeClass("less");
          $(this).html(moretext);
          $(this).parent().siblings("p").css("display","none");
        } else {
          $($(this).siblings("span")[0]).remove();
          $($(this).parent().siblings("p")[$(this).parent().siblings("p").length-1]).append(this);
          $(this).addClass("less");
          $(this).html(lesstext);
          $(this).parent().css("display","block")
          $(this).parent().siblings().css("display","block");
        }
        return false;
    });
});
