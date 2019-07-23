"use strict"
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const survivalThreshold = 5;
const birthThreshold = 6;
const initializationChance = 0.45;
const PIXEL_WIDTH = 5;
const PIXEL_HEIGHT = 5;
const WIDTH = 100;
const HEIGHT = 100;
const NEIGHBOUR_COORDS = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]

var grid = [];

function initialiseGrid() {
    for (var i = 0; i < WIDTH*HEIGHT; i++){
        grid[i] = Math.random() > initializationChance ? 1 : 0;
    }
}

function drawGrid(){
	for (var index = 0; index < WIDTH*HEIGHT; index++) {
		var valueOfCell = grid[index];
		context.fillStyle = valueOfCell == 1 ? "grey" : "white";
		var yValue = (index/WIDTH) | 0;
		var xValue = index % WIDTH;
		context.fillRect(xValue*PIXEL_WIDTH,(yValue*PIXEL_HEIGHT),PIXEL_WIDTH,PIXEL_HEIGHT);
	}
}

function coordToXY(coord){
    return [coord % WIDTH, (coord/WIDTH) | 0];
        
}

var neighbourCount = function(coord, grid){
    var coords = coordToXY(coord);
    var x = coords[0];
    var y = coords[1];
    var aliveNeighbours = 0;
    for(var xOffset = -1; xOffset < 2; xOffset++){
        for(var yOffset=-1; yOffset < 2; yOffset++){
            var dx = x+xOffset;
            var dy = y+yOffset;
            if((dx > 0) && (dx < WIDTH) && (dy > 0) && (dy < HEIGHT)){
                aliveNeighbours += grid[coord]
            }
            else {
                aliveNeighbours++;
            }
        }
    }
    return aliveNeighbours;         
}


function countNeighbours(cell, grid){
    return NEIGHBOUR_COORDS.reduce(function(accumulator,v){
        var coord = cell + v[0] + (WIDTH * v[1]);
        if (coord < 0 || coord > WIDTH*HEIGHT) {
          return accumulator + 1;
        } else if ((cell % WIDTH == 0) && v[0] < 0) {
            return accumulator + 1;
        } else if (((cell+1) % WIDTH == 0) && v[0] > 0) {
            return accumulator + 1;
        } else {
            return accumulator + grid[coord];
        }   
    },0)
}

function updateGrid(){
    var oldGrid = [...grid];      
    for(var i=0; i < WIDTH*HEIGHT; i++){
        var cell = grid[i];
        var aliveNeighbours = neighbourCount(i,oldGrid);
        if (cell == 1){
            grid[i] = aliveNeighbours >= survivalThreshold ? 1 : 0;
        }
        else {
            grid[i] = aliveNeighbours >= birthThreshold ? 1 : 0;
        }
    }
}

function mainLoop(iteration){
    updateGrid();
    drawGrid();
    if (iteration < 5){
        setTimeout(mainLoop ,2000,iteration+1);
    }
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
    mainLoop(0);
}

initialiseGrid();
drawGrid();