/*
Matthew Lewis
ASDI Term 1306
main.js file
*/
$('#home').on('pageinit', function () {


});

$('#add').on('pageinit', function () {



    $("#saveGame").on('click', function (e) {
        var form = $("#addGame");
        validateGame(form);
        e.preventDefault();
    });

    $('#clearStorage').on("click", function () {
        localStorage.clear();
        window.location.reload();
    });
});

function storeGame(form) {
    console.log("Store game is run...");

    id = Math.floor(Math.random() * 100065);
    console.log(id);
    getFavorite(form);
    getCloud(form);

    var game = {};
    game.name = ["Name: ", $(form).find("#name").val()];
    game.console = ["Console: ", $(form).find("#console").val()];
    game.genre = ["Genre: ", $(form).find("#genre").val()];
    game.bio = ["Bio: ", $(form).find("#bio").val()];
    game.favorite = ["Favorite? ", favVal];
    game.cloud = ["Cloud: ", cloudVal];
    game._id = "user_" + $(form).find("#name").val();
    key = id;


    $.couch.db('gametracker').saveDoc(game, {
        success: function () {
            console.log("Game Saved!");
        }
    });

    alert("Game Saved!");
    $('#reset').click();
    //$('#addGame').reset();
    location.reload(true);


    function getFavorite(form) {
        if ($(form).find('#favorite').is(':checked')) {
            favVal = "yes";

        } else {
            favVal = "no";

        }
        console.log("favVal is " + favVal);
        return favVal;
    };

    function getCloud(form) {
        console.log("Cloud is" + $('#cloud').val());
        if ($(form).find('#cloud').is(':checked')) {
            cloudVal = "on";

        } else {
            cloudVal = "off";
        }
        return cloudVal;
    }


};

$(document).on('pageinit', '#editDefault', function () {
    var editDefault = confirm("Warning! This page will edit default stored games! Continue?");
    if (editDefault) {
        //console.log("edit default page is loaded!");
        var edit = urlDecode($(this).data('url'))['name'];
        var urlData = $(this).data('url');
        console.log(edit);

    } else {
        $('#resetDefault').click();
        $('#cancelDefault').click();
    }
});

//use "pageshow" instead so that it will check everytime the show page is loaded instead of only firing once.
$(document).on('pageshow', '#display', function () {
    $.couch.db('gametracker').view('app/filter', {
        success: function (data) {
            if (data.rows.length === 0) {
                alert("You haven't saved any games yet! Default games will be created! NOTE: These games cannot be edited!")
                console.log('success!');
                $.couch.db("gametracker").view("app/games", {
                    success: function (data) {
                        console.log(data);
                        var createDiv = document.createElement('div');
                        createDiv.setAttribute("id", "items");
                        $.each(data.rows, function (index, program) {
                            //console.log(index);
                            var gameDiv = document.createElement('div');
                            $('#display').append(gameDiv);
                            $(gameDiv).attr("data-role", "collapsible");
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
                            //$(gameLi).append(createSubLi);

                            // var createLinks = document.createElement('li');
                            // $(createLinks).attr("data-theme", "a");
                            // var createLinks1 = document.createElement('li');
                            // $(createLinks1).attr("data-theme", "a");

                            var obj = program.value;
                            var id = getKey();

                            function getKey() {
                                var obj = program.value;
                                $.each(obj, function (key, value) {
                                    if (key == "name") {
                                        var id = value[1];
                                        console.log(id);
                                        return id;
                                    }
                                });
                            }


                            $.each(obj, function (key, value) {
                                //console.log(obj.value.name[1]);
                                // var game = {};

                                var createSubLi = document.createElement('li');
                                //$(gameDiv).append(createSubLi);
                                $(gameLi).append(createSubLi);
                                var optSubText = value[0] + " " + value[1];
                                $(createSubLi).text(optSubText);
                                $(gameLi).append(createSubLi);

                                //$(gameLi).append(createLinks);
                                //$(gameLi).append(createLinks1);

                                var titleText = program.value.name[1];
                                //console.log(titleText);
                                $(createTitle).text(titleText);

                            });

                            //createItemLinks(id, createLinks, createLinks1);
                        });
                        $('#display').find('div[data-role=collapsible]').collapsible();
                        $('#display').find('li[data-role=listview]').listview();

                        function createItemLinks(key, createLinks, createLinks1) {

                            var editor = document.createElement('a');
                            $(editor).attr("href", "#edit");
                            editor.key = key;
                            //console.log(key);
                            $(editor).attr("data-key", key);
                            $(editor).attr("class", "editLink");
                            var txt = "Edit Game";
                            $(editor).text(txt);
                            createLinks.appendChild(editor);
                            editor.style.display = "block";

                            var del = document.createElement('a');
                            $(del).attr("href", "#display");
                            del.key = key;
                            $(del).attr("class", "deleteLink");
                            var delTxt = "Delete Game";
                            $(del).text(delTxt);
                            //$(del).on('click', deleteGame(key));
                            createLinks1.appendChild(del);
                            del.style.display = "block";
                        };
                    }
                });
            } else {
                userGames(data);
            }
        }
    });

    function userGames(data) {
        //console.log(data);
        //console.log()
        //var id = value.id;
        //console.log(id);
        //var rev = value.value.rev;
        //console.log(rev);
        var createDiv = document.createElement('div');
        createDiv.setAttribute("id", "items");
        $.each(data.rows, function (index, program) {
            var id = program.id;
            //console.log(id);
            var rev = program.value.rev;
            //console.log(rev);
            var gameDiv = document.createElement('div');
            $(gameDiv).attr('id', 'gameDiv');
            $('#display').append(gameDiv);
            $(gameDiv).attr("data-role", "collapsible");
            var createTitle = document.createElement('h3');
            $(gameDiv).append(createTitle);
            var gameLi = document.createElement('li');
            $(gameLi).attr('data-role', 'listview');
            $(gameDiv).append(gameLi);
            var createLinks = document.createElement('li');
            $(createLinks).attr("data-theme", "a");
            var createLinks1 = document.createElement('li');
            $(createLinks1).attr("data-theme", "a");
            var obj = program.value;
            //var key =
            $.each(obj, function (key, value) {
                if (key == "rev") {
                    return;
                }
                var createSubLi = document.createElement('li');
                $(gameLi).append(createSubLi);
                var optSubText = value[0] + " " + value[1];
                $(createSubLi).text(optSubText);
                $(gameLi).append(createSubLi);
                $(gameLi).append(createLinks);
                $(gameLi).append(createLinks1);
                var titleText = program.value.name[1];
                $(createTitle).text(titleText);

            });
            createItemLinks(id, rev, createLinks, createLinks1);
        });
        $('#display').find('div[data-role=collapsible]').collapsible();
        $('#display').find('li[data-role=listview]').listview();

        function createItemLinks(key, rev, createLinks, createLinks1) {
            //console.log(key);
            //console.log(rev);
            var editor = document.createElement('a');
            $(editor).attr("href", "#edit");
            editor.key = key;
            //console.log(key);
            $(editor).attr("data-key", key);
            $(editor).attr("class", "editLink");
            var txt = "Edit Game";
            $(editor).text(txt);
            createLinks.appendChild(editor);
            editor.style.display = "block";

            var del = document.createElement('a');
            $(del).attr("href", "#display");
            del.key = key;
            del.rev = rev;
            //console.log(rev);
            $(del).attr("class", "deleteLink");
            var delTxt = "Delete Game";
            $(del).text(delTxt);
            //$(del).on('click', deleteGame(key));
            createLinks1.appendChild(del);
            del.style.display = "block";
            $('.deleteLink').on('click', function () {
                var promptUser = confirm("Are you sure you want to delete this game?");
                if (promptUser) {
                    var key = this.key;
                    var rev = this.rev;
                    var destroy = {
                        _id: key,
                        _rev: rev
                    };

                    $.couch.db('gametracker').removeDoc(destroy, {
                        success: function () {
                            console.log('did it work??');
                        }
                    });
                    $("#gameDiv").text("");
                    $('#editHome').click();
                    alert("Game Deleted!");
                    window.location.reload();
                };
                alert("Game Saved!");
                $('#editHome').click();
                window.location.reload();

            });
        };

        // $('.deleteLink').on('click', function(){
        // console.log("delete clicked!");
        // var promptUser = confirm("Are you sure you want to delete this game?");
        // //console.log(this.key);
        // if(promptUser){
        // var id = this.key;
        // // var destroy = {};
        // // destroy.key = this.key;
        // // destroy.rev = rev;
        // $.couch.db('gametracker').openDoc(id, {
        // success: function (data) {
        // var id = data._id;
        // var rev = data._rev;

        // var destroy = {
        // _id: id,
        // _rev: rev
        // };

        // $.couch.db().removeDoc(destroy, {
        // success: function(data){
        // console.log("Did it work??")
        // }
        // });

        // //console.log("game deleted successfully!");
        // }
        // });
        // alert("Game deleted!");
        // window.location.reload();
        // }else{
        // alert("Game saved.");
        // }
        // });

        $(".editLink").on('click', function () {
            //console.log(this.key);
            var id = this.key;
            $.couch.db('gametracker').openDoc(id, {
                success: function (data) {
                    console.log(data);
                    //console.log($(data).key);
                    //console.log("Opened document's rev was: " + rev);
                    var favVal = retrieveFav();
                    var cloudVal = retrieveCloud();

                    $("#editName").val(data.name[1]);
                    $("#editConsole").val(data.console[1]).selectmenu("refresh");
                    //console.log(data.console[1]);
                    $("#editGenre").val(data.genre[1]).selectmenu("refresh");
                    $("#editBio").val(data.bio[1]);



                    var id = data._id;
                    var rev = data._rev;

                    $("#submitEditedGame").on('click', function (e) {
                        e.preventDefault();
                        console.log(this.id);
                        editCarrier($('#editForm'), id, rev);
                        console.log("///////////////////////////////////////////////");

                    });

                    function retrieveFav() {
                        console.log("retrieveFav run!");
                        if (data.favorite[1] == "yes") {
                            //do this
                            //console.log("FAVORITE WAS CHECKED!");
                            $('#editFavorite').prop('checked', true).checkboxradio('refresh');
                        } else {
                            return;
                        };

                    }

                    function retrieveCloud() {
                        console.log("retrieveCloud run!");
                        if (data.cloud[1] == "on") {
                            //console.log("cloud was checked");
                            //do this
                            //console.log("CLOUD WAS CHECKED!");
                            $('#editCloud').prop('checked', true).checkboxradio('refresh');
                            //console.log("did it check??");
                            return;
                        } else {
                            //console.log("cloud was not checked");
                            return;
                        };

                    }
                }

            });

        });


    };

    function editCarrier(form, id, rev) {
        //$('#resetEdit').click();
        console.log('edit form reset!');
        validateEdited(form, id, rev);
    };

    ///////////////////////////////////////////////////////////////////////////////////////


});

function showLocal() {

    $(gameDiv).listview('refresh');




    var createDiv = document.createElement('div');
    createDiv.setAttribute("id", "items");
    //$(createDiv).attr("data-role", "collapsible");
    //createDiv.appendChild(createList);

    for (var i = 0, len = localStorage.length; i < len; i++) {
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
        for (var n in obj) {
            //console.log([n][0]);
            if ([n][0] === 'name') {
                var titleText = obj[n][1];
                //console.log(titleText);
                $(createTitle).text(titleText);
                //console.log(titleText);
            } else {
                var createSubLi = document.createElement('li');
                //$(gameDiv).append(createSubLi);
                var optSubText = obj[n][0] + " " + obj[n][1];
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


    function createItemLinks(key, createLinks) {

        var editor = document.createElement('a');
        $(editor).attr("href", "#edit");
        editor.key = key;
        $(editor).attr("data-key", key);
        $(editor).attr("class", "editLink");
        var txt = "Edit Game";
        $(editor).text(txt);
        createLinks.appendChild(editor);
        editor.style.display = "block";

        var del = document.createElement('a');
        $(del).attr("href", "#display");
        del.key = key;
        $(del).attr("class", "deleteLink");
        var delTxt = "Delete Game";
        $(del).text(delTxt);
        //$(del).on('click', deleteGame(key));
        createLinks1.appendChild(del);
        del.style.display = "block";

    };



    $('.deleteLink').on('click', function () {
        console.log("delete clicked!");
        var promptUser = confirm("Are you sure you want to delete this game?");
        if (promptUser) {

            console.log(this.rev);
            alert("Game deleted!");
            window.location.reload();
        } else {
            alert("Game saved.");
        }
    });

    $('.editLink').on('click', function (e) {
        console.log("The game to be edited's key is: " + this.key);
        editGame(this.key);

    });


    function editGame(key) {
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
        $("#editFavorite").val(favVal);

        function retrieveFav() {
            if (game.favorite[1] == "yes") {
                //do this
                //console.log("FAVORITE WAS CHECKED!");
                $('#editFavorite').prop('checked', true);
            } else {
                return;
            };

        }

        function retrieveCloud() {
            if (game.cloud[1] == "on") {
                //do this
                //console.log("CLOUD WAS CHECKED!");
                $('#editCloud').prop('checked', true);
            } else {
                return;
            };

        }
        // $('#submitEditedGame').on('click', function(e){
        // e.preventDefault();
        // var form = $("#editForm");
        // validateEdited(form, key);
        // console.log("Edited games key is " + key);
        // e.preventDefault();

        // });



    };

    function getFavorite() {
        if ($('#editFavorite').is(':checked')) {
            favVal = "yes";

        } else {
            favVal = "no";

        }
        console.log("favVal is " + favVal);
        return favVal;
    };

    function getCloud() {
        console.log("Cloud is" + $('#cloud').val());
        if ($('#editCloud').is(':checked')) {
            cloudVal = "on";

        } else {
            cloudVal = "off";
        }
        return cloudVal;
    }


};

function validateGame(form) {
    var errors = 0;
    var errorMsgs = [];
    $("#errorMsgs").text('');
    console.log("validate form is run!");
    //console.log($(form).find("#console").val());
    if ($(form).find("#name").val().length < 3) {
        errors++;
        console.log("NAME ERROR! " + errors);
        var nameError = "Please input a valid game Name";
        errorMsgs.push(nameError);

    }
    if ($(form).find("#console").val() === "") {
        errors++;
        console.log("CONSOLE ERROR! " + errors);
        var consoleError = "Please input a valid console";
        errorMsgs.push(consoleError);
    }
    if ($(form).find("#genre").val() === "") {
        errors++;
        console.log("GENRE ERROR! " + errors);
        var genreError = "Please input a valid genre";
        errorMsgs.push(genreError);

    }
    if (errors >= 1) {
        console.log("Form generated " + errors + " errors.");
        console.log(errorMsgs.length);
        for (var i = 0, j = errorMsgs.length; i < j; i++) {
            var errorLi = document.createElement('li');
            $(errorLi).attr("class", "errorMessages");
            var errorUL = $('#errorMsgs');
            $(errorLi).text(errorMsgs[i]);
            errorUL.append(errorLi);
            //location.reload(true);
        }
    } else {
        console.log("Form passes validation");
        storeGame(form);
    };

};

function validateEdited(form, key, rev) {
    var errors = 0;
    var errorMsgs = [];
    var key = key;
    $("#editError").text('');
    console.log(" edit validate form is run!");
    //console.log($(form).find("#console").val());
    if ($(form).find("#editName").val().length < 3) {
        errors++;
        console.log("NAME ERROR! " + errors);
        var nameError = "Please input a valid game Name";
        errorMsgs.push(nameError);

    }
    if ($(form).find("#editConsole").val() === "") {
        errors++;
        console.log("CONSOLE ERROR! " + errors);
        var consoleError = "Please input a valid console";
        errorMsgs.push(consoleError);
    }
    if ($(form).find("#editGenre").val() === "") {
        errors++;
        console.log("GENRE ERROR! " + errors);
        var genreError = "Please input a valid genre";
        errorMsgs.push(genreError);

    }
    if (errors >= 1) {
        console.log("Form generated " + errors + " errors.");
        console.log(errorMsgs.length);
        for (var i = 0, j = errorMsgs.length; i < j; i++) {
            var errorLi = document.createElement('li');
            $(errorLi).attr("class", "errorMessages");
            var errorUL = $('#editError');
            $(errorLi).text(errorMsgs[i]);
            errorUL.append(errorLi);
            //location.reload(true);
        }
    } else {
        console.log("Form passes edit validation");
        submitEdit(form, key, rev);
    };

};

function submitEdit(form, key, rev) {
    console.log("addGame is run");
    console.log(key);
    console.log(rev);
    id = key;
    getFavorite();
    getCloud();

    var game = {};
    _id = key;
    _rev = rev;
    game.name = ["Name: ", $(form).find("#editName").val()];
    game.console = ["Console: ", $(form).find("#editConsole").val()];
    game.genre = ["Genre: ", $(form).find("#editGenre").val()];
    game.bio = ["Bio: ", $(form).find("#editBio").val()];
    game.favorite = ["Favorite? ", favVal];
    game.cloud = ["Cloud: ", cloudVal];

    $.couch.db('gametracker').saveDoc(game, {
        success: function (data) {
            console.log(data);
        }
    });


    alert("Game Saved!");
    $('#reset').click();
    $("#editHome").click();
    $('#resetEdit').click();
    location.reload(true);

    function getFavorite() {
        if ($('#editFavorite').is(':checked')) {
            favVal = "yes";

        } else {
            favVal = "no";

        }
        console.log("favVal is " + favVal);
        return favVal;
    };

    function getCloud() {
        //console.log("Cloud is" + $('#cloud').val());
        if ($('#editCloud').is(':checked')) {
            cloudVal = "on";

        } else {
            cloudVal = "off";
        }
        return cloudVal;
    }
};
$('#settings').on('pageinit', function () {

    $('#restoreJson').on('click', function () {
        var resetAll = confirm("This will delete all currently stored games and restore the default games. This cannot be undone!");
        if (resetAll) {
            console.log('All games were deleted!');
            localStorage.clear();
            $.ajax({

                url: "_view/games",
                //type: "GET",
                error: function (result) {
                    console.log('error');
                    console.log(result);
                },
                dataType: "json",
                success: function (result) {
                    console.log('success!');
                    console.log(result);
                    $.each(result.rows, function (index, program) {
                        var game = {};

                        game.name = program.value.name;
                        game.console = program.value.console;
                        game.genre = program.value.genre;
                        game.bio = program.value.bio;
                        game.favorite = program.value.favorite;
                        game.cloud = program.value.cloud;
                        key = id;
                        var id = Math.floor(Math.random() * 1904857);
                        localStorage.setItem(id, JSON.stringify(game));
                        //console.log(value);
                    });
                    location.reload(true);

                }

            });
        };
    });
    $('#restoreXml').on('click', function () {
        console.log('restoreXML was clicked');
        $.ajax({

            url: "xhr/xml.xml",
            type: "GET",
            error: function (result) {
                console.log(result);
            },
            dataType: "xml",
            success: function (xml) {
                console.log(xml);
                var titleHolder = [];

                getGames(xml);

                function getGames(xml) {
                    var games = $(xml).find('name').each(function () {
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




$('#edit').on('pageinit', function () {




});




///adding outside listeners, variables, etc down below...

var cloudVal;
var favVal;