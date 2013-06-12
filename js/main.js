/*
Matthew Lewis
ASDI Term 1306
main.js file
*/

$('#home').on('pageinit', function(){


});

$('#add').on('pageinit', function(){
	
	

	var myForm = $('#addGame');
	console.log(myForm);

	myForm.submit(function(key){
		if ($('#cloud').val() == 'on') {
			console.log("user choose to save to cloud!");
			//additional code to save to xml later goes here!

		};
		if(!key){
				var id = Math.floor(Math.random()*100065);
			}else{
				id = key;
			}

		var game      = {};
	
		game.name        = $("#name").val();
		game.console     = $("#console").val();
		game.genre       = $("#genre").val();
		game.bio         = $("#bio").val();
		game.cloud       = $("#cloud").val();
		game.favorite    = $("#favorite").val();
	
		console.log(game);
		//autofillData();
		
		localStorage.setItem(id, JSON.stringify(game));
		$("#reset").click();
	});

});

$('#clearStorage').on('click', function(){
	localStorage.clear();
})


$('#display').on('pageinit', function(){
	

});
var display = $('.display');
var reset = $('#resetGames');


$(reset).on("click", function(){
	confirm("This action cannot be undone!  All saved games will be lost!")

});

$(display).on('click', function(){
	if (localStorage.length == "0") {
		alert("You haven't saved any games yet!  Default games will be generated for you.")



	} else {
	var option = $(this).text();
	console.log(option);
	displayGames(option);
	};
});

function displayGames(option) {
//if option passed is genre

//if option passed is platform

//if option passed is alphabetical

//if option passed is a favorite

};
	



