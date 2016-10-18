var x;
var y;
var z;
var px;
var py;
var pz;
var size;
var velX;
var velY;
var time;
var trace;
var bground;
var colour;
var timestart;
var timeend;
var timeDiff;
var timeListener = 0;

function setup(){
	colorMode(HSL, 255);
	canvas = createCanvas(windowWidth, windowHeight);
	//canvas.style("visibility", "visible")
	canvas.touchMoved(updateColour);
	background(0);
	
	//center the point and give is a diameter of 1
	x = windowWidth/2;
	y = windowHeight/2;
	z = 1;

	//set the starting velocity at 0 to make calculations easier
	velX = 0;
	velY = 0;
	velZ = 0;

	//starting colour black
	//col = 0;

	//time since the sketch started
	time = millis();

	trace = new Circles();
	//bground = color('rgb(0,0,250)');
	colour = 255;
};

function draw(){

		//calculate your velocities from accelerometer data
		//Dividing it out so it fits on iPhone screen.
		velX = velX - (accelerationX*1/60)/1.25;
		velY = velY + (accelerationY*1/60)/1.25;
		velZ = velZ + (accelerationZ*1/60)/1.25;

		//using this to get a dynamic colour
		//avg = (accelerationX+accelerationY+accelerationZ)/3;

		//set shit to zero if you're not accelerating.
		//stops shit getting wild.
		if (-0.1 < accelerationX && accelerationX < 0.1){
			velX=0;
		};

		if (-0.1 < accelerationY && accelerationY < 0.1){
			velY=0;
		};

		if (-0.1 < accelerationZ && accelerationZ < 0.1){
			velZ=0;
		};

		//dynamic sizing based on Z acceleration
		size = map(velZ, -1, 1, 1, 25);
		
		//dynamic alpha based on velocity
		//col = map(avg, -10, 10, 0, 255);
		
		//readings before they get updated
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


		//trace.updateColour();
		trace.display();


};

function save(){
	saveCanvas();
};


function Circles(){
	this.x = x;
	this.y = y;
	this.diameter = 7;

	this.display = function(){
		//console.log(this.backgroundColour);
		strokeWeight(0.5);
		stroke(colour,255, brightness-20, 255);
		fill(colour, 255, brightness, 255);
		ellipse(x, y, size,size);
		//strokeWeight(size);
		//line(px,py,x,y);
	};

}

function updateColour(){
	colour = map(touchX, 0, windowWidth, 0, 255);
	brightness = map(touchY, 0, windowHeight, 0, 255);
	console.log(touchX);
	console.log(colour);
	};



function touchStarted(){
	timeDiff = 1000;
	timestart = millis();
	console.log(timestart);

};

function touchEnded() {

	timeend = millis();
	console.log(timeend);

	timeDiff = timeend-timestart;

	if(timeDiff < 50){
		console.log('fuckyes');
		noStroke();
		fill(colour, 255, brightness, 255);
		rect(0,0,windowWidth,windowHeight);
	};
};

