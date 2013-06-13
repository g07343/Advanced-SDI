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
	
	var createDiv = document.createElement('div');
				createDiv.setAttribute("id", "items");
				//createDiv.appendChild(createList);
				$('#viewGames').append(createDiv);
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

			function createItemLinks(key, createLinks){
				var editor = document.createElement('a');
				editor.href = "#edit";
				editor.key = key;
				editor.class = "editLink";
				var txt = "Edit Game";
				editor.innerHTML = txt;
				editor.addEventListener('click', editGame(key));
				createLinks.appendChild(editor);
				editor.style.display="block";
				
				var del = document.createElement('a');
				del.href = '#';
				del.key = key;
				console.log(key);
				var delTxt = " Delete Game";
				del.innerHTML = delTxt;
				//del.addEventListener('click', deleteGame());
				createLinks.appendChild(del);
			};
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
						console.log("HORRAAAY IT WAS CHECKED!");
						$('#editFavorite').prop('checked', true);
					} else {
						return;
					};

				}
				function retrieveCloud(){
					if(game.cloud[1] == "on") {
						//do this
						console.log("HORRAAAY CLOUD WAS CHECKED!");
						$('#editCloud').prop('checked', true);
					} else {
						return;
					};

				}
			};
			$('#submitEditedGame').on('click', function(){
				console.log("Edited games key is " + key);
				getFavorite();
				getCloud();
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
