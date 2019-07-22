"use strict"

var ground = [50,1,1,1,1,1,1,1,1,1,1,1,1,1,20,20,20,1,1,1,10,11,12,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,50]
var water = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var WIDTH = 50;
var HEIGHT = 50;
var PIXEL_WIDTH = 10;
var PIXEL_HEIGHT = 10;
var energy = Array(WIDTH).fill(0);
var grid = [];
var ground_COLOUR = "#734e4e";
var WATER_COLOUR = "#4287f5";
var NOTHING_COLOUR = "#fff";
function drawGrid(){
	for (var index = 0; index < WIDTH*HEIGHT; index++) {
		var ground_index = index % HEIGHT;
		var ground_value = ground[ground_index];
		var water_value = water[ground_index];
		var yValue = (index/WIDTH)|0;
		
		if (ground_value >= yValue){
			context.fillStyle = ground_COLOUR;
		} else if (ground_value + water_value >= yValue) {
			context.fillStyle = WATER_COLOUR;
		}
		else {
			context.fillStyle = NOTHING_COLOUR;
		}
		var xValue = index % HEIGHT;
		context.fillRect(xValue*PIXEL_WIDTH,HEIGHT*PIXEL_HEIGHT-(yValue*PIXEL_HEIGHT),PIXEL_WIDTH,PIXEL_HEIGHT);
	}
}

function updateGrid(){
	var dwater = Array(WIDTH).fill(0);
	var denergy = Array(WIDTH).fill(0);
	for (var i = 1; i < WIDTH-1; i++) {
		if (ground[i]+water[i] - energy[i] > ground[i-1] + water[i-1] + energy[i-1]){
			var flow = Math.min(water[i], ground[i] + water[i] - energy[i] - ground[i-1] - water[i-1] - energy[i-1]) / 4.0;
			dwater[i-1]  += flow;
			dwater[i]    += -flow;
			denergy[i-1] += -energy[i-1] / 2 - flow;
		}
		if (ground[i] + water[i] + energy[i] > ground[i+1] + water[i+1] - energy[i+1]) {
  			var flow = Math.min(water[i], ground[i] + water[i] + energy[i] - ground[i+1] - water[i+1] + energy[i+1]) / 4.0
  			dwater[i+1]  += flow
  			dwater[i]    += -flow
  			denergy[i+1] += -energy[i+1] / 2 + flow
  		}
	}
	for (var index = 0; index < WIDTH; index++) {
		water[index] += dwater[index];
		energy[index] += denergy[index];
	}
}

function increaseWater(event){
	var x = event.pageX - canvas.offsetLeft;
    var xValue = x / PIXEL_WIDTH | 0;
    water[xValue]++;
	drawGrid();
}

	
function run(){
	updateGrid();	
	drawGrid();
	setTimeout(run, 50);	
}	

canvas.addEventListener('click', increaseWater, false);
drawGrid();

