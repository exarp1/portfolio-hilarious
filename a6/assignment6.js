////////////////////////////////////////////////////////////////////////////////
///	\file 		assignment6.js
///	\author 	Richard O'Brien s0460356
///	\date 		2013/11/8
///	\brief		This function uses document.write() to build a times table.
///				it builds strings to pass to document.write() 
///				using nested for loops. 
///	\nb			control chars in strings added for generated html readability.
///	\par 		an object, which must contain #cols, #rows to display.
/// \return	The entire HTML document.
////////////////////////////////////////////////////////////////////////////////

function multiply(formSubmit) {
	var rows = eval ( formSubmit.rows.value );		// to get #rows from  form 
	var cols = eval ( formSubmit.cols.value );		// to get #cols from  form 
	var head = 0; 							// to store header string for HTML 
	var tabl = 0; 							// to store table string for  HTML 
	var foot = 0; 							// to store footer string for HTML 

	// generate a header HTML string 
	document.write( buildHead( head ) ); 				//  write header to HTML 

	// generate table HTML string
	document.write( buildTable( tabl, cols, rows ) );	//  write table to  HTML

	// close the footer HTML string
	document.write( buildFoot( foot ) );				//  write footer to HTML
	
	return 0; 											// return 2 calling form
	}
	
////////////////////////////////////////////////////////////////////////////////
/// Helper functions ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// build head HTML
function buildHead( head ) { 

	head = 	'<!Doctype html>\n<html>\n<head>\n<title>times table</title>\n'	+
			'<link rel="stylesheet" href="assignment6.css" '				+
			'type="text/css" />' 											+
			'\n</head>\n<body>\n';
			
	return head;						// send finished string to multiply()
}

// build table HTML
function buildTable( tabl, cols, rows) { 
	var i, j = 0; 						// loop iterators 
	tabl =	'<table>\n<tr><th>x</th>';	// build the table head string
	
	for ( j=1; j <= cols; ++j) {
		tabl += '<th>'    		+ 
				j         		+ 
				'</th>';
	}
	tabl +=		'</tr>\n'; 				// close top row
	
	for ( i=1; i<=rows; ++i){			// print the data rows 
		tabl += '<tr>' 			+ 
				'<th>' 			+ 
				i 				+ 
				'</th>'; 
		for ( j=1; j <= cols; ++j) {
			tabl += '<td>' 		+ 
					( i * j ) 	+ 
					'</td>'; 
		}
		tabl += '</tr>\n'; 				// close tags
	}

	tabl += '</table>\n';				// end the table 
	
	return tabl;						// send finished string to multiply() 
}

// build footer HTML
function buildFoot( foot ) {
	foot =	'<button value="Reload Page" onClick="'	+
			'location.href=location.href;">'		+
			'Reload Page</button>\n'				+
			'</body>\n'								+
			'</html>';
			
	return foot;						// send finished string to multiply()
}
