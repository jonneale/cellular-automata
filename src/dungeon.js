const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const survivalThreshold = 5;
const birthThreshold = 6;
const initializationChance = 0.45;
const PIXEL_WIDTH = 5;
const PIXEL_HEIGHT = 5;

function neighbourCount (map, x, y){
	var aliveNeighbours = 0;
	for(xOffset = -1; xOffset < 2; xOffset++){
		for(yOffset=-1; yOffset < 2; yOffset++){
			dx = x+xOffset;
			dy = y+yOffset;
			if((dx > 0) && (dx < map.length) && (dy > 0) && (dy < map[dx].length)){
				aliveNeighbours += map[dx][dy];
			}
			else {
				aliveNeighbours++;
			}
		}
	}
	return aliveNeighbours;			
}


function initialiseMap() {
	var width = 100;
	var height = 100;
	var map = [];
	for (i = 0; i < height; i++){
		map[i] = [];
		for (j = 0; j < width; j++){
			map[i][j]= Math.random() > initializationChance ? 1 : 0;
		}
	}
	return map;
}

function drawDungeon(map){
	for (i = 0; i < map.length; i++){
		for(j = 0; j < map[i].length; j++){
			context.fillStyle = map[i][j] == 1 ? "grey" : "white";
			context.fillRect(j*PIXEL_WIDTH,(i*PIXEL_HEIGHT),PIXEL_WIDTH,PIXEL_HEIGHT);				
		}
	}
}

function updateMap (map){
	var updatedMap = [];
	for(i=0; i < map.length; i++){
		updatedMap[i] = []
		for(j = 0; j < map[i].length; j++){
			var cell = map[i][j];
			var aliveNeighbours = neighbourCount(map,i,j);

			if (cell == 1){
				updatedMap[i][j]= aliveNeighbours >= survivalThreshold ? 1 : 0;
			}
			else {
				updatedMap[i][j]= aliveNeighbours >= birthThreshold ? 1 : 0;
			}
			
		}
	}
	return updatedMap;
}


function mainLoop(map,iteration){
	console.log(iteration);
	drawDungeon(map);
	updatedMap = updateMap(map);
	if (iteration < 5){
		setTimeout(mainLoop ,2000, updatedMap,iteration+1)	
	}
}

	
function  run(){
	mainLoop(initialiseMap(),0)	
}
