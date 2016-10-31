////////////////////////////////////////////////////////////////////////////////
///     \file           assignment7.1.js
///     \author         Richard O'Brien s0460356
///     \date           2013/11/20
///     \brief          this code will build a 10x10 grid of <div> elements
///                     each element has an unique ID.
///                     the color of each element is blue by default
///                     It will turn red when clicked.
///     \return         The entire HTML document.
////////////////////////////////////////////////////////////////////////////////

// build 10x10 grid
function grid() {
    var size = 10;                                      // size of grid
    var tile = document.getElementById("container");    // type less.
    var row = new Array();                              // grid row array
    var i    = 0;                                       // array sub index
    var j    = 0;                                       // array sub index

    // excel-style grid indices to populate grid elements
    var cols = ["a","b","c","d","e","f","g","h","i","j"];
    var rows = ["0","1","2","3","4","5","6","7","8","9"];

    // grid array 10x10 data structure
    for (i = 0; i < size; i++) {                        // 10x10 array
        row[i] = new Array();                           // new array per element
        for (j = 0; j < size; j++) {                    // each column
            row[i][j] = cols[i]+rows[j];                // fill with (x,y)
        }
    }

    // make 100 <div> grid, including attributes and onclick event
    for(i = 0; i < size; i++) {                         // 10 rows
        for (j = 0; j < size; j++) {                    // 10 cols
            tile.innerHTML +=                           // append to container
                '<div onclick="clicked('+row[i][j]+')" '        +
                'id="'+row[i][j]+'" '                           +
                'class="blue" >'                                +
                '?</div>';
        }                                               // one table div done
        tile.innerHTML += '<br />'                      // \n and print next row
    }
}

// change the color of the element when clicked
function clicked(id) {                                  // id = the div clicked
    console.log(id);                                    // shows the value of id
    if (id.className == "blue") {
        id.className = "red";                           // css hack --> red
    } else {
        id.className = "blue";                           // css hack --> blue
    }

}
