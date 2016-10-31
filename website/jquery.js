
<!doctype html>
<head>
<meta charset="UTF-8">
<title>This is a test page for jQuery</title>
<link href="js/jquery-ui-1.11.4/jquery-ui.css" rel="stylesheet">
<script src="js/jquery-ui-1.11.4/external/jquery/jquery.js"></script>
<script src="js/jquery-ui-1.11.4/jquery-ui.js"></script>

<!-- style the elements in the page. -->
<style>

body
{
    margin: 0px;
}

div{
    border-radius: 5px;
}
.mainHeader
{
	z-index: 1;
	position: fixed;
	height: 60px;
	width: 100%;
	background-color: gainsboro;
	margin-top: -20px;
	margin-bottom: 30px;
    text-align: center;
}

.left
{
	float: left;
	width: 10%;
	height: 400px;
	background-color: #f6a828;
	margin-top: 50px;
	margin-bottom: 10px;
}

.right
{
	float: right;
	width: 88%;
	height: 390px;
	margin-top: 50px;
	margin-bottom: 10px;
}

.mainFooter
{
    clear: both;
  position: relative;
	padding-top: 15p:w
    x;
	height: 50px;
	width: 100%;
	background-color: gainsboro;
	text-align: center;
}

.tabContents
{
	height: 380px; 
}

</style>

<script>
$(function(){

	// Make the main container that everything sits in, it's a <div>.
	var $main = $('<div />', {
		class: 'container',
		appendTo: $( 'body' )
	});

	// Build the top div in the webpage - the header
	var $header = $('<div />', {
		class: 'mainHeader',
		text: 'HEADER',
		appendTo: $main
	});

	// Build the left div in the webpage - the nav bar
	var $left = $('<div />', {
		class: 'left',
		text: 'I\'m the left!',
		appendTo: $main
	});

	// Build the right div in the webpage - the contents 
	var $right = $('<div />', {
		id: 'right',
		class: 'right',
		appendTo: $main
	});

	// We need labels for each tab
	var labels  = ['About Me', 'What I Can Do', 'What I Have Done', 'My Resume', 'Contact']; 

	// Create an un-numbered list 
	var $tabs = $('<ul />', { appendTo: $right });

	// Cycle through the array of labels to build a series of links.
	$(labels).each(function(i, tab) {

		// Links to put in the tabs:
		$('<a />', {
			href: '#tabs-'+i,
			text: tab,
			appendTo: $tabs
		}).wrap('<li></li>');
		
		// Tab contents : Dynamically create a <div> for each <li>
		$('<div />', {
			id: 'tabs-'+ i,
			class: 'tabContents tabContent-'+ i,
			appendTo: $right
		});
	});

	// Add JQuery UI widget instance
	$right.tabs();

	// Fill in some contents:
	var i=0;
	for (i=0; i < 5;i++)
	{
		$( '#tabs-' + i).html( '<br>Tab #</br>' + (i + 1) );
		//$( '#tabs-' + i).load('test.html',{});

	};



	// Build the bottom div in the webpage - the footer
	var $footer = $('<div />', {
		class: 'mainFooter',
		text: 'FOOTER',
		appendTo: $main
	});

});
</script>

</head>

<body> </body>

</html>

