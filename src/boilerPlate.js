"use strict"

function runCA() {
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	var WIDTH = 250;
	var HEIGHT = 50;
	var PIXEL_WIDTH = 10;
	var PIXEL_HEIGHT = 10;
	var grid = [];
	var colours = ["#fff","#4287f5","#734e4e"]; //nothing,water,rock

	function randomBlock(){
		return parseInt(Math.random()*colours.length)
	}

	function drawGrid(){
		for (var index = 0; index < WIDTH*HEIGHT; index++) {
			var valueOfCell = grid[index];
			context.fillStyle = colours[valueOfCell];
			var yValue = parseInt(index/WIDTH);
			var xValue = index % WIDTH;
			context.fillRect(xValue*PIXEL_WIDTH,yValue*PIXEL_HEIGHT,PIXEL_WIDTH,PIXEL_HEIGHT);
		}
	}
	function zeroGrid(){
		for (var index = 0; index < WIDTH*HEIGHT; index++) {
			grid[index] = randomBlock();
		}
	}

	zeroGrid();
	drawGrid();
}