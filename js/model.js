/**
 * Establishes connection to the parse server
 */
function establishParseConnection(){
    Parse.initialize("6TqDhyYk8m2dVk5QWM6NNHR6fOy6ACZi3q20dzKh", "DJMLFhKf5StPcDDp9fM7PJhtDr8R1xHfp26E8Ja1");
}

/**
 * This function checks if the user is logged in
 * @returns {*}
 */
function checkLoginState(){
    //Check if user is logged in
    var isLoggedIn;
    var currentUser = Parse.User.current();
    if (currentUser) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
    return isLoggedIn;
}

/**
 * This function logs the user in
 * @param formData
 */
function loginUser(formData){
    isRight = Parse.User.logIn(formData.name, formData.pass, {
        success: function(){
            showLoggedInView();
        },
        error: function(){
            alert("Verdammt");
        }
    });
}

/**
 * Logs the user out
 */
function clearCurrentUser(){
    Parse.User.logOut();
}

/**
 * This function is temporaryly used to create a new User on Parse
 */
function createNewUser(){
    var user = new Parse.User();
    user.set("username", "fischeni");
    user.set("password", "password");
    user.set("email", "fischeni@dhbw-loerrach.de");

    user.signUp(null, {
        success: function(user) {
            alert("Yes");
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

/**
 * This function saves a new Movie to Parse
 * @param movie
 */
function saveItemToParse(film){
    var Movie = Parse.Object.extend("Movie");
    var movie = new Movie();

    movie.set("title", film.name);
    movie.set("user", film.user);
    movie.set("isSeen", film.isSeen);
    movie.set("ration", film.ration);

    movie.save(null, {
        success: function(movie){
            alert("Gespeichert");
        },
        error: function(){

        }
    });
}

function getUserItemsFromParse(bool){

    $("#tableBody").html("");

    //Detect the User
    var user = Parse.User.current();

    var Movie = Parse.Object.extend("Movie");
    var query = new Parse.Query(Movie);
    query.equalTo("user", user);
    query.find({
        success: function(results){
            for(var i = 0; i < results.length; i++){
                var object = results[i];

                var viewable;

                //Build the JSON Object
                var provider = {
                    "name":object.get('title'),
                    "isSeen":object.get('isSeen'),
                    "ration":object.get('ration'),
                    "seenButton":createId(object.get('title'),8)
                }

                //Check if Movie was seen
                if(provider.isSeen){
                    viewable = createIsSeenObject(provider);
                    //Append the Button
                    viewable.isSeenHtml = _.template(seenButtonTemplate, {provider:provider});
                }else{
                    viewable = createIsntSeenObject(provider); 
                    //Append the Button   
                    viewable.isSeenHtml = _.template(notSeenButtonTemplate, {provider:provider});
                }

                appendNewMovie(viewable);

                if(bool){
                    toggleToolBar();
                }

            } 
        }
    })
}

function getAllItemsFromParse(bool){

    $("#tableBody").html("");
    
    var Movie = Parse.Object.extend("Movie");
    var query = new Parse.Query(Movie);
    query.find({
        success: function(results){
            for(var i = 0; i < results.length; i++){
                var object = results[i];

                var viewable;

                //Build the JSON object
                var provider = {
                    "name":object.get('title'),
                    "isSeen":object.get('isSeen'),
                    "ration":object.get('ration')
                }

                //Check if Movie was seen
                if(provider.isSeen){
                    viewable = createIsSeenObject(provider);
                }else{
                    viewable = createIsntSeenObject(provider);    
                }

                appendNewMovie(viewable);

                if(bool){
                    toggleToolBar();
                }

            }
        },
        error: function(){
            alert("Fehler beim holen der Filme");
        }
    });
    $("#ajaxloader").fadeOut();
    
}

/**
 * This function updates the isSeen field to the bool Param value
 */
function updateIsSeenOnParse(name, bool){

    var Movie = Parse.Object.extend("Movie");

    var query = new Parse.Query(Movie);
    query.equalTo("title", name);
    query.first({
        success: function(object){
            object.set("isSeen", bool)
            object.save();
        },
        error: function(){
            alert("Objekt wurde nicht gefunden");
        }
    });
}

/**
 * This function removes the given Movie from parse
 */
function removeMovieFromParse(tcId){
    var title = $("#" + tcId).html();
    
    var Movie = Parse.Object.extend("Movie");
    var query = new Parse.Query(Movie);
    query.equalTo("title", title);
    query.first({
        success: function(object){
            object.destroy({
                success: function(){
                    
                },
                error: function(){

                }
            });
        }
    });
}

/**
 * This function searches for the given Title in OMDB
 */
function passFirstRequestToOmdb(movieTitle){
    $("#ajaxloader").fadeIn();
    var idBase = movieTitle.replace(/infoButton_/g, "");
    var titleCell = "titleCell_" + idBase;
    var name = $("#" +titleCell).html();
    $.ajax({
        url: 'http://www.omdbapi.com/?s=' + name,
        type: 'GET',
        dataType: 'JSON',
        success: function(data){
            if(data.Search != null){
                var movies = data.Search;
                showVariousOptionsDialog(movies);
            }else{
                showNotFoundDialog();
            }

        },
        error: function(){
            alert("Fehltritt");
        }
    });
    $("#ajaxloader").hide();
}

/**
 * This function takes the info of a film with a special id
 */
function getInfoOfSpecialMovie(){
    $("#ajaxloader").fadeIn();
    var value = $("#moviesList").val();
    $.ajax({
        url: "http://www.omdbapi.com/?i=" + value,
        type: "Get",
        dataType: "JSON",
        success: function(data){
            //Build the Json with the required information
            var info = {
                "title":data.Title,
                "cover":data.Poster,
                "rating":data.imdbRating,
                "year":data.Year,
                "regie":data.Director,
                "runtime":data.Runtime,
                "genre":data.Genre
            };

            showTheInfoDialog(info);

        },
        error: function(){
            alert("Fuck");
        }
    });
    $("#ajaxloader").hide();
}

/**
 * This function renames the Movie on Parse
 */
function renameMovieOnParse(oldName, newName){

    var Movie = Parse.Object.extend("Movie");

    var query = new Parse.Query(Movie);
    query.equalTo("title", oldName); 
    query.first({
        success: function(object){
            object.set("title", newName)
            object.save();
        },
        error: function(){
            alert("Objekt wurde nicht gefunden");
        }
    });

}

function getItemsForSort(array){

    $("#tableBody").html("");

    for(var i = 0; i < array.length; i++){
        var id = array[i];

        var Movie = Parse.Object.extend("Movie");

        var query = new Parse.Query(Movie);
        query.equalTo("title", id);
        query.first({
            success: function(object){
                var viewable;
                //alert(JSON.stringify(object));
                //Build the JSON object
                var provider = {
                    "name":object.get('title'),
                    "isSeen":object.get('isSeen'),
                    "ration":object.get('ration')
                }

                //Check if Movie was seen
                if(provider.isSeen){
                    viewable = createIsSeenObject(provider);
                }else{
                    viewable = createIsntSeenObject(provider);    
                }

                appendNewMovie(viewable);
            },
            error: function(){
                alert("Objekt wurde nicht gefunden");
            }
        }); 
    }
}

/**
 * This function gets the Movies the user has already Seen
 */
function getSeenItemsFromParse(){

    //Detect the User
    var user = Parse.User.current();

    var Movie = Parse.Object.extend("Movie");
    var query = new Parse.Query(Movie);
    query.equalTo("user", user);
    query.equalTo("isSeen", true);
}