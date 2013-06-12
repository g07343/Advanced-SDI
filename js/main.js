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
		game.favorite    = $("#favorite").val();
		game.cloud       = $("#cloud").val();

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
		for(var n in json){
				var id = Math.floor(Math.random()*100065);
				localStorage.setItem(id, JSON.stringify(json[n]));
		};

		var createDiv = document.createElement('div');
				createDiv.setAttribute("id", "items");
				//var colorDiv = get("items");
				//createDiv.appendChild(createList);
				$('#display').append(createDiv);
				for (var i=0, len=localStorage.length; i<len; i++) {
					var createLi = document.createElement('li');
					var createField = document.createElement('fieldset');
					var createList = document.createElement('ul');
					createDiv.appendChild(createField);
					createField.appendChild(createList);
					var createLinks = document.createElement('li');
					createList.appendChild(createLi);
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
					var createSubList = document.createElement('ul');
					createLi.appendChild(createSubList);
					//createImage(obj.origin[1], createSubList);
					for(var n in obj) {
						var createSubLi = document.createElement('li');
						createSubList.appendChild(createSubLi);
						var optSubText = obj[n][0]+" "+obj[n][1];
						createSubLi.innerHTML = optSubText; 
						createSubList.appendChild(createLinks);
					}
				createItemLinks(localStorage.key(i), createLinks);
				}

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
	
function createItemLinks(key, createLinks){
			var edit = document.createElement('a');
			edit.href = "#";
			edit.key = key;
			var txt = "Edit Member ";
			edit.innerHTML = txt;
			edit.addEventListener('click', editGame);
			createLinks.appendChild(edit);
			edit.style.display="block";
			
			var del = document.createElement('a');
			del.href = '#';
			del.key = key;
			var delTxt = " Delete Member";
			del.innerHTML = delTxt;
			del.addEventListener('click', deleteGame);
			createLinks.appendChild(del);
		};

function editGame() {
	//alert("edit button clicked!");
	$('#addLink').click();
	var getKey = localStorage.getItem(this.key);
			var edit = JSON.parse(getKey);
			$("#name").val(edit.name[1]);
			$("#console").html("<option>" + edit.console[1] + "</option>");
			$("#genrePlaceholder").html(edit.genre[1]);
			$("#bio").val(edit.bio[1]);
			

};
function deleteGame() {
	alert("delete button clicked!");

};







