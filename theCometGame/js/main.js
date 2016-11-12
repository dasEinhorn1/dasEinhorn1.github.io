function div_pc() {
    $("#outputArea").css('height', '' + Math.round(.8 * window.innerHeight)-50);
    $("#inputArea").css('height',''+ Math.round(.2*window.innerHeight)-50);
}

$(document).ready(function() {
    div_pc();
    $(window).bind('resize', div_pc);
    $("#inputArea").on("submit",takeCommand);
    outputResults(look());
});
