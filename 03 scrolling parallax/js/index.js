var bodyCSS = "0px 0px";
var bodyPosition = {x:0,y:0}
var cloudsCSS = "0px 0px";
var contentCSS = "translate3d( 0,0,0 );";
var depth = 0;
var depthPosition = 0;
var targetDepthPosition = 0;
var positionIncrement = 300;
var lastCSS = "";

window.ondeviceorientation = function(event) {
    gamma = event.gamma/90;
    beta = event.beta/180;
    var temp = 0;
    
    switch (window.orientation) {
        case 90: 
            temp = gamma;
            gamma = beta;
            beta = temp;
            break;
        case -90: 
            temp = -gamma;
            gamma = beta;
            beta = temp;
            break;
    }
 
    var increment = 30;
    var xPosition = -100 - (gamma * increment)/2;
    var yPosition = -100 - (beta * increment);
    
    bodyPosition.x = xPosition;
    bodyPosition.y = yPosition;
    
    
    var xPosition = -(gamma * increment);
    var yPosition = -(beta * increment);
    cloudsCSS = (-100+3*xPosition) + "px " + (-100+3*yPosition) + "px";
    
    contentCSS = "translate3d( " + (-xPosition) + "px, " + (-yPosition) + "px, " + " 0px)";
}

function render() {
    window.requestAnimationFrame( render );
    
    var depthDiff = targetDepthPosition - depthPosition;
    
    if ( Math.abs(depthDiff) < 1 ) {
        depthPosition = targetDepthPosition;  
    }
    else {
        depthPosition += depthDiff/6;
    }
    
    var bodyX = bodyPosition.x + depthPosition;
    bodyCSS = Math.round(bodyX) + "px " + Math.round(bodyPosition.y) + "px";
    
    if ( lastCSS != bodyCSS ) {
        $("body").css( "background-position", bodyCSS);
        $(".content").css( "-webkit-transform", contentCSS);
    }
    
}

function stepIn() {
    
    var nav = $("#navigation");
    var det = $("#details");
    var inner = $("#inner_details");
    
    switch (depth) {
        case 0:
            nav.addClass("left");
            det.removeClass("right");
            break
        case 1:
            det.addClass("left");
            inner.removeClass("right");
            break;
    } 
    depth++;
    targetDepthPosition = -depth * positionIncrement;
}

function setpOut() {
    
    var nav = $("#navigation");
    var det = $("#details");
    var inner = $("#inner_details");
    
    switch (depth) {
        case 1:
            nav.removeClass("left");
            det.addClass("right");
            break
        case 2:
            det.removeClass("left");
            inner.addClass("right");
            break;
    }
    depth--;
    targetDepthPosition = -depth * positionIncrement;
}

$(document).ready(function(){
    $("button.forward").tap(stepIn);
    $("button.back").tap(setpOut);
    render();
});