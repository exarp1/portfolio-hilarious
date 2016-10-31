/**
     \file           assignment7.1.js

     \author         Richard O'Brien s0460356
     \date           2013/11/20
     \brief          this code will build a 10x10 grid of <div> elements
                     each element has an unique ID.
                     the color of each element is blue by default
                     It will turn red when clicked.
     \return         The entire HTML document.
	 \todo				get base cases working properly.
**/


/* global vars */
var row = new Array();                          // grid row array
var started = false;							// track whether game started
var nClicked = 0;								// track how many squares clicked
var interval;									 // create timed event	
var elapsedTime=0;								// track elapsed time

function setup(size) {
	var	i,j = 0;										// array indices.
	nClicked = 0; 									// to reset the board
	if(started){ 
		var again=window.confirm("please reset the board before making new grids");
		if(again) {
			return;
		}else {
			location.href=location.href;
		}
	}
	started = true;
	row=buildArray(size,row);
	setboard(size,row);
	grid(size,row);							// make corresponding div grid
	return;
}

var timer = function(){
	elapsedTime++;	// increment timer
	document.getElementById("timerbox").innerHTML= elapsedTime;
	// how to win
	if ( nClicked >= ((size*size) - ((size^2)/4 )) ) {
		var size = row.length;
		var again = window.confirm("You win! play again?");
		if (again) {
			setup(10);
		} else {
			window.alert("BYE!");
			location.href = location.href;
		}
	}
}

// build an array (corresponding to grid([size])
function buildArray(size,row) {
	var	i,j = 0;										// array indices.

    for (i = 0; i < size; i++) {                        // 10x10 array
        row[i] = new Array();                           // new array per element
        for (j = 0; j < size; j++) {                    // each column
            row[i][j] = 0;                // fill with (x,y)
        }
    }
	return row;
}


function setboard(size,row) {
	var i,j,k;						// indexes
	// set random assortment of bombs into the array, say, 25% bombs
	var numBombs = size*size / 10;
	
	// randomly disperse bombs in array
	for( k = 0; k < numBombs; k++ ) {
		var randX = Math.floor((Math.random()*size)); // random # [0..9]
		var randY = Math.floor((Math.random()*size)); // random # [0..9]
		row[randX][randY] = 9; 			// someone set up us the bomb.
		ripple( randX, randY, size );
	}
	return;
}


// ripple effect with numbers in grid around the  bombs
var ripple = function( x, y ) {
	var size = row.length;					// for bounds checking
	var i, j;
	for ( i = -1; i <= 1; ++i) {
		for( j = -1; j <=1; ++j ) {
			if ( i == 0 && j == 0 ) continue;
			if ( (x + i) < 0 || (x + i) >= size || (y+j) < 0 || y+j >= size) continue;
			if ( row[x+i][y+j] === 9 ) continue;// don't increment bombs.
			row[x+i][y+j]++;
		}
	}
	return;
}
	
// build a square grid of [size]
function grid(size,row) {
	//var size = row.length;					// for bounds checking
	window.clearInterval(interval);						// reset timer at setup
	nClicked = 0;								// reset how many squares clicked
	interval = setInterval (function(){timer()},100);	// create timed event	
	//timer();								// start timing
	var tile = document.getElementById("container");    // type less.
	var table = " ";									// string to build divs.
	var	i,j = 0;										// array indices.

    for(i = 0; i < size; i++) {                         // [size] rows
        for (j = 0; j < size; j++) {                    // [size] cols
            table +=                           			// append to table
                '<div onclick="clicked('+j+','+i+',row)" '	+
                'id="r'+j+'c'+i+'" '                    	+ 	// unique id
                'class="blue" >?</div>';
        }                                               // one table div done
        table += '<br />'                      // \n and print next row
    }
	tile.innerHTML = table;

	return;
}

// call showCell to reveal each cell that is clicked, (recursively)
// this function is mainly used to pass arguments to showCell()
function clicked(x,y, row) {
	console.log("X=",x," Y=",y);
	showCell(x,y,row);
	return;
}

function showCell(x,y,row) {
	var size = row.length;					// for bounds checking

	// BASE CASE 1: do not allow showCell to reference out-of-bounds cells.
	if ( ( x < 0) || ( y < 0) || ( x >= size) || ( y >= size)) return;

	var num = row[x][y];					// the number in the cell
	var id = "r"+x+"c"+y;						// id string to reference divs
	var cell = document.getElementById(id); // cell node object to inject HTML
	

	console.log("in showcell()before switch(",num,") at ID:",id );	

	if(cell.className == "white") return;		
	console.log("ID here is:",id);
	// decide how to reveal each cell, based on the row[][] contents.
	switch(num) {
		case 0:				
			nClicked++; // to count how many cells ( - bombs) were revealed. 
			// BASE CASE 2: do nothing if cell was already clicked
			if(cell.className=="blue"){
			cell.className="white";
			cell.innerHTML="&nbsp";
			showCell(x+1,y+1,row);	// ripple out to surrounding blank cells
			showCell(x+1,y+0,row);	// ripple out to surrounding blank cells
			showCell(x+1,y-1,row);	// ripple out to surrounding blank cells
			showCell(x+0,y+1,row);	// ripple out to surrounding blank cells
			showCell(x+0,y-1,row);	// ripple out to surrounding blank cells
			showCell(x-1,y+1,row);	// ripple out to surrounding blank cells
			showCell(x-1,y+0,row);	// ripple out to surrounding blank cells
			showCell(x-1,y-1,row);	// ripple out to surrounding blank cells
			}
			return;
			break;

		case 9:
			var replay = window.confirm("You died. play again?");
			window.clearInterval(interval);				// reset timer at setup
			cell.className="red";
			cell.innerHTML= "B";
		    if (replay) {
				started = false;
				setup(10);
			} else {
				started = false;
				window.alert("BYE!");
				location.href = location.href;
			}
			break;
	// BASE CASE 4: reveal a number if cell contains [1..8] ( row(x,y) == [1..8 )
		default:
			cell.className="green";
			cell.innerHTML=num;
			nClicked++; // to count how many cells ( - bombs) were revealed. 
			return;
			break;
	}
	if(replay) setup(size);
	return;
}

