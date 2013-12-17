var bodyCSS = "0px 0px";
var cloudsCSS = "0px 0px";
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
 
    var increment = 30;
    var xPosition = -100 - (gamma * increment)/2;
    var yPosition = -100 - (beta * increment);
    
    bodyCSS = xPosition + "px " + yPosition + "px";
    
    var xPosition = -(gamma * increment);
    var yPosition = -(beta * increment);
    cloudsCSS = (-100+3*xPosition) + "px " + (-100+3*yPosition) + "px";
    contentCSS = "translate3d( " + (-xPosition) + "px, " + (-yPosition) + "px, " + " 0px)";
}

function render() {
    window.requestAnimationFrame( render );
    $("body").css( "background-position", bodyCSS);
    $(".content").css( "-webkit-transform", contentCSS);
    $(".clouds").css( "background-position", cloudsCSS);
}

render();