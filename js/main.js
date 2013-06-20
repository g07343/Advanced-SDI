/*
Matthew Lewis
ASDI Term 1306
main.js file
*/

$('#home').on('pageinit', function(){


});

$('#add').on('pageinit', function(){
	
	
	
		$("#saveGame").on('click', function(key){
			getFavorite();
			getCloud();
			if(!key){
				var id = Math.floor(Math.random()*100065);
				console.log(id);
			}else{
				id = Math.floor(Math.random()*100065);
				console.log(key);
			getFavorite();
			getCloud();

			var game            = {};
				game.name       =["Name: ",    $("#name").val()];
				game.console    =["Console: ",    $("#console").val()];
				game.genre      =["Genre: ",     $("#genre").val()];
				game.bio        =["Bio: ",    $("#bio").val()];
				game.favorite   =["Favorite? ",   favVal];
				game.cloud      =["Cloud: ",   cloudVal];
				
					key = id;
					
					
					localStorage.setItem(id, JSON.stringify(game));

					alert("Game Saved!");
					$('#reset').click();
					//$('#addGame').reset();
					location.reload(true);
					
				}
				function getFavorite(){
					if ($('#favorite').is(':checked')){
						favVal = "yes";
						
					} else {
						favVal = "no";
						
					}
					console.log("favVal is " + favVal);
					return favVal;
				};
				function getCloud(){
					console.log("Cloud is" + $('#cloud').val());
					if($('#cloud').is(':checked')){
						cloudVal = "on";

					} else {
						cloudVal = "off";
					}
					return cloudVal;
				}


		});

		$('#clearStorage').on("click", function(){
			localStorage.clear();
			window.location.reload();
		});
});

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
						console.log([n][0]);
						if ([n][0] === 'name'){
							var titleText = obj[n][1];
							console.log(titleText);
							$(createTitle).text(titleText);
							console.log(titleText);
						}
						var createSubLi = document.createElement('li');
						//$(gameDiv).append(createSubLi);
						var optSubText = obj[n][0]+" "+obj[n][1];
						$(createSubLi).text(optSubText);
						$(gameLi).append(createSubLi);

						$(gameLi).append(createLinks);
						$(gameLi).append(createLinks1);
						
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
				editor.innerHTML = txt;
				createLinks.appendChild(editor);
				editor.style.display="block";
				
				var del = document.createElement('a');
				$(del).attr("href", "#display");
				del.key = key;
				$(del).attr("class", "deleteLink");
				var delTxt = "Delete Game";
				del.innerHTML = delTxt;
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
				console.log("Edited games key is " + key);
				getFavorite();
				getCloud();
				console.log("The edited game's key is: " + key);
				if(!key){
					var id = Math.floor(Math.random()*100065);
					console.log(id);
				}else{
					id = key
					
				getFavorite();
				getCloud();

				var game            = {};
					game.name       =["Name: ",    $("#editName").val()];
					game.console    =["Console: ",    $("#editConsole").val()];
					game.genre      =["Genre: ",     $("#editGenre").val()];
					game.bio        =["Bio: ",    $("#editBio").val()];
					game.favorite   =["Favorite? ",   favVal];
					game.cloud      =["Cloud: ",   cloudVal];
				
					key = id;
					
					
					localStorage.setItem(id, JSON.stringify(game));

					alert("Game Saved!");
					$('#reset').click();
					$("#editHome").click();
					location.reload(true);
				};

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



$('#settings').on('pageinit', function(){
	
	$('#restoreJson').on('click', function(){
		var resetAll =	confirm("This will delete all currently stored games and restore the default games.  This cannot be undone!");
		if (resetAll) {
			console.log('All games were deleted!');
			localStorage.clear();
			$.ajax({

				url: "xhr/json.json",
				type: "GET",
				error: function(result){
					console.log(result);
				},
				dataType: "json",
				success: function(result){
					console.log(result);
					$.each(result, function() {
						key = id;
						var id = Math.floor(Math.random()*1904857);
						localStorage.setItem(id, JSON.stringify(this));

					//console.log(game);
					// key = id;
					// var id = Math.floor(Math.random()*1904857);
					// localStorage.setItem(id, JSON.stringify(game));
					// 		console.log(localStorage.length);
					});
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
//$('saveGame').on('click', addGame());
var cloudVal;
var favVal;
//var edit = $('.edit').key;
