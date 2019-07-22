var runCA = function()
{
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	var survivalThreshold = 5;
	var birthThreshold = 6;
	var initializationChance = 0.45;
	var initialiseMap = function() {
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

	var drawDungeon = function(map){
		var cellWidth = 2;
		var cellHeight = 2;
		for (i = 0; i < map.length; i++){
			var yOffset = i*cellHeight;
			for(j = 0; j < map[i].length; j++){
				context.fillStyle = map[i][j] == 1 ? "grey" : "white";
				context.fillRect(cellWidth*j,yOffset,cellWidth,cellHeight);
				
			}
		}
	}

	var updateMap = function (map){
		var updatedMap = [];
		var neighbourCount = function(map, x, y){
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

	
	var mainLoop = function(map,iteration){
		console.log(iteration);
		drawDungeon(map);
		updatedMap = updateMap(map);
		if (iteration < 5){
			setTimeout(mainLoop ,2000, updatedMap,iteration+1)	
		}
	}

	mainLoop(initialiseMap(),0)	
}