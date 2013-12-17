var bodyCSS = "0px 0px";
var backgroundCSS = "0px 0px";
var contentCSS = "translate3d( 0,0,0 );";

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
 
    var increment = 15;
    var xPosition = -100 - (gamma * increment);
    var yPosition = -100 - (beta * increment)*2;
    
    bodyCSS = xPosition + "px " + yPosition + "px";
    backgroundCSS = "translate3d( " + (xPosition) + "px, " + (yPosition) + "px, " + " 0px)";
    
    
    var xPosition = -(gamma * increment);
    var yPosition = -(beta * increment);
    contentCSS = "translate3d( " + (-xPosition) + "px, " + (-yPosition) + "px, " + " 0px)";
    
    //for debugging only
    //$(".content").html( "A:" + event.alpha + "<br/>B:" + event.beta + "<br/>G:" + event.gamma+ "<br/>_:" + event.absolute );
}

function render() {
    window.requestAnimationFrame( render );
    $("body").css( "background-position", bodyCSS);
    $(".background").css( "-webkit-transform", backgroundCSS);
    $(".content").css( "-webkit-transform", contentCSS);
}

render();