/*
Matthew Lewis
ASDI Term 1306
main.js file
*/

$('#home').on('pageinit', function(){


});

$('#add').on('pageinit', function(){
	
	
	
		$("#saveGame").on('click', function(key){
			var form = $("#addGame");
			validateGame(form);
		});

		$('#clearStorage').on("click", function(){
			localStorage.clear();
			window.location.reload();
		});
});

function storeGame(form) {
	id = Math.floor(Math.random()*100065);
				//console.log(key);
			getFavorite(form);
			getCloud(form);

			var game            = {};
				game.name       =["Name: ",    $(form).find("#name").val()];
				game.console    =["Console: ",    $(form).find("#console").val()];
				game.genre      =["Genre: ",     $(form).find("#genre").val()];
				game.bio        =["Bio: ",    $(form).find("#bio").val()];
				game.favorite   =["Favorite? ",   favVal];
				game.cloud      =["Cloud: ",   cloudVal];
				
					key = id;
					
					
					localStorage.setItem(id, JSON.stringify(game));

					alert("Game Saved!");
					$('#reset').click();
					//$('#addGame').reset();
					location.reload(true);
					
				
				function getFavorite(form){
					if ($(form).find('#favorite').is(':checked')){
						favVal = "yes";
						
					} else {
						favVal = "no";
						
					}
					console.log("favVal is " + favVal);
					return favVal;
				};
				function getCloud(form){
					console.log("Cloud is" + $('#cloud').val());
					if($(form).find('#cloud').is(':checked')){
						cloudVal = "on";

					} else {
						cloudVal = "off";
					}
					return cloudVal;
				}


};


$('#display').on('pageinit', function(){
	$(gameDiv).listview('refresh');


	var createDiv = document.createElement('div');
				createDiv.setAttribute("id", "items");
				//$(createDiv).attr("data-role", "collapsible");
				//createDiv.appendChild(createList);
				
				for (var i=0, len=localStorage.length; i<len; i++) {
					var gameDiv = document.createElement('div');
					$('#display').append(gameDiv);
					$(gameDiv).attr("data-role", "collapsible");

					//$(createDiv).append(gameDiv);
					var createTitle = document.createElement('h3');
					//$(createTitle).text(getTitle(key));
					$(gameDiv).append(createTitle);
					//var createLi = document.createElement('li');
					//$(createDiv).append(createLi);
					//var createList = document.createElement('ul');
					//$(createList).attr("data-role", "listview");
					//createDiv.appendChild(createList);
					var gameLi = document.createElement('li');
					$(gameLi).attr('data-role', 'listview');
					$(gameDiv).append(gameLi);
					$(gameLi).append(createSubLi);
					var createLinks1 = document.createElement('li');
					$(createLinks1).attr("data-theme", "a");
					var createLinks = document.createElement('li');
					$(createLinks).attr("data-theme", "a");

					//createList.appendChild(createLi);
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
					
					// var titleText = obj[n][0]+" "+obj[n][1];
					// console.log(titleText);

					//createLi.appendChild(createSubList);
					for(var n in obj) {
						//console.log([n][0]);
						if ([n][0] === 'name'){
							var titleText = obj[n][1];
							//console.log(titleText);
							$(createTitle).text(titleText);
							//console.log(titleText);
						} else {
						var createSubLi = document.createElement('li');
						//$(gameDiv).append(createSubLi);
						var optSubText = obj[n][0]+" "+obj[n][1];
						$(createSubLi).text(optSubText);
						$(gameLi).append(createSubLi);

						$(gameLi).append(createLinks);
						$(gameLi).append(createLinks1);
						}
					}
					createItemLinks(localStorage.key(i), createLinks);

				}
				$('#display').find('div[data-role=collapsible]').collapsible();
				$('#display').find('li[data-role=listview]').listview();				
			
			
			function createItemLinks(key, createLinks){
				
				var editor = document.createElement('a');
				$(editor).attr("href", "#edit");
				editor.key = key;
				$(editor).attr("data-key", key);
				$(editor).attr("class", "editLink");
				var txt = "Edit Game";
				$(editor).text(txt);
				createLinks.appendChild(editor);
				editor.style.display="block";
				
				var del = document.createElement('a');
				$(del).attr("href", "#display");
				del.key = key;
				$(del).attr("class", "deleteLink");
				var delTxt = "Delete Game";
				$(del).text(delTxt);
				//$(del).on('click', deleteGame(key));
				createLinks1.appendChild(del);
				del.style.display="block";
				
			};
			
					

			$('.deleteLink').on('click', function(){
				
					var promptUser = confirm("Are you sure you want to delete this game?");
						if(promptUser){
							
							localStorage.removeItem(this.key);
							alert("Game deleted!");
							window.location.reload();
							}else{
								alert("Game saved.");
							}
				});

			$('.editLink').on('click', function(){	
				console.log("The game to be edited's key is: " + this.key);
				editGame(this.key);

			});
			

			function editGame(key){
				var getKey = localStorage.getItem(key);
				var game = JSON.parse(getKey);
				var editor = $('.editLink');
				//editor.href = "#edit";
				//editor.click();
				retrieveFav();
				retrieveCloud();



				$("#editName").val(game.name[1]);
				$("#editConsole").val(game.console[1]);
				$("#editGenre").val(game.genre[1]);
				$("#editBio").val(game.bio[1]);
				$("#editCloud").val(cloudVal);

				function retrieveFav(){
					if(game.favorite[1] == "yes") {
						//do this
						//console.log("FAVORITE WAS CHECKED!");
						$('#editFavorite').prop('checked', true);
					} else {
						return;
					};

				}
				function retrieveCloud(){
					if(game.cloud[1] == "on") {
						//do this
						//console.log("CLOUD WAS CHECKED!");
						$('#editCloud').prop('checked', true);
					} else {
						return;
					};

				}
				$('#submitEditedGame').on('click', function(){
				var form = $("#editForm");
				validateEdited(form, key);
				console.log("Edited games key is " + key);

			});



			};

			function getFavorite(){
					if ($('#editFavorite').is(':checked')){
						favVal = "yes";
						
					} else {
						favVal = "no";
						
					}
					console.log("favVal is " + favVal);
					return favVal;
				};
				function getCloud(){
					console.log("Cloud is" + $('#cloud').val());
					if($('#editCloud').is(':checked')){
						cloudVal = "on";

					} else {
						cloudVal = "off";
					}
					return cloudVal;
				}


});

function validateGame(form) {
				var errors = 0;
				console.log("validate form is run!");
				//console.log($(form).find("#console").val());
				if ($(form).find("#name").val().length < 3) {
					errors ++;
					console.log("NAME ERROR! " + errors);
					
			 	}	
			 	if ($(form).find("#console").val() === "") {
					errors ++;
					console.log("CONSOLE ERROR! " + errors);
					
				}			
				if ($(form).find("#genre").val() === "") {
					errors ++;
					console.log("GENRE ERROR! " + errors);
					
				} 
				if (errors >= 1) {
					console.log("Form generated " + errors + " errors.");
				} else {
					console.log("Form passes validation");
					storeGame(form);
				};								
};
function validateEdited(form, key) {
				var errors = 0;
				if ($(form).find("#editName").val().length < 3) {
					errors ++;
					console.log("NAME ERROR!");

				};
			 	if ($(form).find("#editConsole").val() === "") {
					errors ++;
					console.log("CONSOLE ERROR!");
				};
				if ($(form).find("#editGenre").val() === "") {
					errors ++;
					console.log("GENRE ERROR!");
				}; 
				if (errors >= 1) {
					console.log("Form generated " + errors + " errors.");
				} else {
					console.log("Form passes validation");
					submitEdit(form, key);
				};

};
function submitEdit(form, key){
		console.log("addGame is run");
		id = key;
		getFavorite();
		getCloud();

		var game = {};
			game.name       =["Name: ",    $(form).find("#editName").val()];
			game.console    =["Console: ",    $(form).find("#editConsole").val()];
			game.genre      =["Genre: ",     $(form).find("#editGenre").val()];
			game.bio        =["Bio: ",    $(form).find("#editBio").val()];
			game.favorite   =["Favorite? ",   favVal];
			game.cloud      =["Cloud: ",   cloudVal];
				
			key = id;
					
					
			localStorage.setItem(id, JSON.stringify(game));

			alert("Game Saved!");
			$('#reset').click();
			$("#editHome").click();
			location.reload(true);

			function getFavorite(){
					if ($('#editFavorite').is(':checked')){
						favVal = "yes";
						
					} else {
						favVal = "no";
						
					}
					console.log("favVal is " + favVal);
					return favVal;
				};
				function getCloud(){
					//console.log("Cloud is" + $('#cloud').val());
					if($('#editCloud').is(':checked')){
						cloudVal = "on";

					} else {
						cloudVal = "off";
					}
					return cloudVal;
				}
	};
$('#settings').on('pageinit', function(){
	
	$('#restoreJson').on('click', function(){
		var resetAll =	confirm("This will delete all currently stored games and restore the default games.  This cannot be undone!");
		if (resetAll) {
			console.log('All games were deleted!');
			localStorage.clear();
			$.ajax({

					url: "_view/games",
					//type: "GET",
					error: function(result){
					console.log('error');
					console.log(result);
					},
					dataType: "json",
					success: function(result){
					console.log('success!');
					console.log(result);
					$.each(result.rows, function(index, program) {
					var game = {};

					game.name = program.value.name;
					game.console = program.value.console;
					game.genre = program.value.genre;
					game.bio = program.value.bio;
					game.favorite = program.value.favorite;
					game.cloud = program.value.cloud;
					key = id;
					var id = Math.floor(Math.random()*1904857);
					localStorage.setItem(id, JSON.stringify(game));
					//console.log(value);
					});
					location.reload(true);

					}

});
		};
	});
		$('#restoreXml').on('click', function(){
			console.log('restoreXML was clicked');
			$.ajax({

				url: "xhr/xml.xml",
				type: "GET",
				error: function(result){
					console.log(result);
				},
				dataType: "xml",
				success: function(xml){
					console.log(xml);
					var titleHolder = [];
					
					getGames(xml);

					function getGames(xml) {
						var games = $(xml).find('name').each(function(){
							//var titleHolder = [];
							var titles = $(this).contents().eq(0).text();
							console.log(titles);
							titleHolder.push(titles);
						});
						alert("Matt is currently playing: " + titleHolder[0] + ", " + titleHolder[1] + ", " + titleHolder[2] + ", " + titleHolder[3] + ", " + "and " + titleHolder[4] + "!");		
					};

				}

			});
				
		});
});




$('#edit').on('pageinit', function(){


	
	$('#submitEditedGame').on('click', function(){
		$('#resetEdit').click();

		console.log('edit form reset!');
	});
});





///adding outside listeners, variables, etc down below...

var cloudVal;
var favVal;

