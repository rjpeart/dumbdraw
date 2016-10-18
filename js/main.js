/*jslint browser: true*/
/*jslint plusplus: true */
/*global alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false, $, jQuery, window, key, PxLoader, PxLoaderImage, Swipe, mySwipe, $f, matchMedia*/

//=======================================================================
// For this boilerplate we are going to break your functions down in the following way:

// Technically we are storing anonymous functions within variables

// There are lots of different reasons for this but mainly it keeps the code dry
// helps in debugging. Either way is right or wrong to be honest, this is just a preference
// and helps with keeping code clean.

// This is was my go to for a while with smaller projects and when i'm not needing crazy
// functionality. There are some newer techniques but this is a great one to learn

// If you want to read more about this stuff go to http://kangax.github.io/nfe/

//=======================================================================

var bground_;

var app     = {};


// Global vars in here we can set up global variables 
// that we can update and access from within any function.

var config  = {
    windowWidth: $(window).width(),
    windowHeight: $(window).height(),
    pagePosition: $(document).scrollTop(),
    fadeSpeed : 250,
    slideSpeed: 500,
    easing: 'easeInOutSine',
    accX: 0,
    accY: 0,
    accZ: 0,
};


(function () {
    "use strict";

    // To Keep things neat let's separate out the functions to make them easier to find.

    //--------------------------
    // GLOBAL  FUNCTIONS 
    //--------------------------

    this.motion = function(event) {
        config.accX = "X: " + event.acceleration.x.toFixed(1);
        config.accY = "Y: " + event.acceleration.y.toFixed(1);
        config.accZ = "Z: " + event.acceleration.z.toFixed(1);

        $('.X').html(config.accX);
        $('.Y').html(config.accY);
        $('.Z').html(config.accZ);

    };

    this.go = function(){

        if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", app.motion, false);
        }else{
            console.log("DeviceMotionEvent is not supported");
        }
    };

    //--------------------------
    // NON TOUCH SPECIFIC  
    //--------------------------

    this.nonTouchFunction = function() {
        console.log('no touch');
    };


    //--------------------------
    // NON TOUCH SPECIFIC  
    //--------------------------

    this.touchDrag = function() {
        console.log('touch');
    };

    this.tap = function() {
        console.log('touch');
    };


    //--------------------------
    // RECALLED FUNCTIONS
    //--------------------------
    // I tend to ues thise to update global variables

    this.setWindowSizeVars = function() {
        config.windowWidth = $(window).width();
        config.windowHeight = $(window).height();
    };

    this.setDocScrollPos = function() {
        config.pagePosition = $(document).scrollTop();
    };



    //--------------------------
    // DEBUG FUNCTIONS
    //--------------------------
    // Only used for debuging / checking vars and so on

    this.debugingOutput = function(){

        $('.win-width').html(config.windowWidth);
        $('.win-height').html(config.windowHeight);
        $('.doc-scroll-pos').html(config.pagePosition);

    };

}).apply(app);

$(document).ready(function () {

    console.log('start');
    window.scrollTo(0,1);

    $('.bgcolour').minicolors(
    {
        format: 'rgb',
change: function(hex, opacity) {
                        var bg;
                        try {
                            bg = hex ? hex : 'transparent';
                        
                            bground_ = '"'+bg+'"';
                            //trace.updateColour();
                        } catch(e) {}

                        //$('.background').css("background-color", bg);
                    },
    });

    $('.ellipsecolour').minicolors(
    {
change: function(hex, opacity) {
                        var ellipse;
                        try {
                            ellipse = hex ? hex : 'transparent';
                            console.log(ellipse);
                        } catch(e) {}

                       // $('.background').css("background-color", ellipse);
                    },
    });
 


    // touch or non touch
    if (Modernizr.touch) {
        
        app.touchDrag();
        app.tap();

    } else {
        
    }

    // Debug stuff / example 
    app.debugingOutput();
    app.go();

    $('.save').click(function(){
        save();
    });

});

$(window).resize(function () {

    console.log('resize');

    app.setWindowSizeVars();

    // Debug stuff / example 
    app.debugingOutput();

});

$(document).scroll(function () {

    console.log('scroll');

    app.setDocScrollPos();

    // Debug stuff / example 
    app.debugingOutput();

});

$(document).keypress(function(e) {
    
console.log(e.which);
    
});





