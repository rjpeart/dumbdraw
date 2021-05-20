var x;
var y;
var z;
var px;
var py;
var pz;
var size;
var velX;
var velY;
var trace;
var colour;
var dragging = false;

function setup(){
	colorMode(HSL, 255);
	
	canvas = createCanvas(windowWidth, windowHeight);
	
	//on drag, update the ellipse colour
	canvas.touchMoved(ellipseColour);
	
	//on touch, update the canvas colour
	canvas.touchEnded(canvasColour);
	
	//reset the drag listener to false, to prevent every touch resetting the background
	canvas.touchStarted(function(){
		dragging = false;
	});

	//starting background is black
	
	
	//center the point and give is a diameter of 1
	x = windowWidth/2;
	y = windowHeight/2;
	z = 1;

	//set the starting velocity at 0 to make calculations easier
	velX = 0;
	velY = 0;
	velZ = 0;

	//initiate objects
	trace = new Circles();

	//starting colour
	colour = 255;
	// let col = color(25, 23, 200, 50);
	// let button = createButton('submit');
	// button.style('opacity', 0.5);
	// button.position(0,0);
	// button.size(windowWidth,windowHeight);
	// button.mousePressed(begin);

};

function draw(){

			trace.addForces();
			trace.display();

    	}

function Circles(){
	this.x = x;
	this.y = y;
	this.diameter = 7;

	this.addForces = function(){

		//calculate your velocities from accelerometer data
		//Dividing it out so it fits on iPhone screen.
		velX = velX - (accelerationX*1/60)/1.25;
		velY = velY + (accelerationY*1/60)/1.25;
		velZ = velZ + (accelerationZ*1/60)/1.25;

		//set velocity to zero if you're not accelerating.
		//stops it getting wild.
		if (-0.1 < accelerationX && accelerationX < 0.1){
			velX=0;
		};

		if (-0.1 < accelerationY && accelerationY < 0.1){
			velY=0;
		};

		if (-0.1 < accelerationZ && accelerationZ < 0.1){
			velZ=0;
		};

		//dynamic size of ellipse based on Z acceleration
		size = map(velZ, -1, 1, 1, 25);
		
		//position readings before they get updated
		px = x;
		py = y;
		pz = z;

		//the xyz position changes as the acceleration accumulates.
		x = x + velX;
		y = y + velY;
		z = z + velZ;
		
		//this wraps the line as it hits the edge of the screen
		if (x>windowWidth){
			x = 0;
			//strokeWeight(0);
		};

		if (x<0){
			x = windowWidth;
			//strokeWeight(0);
		};

		if (y>windowHeight){
			y=0;
			//strokeWeight(0);
		};

		if (y<0){
			y = windowHeight;
			//strokeWeight(0);
		};

		if (z>windowHeight){
			z=0;
			//strokeWeight(0);
		};

		if (z<0){
			z = windowHeight;
			//strokeWeight(0);
		};

	};

	this.display = function(){
		strokeWeight(0);
		stroke(colour,255, brightness-20, 255);
		fill(colour, 255, brightness, 255);
		ellipse(x, y, size,size);
	};

}

function ellipseColour(){
	//set dragging to true
	dragging = true;

	//update the ellipse colour
	colour = map(touchX, 0, windowWidth, 0, 255);
	brightness = map(touchY, 0, windowHeight, 0, 255);

	};

function canvasColour(){

	//first check if dragging is in progress
	//if it is, then don't do anything.
	if (dragging)
		return;

	//if no dragging is going on, then reset the background colour.
	noStroke();
	background(colour,255,brightness,255);
	
	};


function begin() {
  console.log('pressed')
  var intro = document.getElementById("int");
  intro.style.cssText += 'display:none;';
  DeviceMotionEvent.requestPermission();
  button.hide();	
}


	



