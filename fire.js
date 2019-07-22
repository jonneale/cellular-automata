var runCA = function()
{
	var colours= ['#070707',
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
          '#FFFFFF']
	var canvas = document.querySelector("canvas");
	var context = canvas.getContext("2d");
	var WIDTH = 250;
	var HEIGHT = 50;
	var wind = 3.0;
	var initialiseMap = function() {
		var map = [];
		for (y = 0; y < HEIGHT; y++){
			map[y] = [];
			for (x = 0; x < WIDTH; x++){
				map[y][x]= y == 0 ? colours.length-1 : 0;
			}
		}
		return map;
	}

        
	var drawFire = function(map){
		var cellWidth = 2;
		var cellHeight = 2;
		for (y = map.length-1; y >= 0; y--){
			var yOffset = (map.length-y)*cellHeight;
			for(x = 0; x < map[y].length; x++){
				context.fillStyle = colours[map[y][x]];
				context.fillRect(cellWidth*x,yOffset,cellWidth,cellHeight);
			}
		}
	}

	var updateWind = function(wind){
		if (Math.random() > 0.9) {
			return (((Math.random * 5) & 5)-10);
		}
		return wind;
	}

	var updatePixel = function(x,y,map){
		var pixel = map[y][x];
		var updatedMap = map;
		wind = updateWind(wind);
		if(pixel == 0){
			updatedMap[y+1][x] = 0;
		} else {
			var rand = Math.round(Math.random() * 3.0) & 3;
			var randomWind = Math.round(Math.random() * wind) & wind;
			var xCoord = Math.max(0,Math.min(WIDTH,(x-randomWind)));
			updatedMap[y+1][xCoord] = (map[y][x] - (rand & 1));
		}
		return updatedMap;
	}

	var updateFire = function(map){
		var updatedMap = map;
		for (y = 0; y < map.length-1; y++){
			for (x = 0; x < map[y].length; x++){
				map = updatePixel(x,y,map);
			}
		}
		return map;
	}

	var frameRate = 30;
	
	var run = function(map){
		map = updateFire(map);
		drawFire(map);
		setTimeout(run, 1000/frameRate, map);	
	}	
	var map = initialiseMap();
	run(map);
}