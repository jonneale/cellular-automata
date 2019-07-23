"use strict"
const COLOURS = ['#070707',
      '#1f0707',
      '#2f0f07',
      '#470f07',
      '#571707',
      '#671f07',
      '#771f07',
      '#8f2707',
      '#9f2f07',
      '#af3f07',
      '#bf4707',
      '#c74707',
      '#DF4F07',
      '#DF5707',
      '#DF5707',
      '#D75F07',
      '#D7670F',
      '#cf6f0f',
      '#cf770f',
      '#cf7f0f',
      '#CF8717',
      '#C78717',
      '#C78F17',
      '#C7971F',
      '#BF9F1F',
      '#BF9F1F',
      '#BFA727',
      '#BFA727',
      '#BFAF2F',
      '#B7AF2F',
      '#B7B72F',
      '#B7B737',
      '#CFCF6F',
      '#DFDF9F',
      '#EFEFC7',        
      '#FFFFFF'];

const WIDTH = 160;
const HEIGHT = 160;
const PIXEL_WIDTH = 5;
const PIXEL_HEIGHT = 5;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

var grid = [];
	
function drawGrid(){
	for (var index = 0; index < WIDTH*HEIGHT; index++) {
		var valueOfCell = grid[index];
		context.fillStyle = COLOURS[valueOfCell] || '#070707';
		var yValue = (index/WIDTH) | 0;
		var xValue = index % HEIGHT;
		context.fillRect(xValue*PIXEL_WIDTH,(yValue*PIXEL_HEIGHT),PIXEL_WIDTH,PIXEL_HEIGHT);
	}
}
function zeroGrid(){
	for (var index = WIDTH*(HEIGHT-1); index < WIDTH*HEIGHT; index++) {
		grid[index] = COLOURS.length-1;
	}
	for (var index = 0; index < WIDTH*(HEIGHT-1); index++) {
		grid[index] = 0;
	}
}

function spreadFire(src){
    var rand = (Math.random() * 3.0) | 0;
    var dst = src - rand + 1;
    grid[dst - WIDTH] = grid[src] - (rand & 1);
}

function updateGrid(){
	for (var index = WIDTH; index < WIDTH * HEIGHT; index++){
		spreadFire(index);
    }
}

zeroGrid();
drawGrid();

function run(){
	var startTime = new Date().getTime;
	updateGrid();
	drawGrid();
	var elapsedTime = startTime - (new Date().getTime);
	setTimeout(run,32-elapsedTime)
}
