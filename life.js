"use strict"

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");
var WIDTH = 50;
var HEIGHT = 50;
var PIXEL_WIDTH = 10;
var PIXEL_HEIGHT = 10;
var grid = Array(WIDTH*HEIGHT).fill(0);;
var colours = ["#fff","#333"];
var NEIGHBOUR_COORDS = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

function randomBlock(){
	return parseInt(Math.random()*colours.length)
}

function drawGrid(){
	for (var index = 0; index < WIDTH*HEIGHT; index++) {
		var valueOfCell = grid[index];
		context.fillStyle = colours[valueOfCell];
		var yValue = parseInt(index/WIDTH);
		var xValue = index % HEIGHT;
		context.fillRect(xValue*PIXEL_WIDTH,yValue*PIXEL_HEIGHT,PIXEL_WIDTH,PIXEL_HEIGHT);
	}
}

function countNeighbours(cell, grid){
	return NEIGHBOUR_COORDS.reduce(function(accumulator,v){
		var coord = Math.min(grid.length,Math.max(0,cell + v[0] + (WIDTH * v[1])));
		return accumulator + grid[coord];
	},0)
}

function getNewCellState(cellState, neighbourCount){
	if (neighbourCount == 3){
		return 1;
	} else if (neighbourCount > 3 || (cellState == 1 && neighbourCount < 2)) {
		return 0;
	} else {
		return cellState;
	}
}

function updateGrid(){
	var oldGrid = [...grid];
	for (var index = 0; index < WIDTH*HEIGHT; index++){
		var neighbourCount = countNeighbours(index, oldGrid);
		grid[index] = getNewCellState(grid[index],neighbourCount);
	}
}

function randomiseGrid(){
	for (var index = 0; index < WIDTH*HEIGHT; index++) {
		grid[index] = randomBlock();
	}
}

function initialiseGrid(){
	randomiseGrid();
	drawGrid();
}

function step(){
	updateGrid();
	drawGrid();
}

function toggleCell(event){
	var x = event.pageX - canvas.offsetLeft,
		y = event.pageY - canvas.offsetTop;
    var xValue = x / PIXEL_WIDTH | 0,
      	yValue = y / PIXEL_HEIGHT | 0;
    var coord = yValue * HEIGHT + xValue;
    grid[coord] = 1 - grid[coord];
	drawGrid();
}

canvas.addEventListener('click', toggleCell, false);


function run(){
	console.log("updating");
	step();
	setTimeout(run, 100);
}