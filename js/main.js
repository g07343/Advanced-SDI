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
					//$('#addGame').reset();
					window.location.reload();
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
				var edit = document.createElement('a');
				edit.href = "#";
				edit.key = key;
				var txt = "Edit Game ";
				edit.innerHTML = txt;
				//edit.addEventListener('click', editGame());
				createLinks.appendChild(edit);
				edit.style.display="block";
				
				var del = document.createElement('a');
				del.href = '#';
				del.key = key;
				var delTxt = " Delete Game";
				del.innerHTML = delTxt;
				//del.addEventListener('click', deleteGame());
				createLinks.appendChild(del);
			};
});

		



$('#settings').on('pageinit', function(){
	
});

$('#edit').on('pageinit', function(){
	
});

///adding outside listeners, variables, etc down below...
//$('saveGame').on('click', addGame());
var cloudVal;
var favVal;
