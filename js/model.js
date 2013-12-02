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
            showTeLoginErrorDialog();
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
function createNewUser(username, password, email){
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp(null, {
        success: function(user) {
            showTheUserCreatedDialog();
        },
        error: function(user, error) {
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

    movie.save(null, {
        success: function(movie){
            
        },
        error: function(){

        }
    });
}

/**
 * This function gets the Movies from Parse
 * when the user is logged in
 */
function getItemsFromParse(){
    $("#tableBody").html("");
    
    var Movie = Parse.Object.extend("Movie");
    var user = Parse.Object.extend("User");
    
    var query = new Parse.Query(Movie);
    query.include("user");
    
    query.find({
       success: function(data){
            showOwnerHead();
            for(var i = 0; i < data.length; i++){
                var object = data[i].get("user");
                
                //Build the JSON-Object
                var provider = {
                    "name":data[i].get("title"),
                    "isSeen":data[i].get("isSeen"),
                    "ration":data[i].get("ration"),
                    "seenButton":createId(data[i].get("title"), 8),
                    "owner":object.get("username")
                };
                
                //Get the Rating
                var MovieRating = Parse.Object.extend("MovieRating");
                

                var title = data[i].get("title");
                var isSeen = data[i].get("isSeen");

                //Detect the User
                var user = Parse.User.current();

                var currentUserName = user.get("username");
                var itemUserName = object.get("username");

                //Append the Movie
                var viewable = createLoggedInObject(provider);
                appendNewMovie(viewable);

                //Toggle avgstars
                toggleAvgRating(data[i].get("title"));

                //Color avgstars
                getAverageRatingOfMovie(data[i].get("title"));

                //Take the Rating
                getOwnRatingOfMovie(data[i].get("title"));

                //Toggle the toolbar to the item
                toggleToolBar();

                //Toggle the isSeen Button
                toggleIsSeenButton(currentUserName, itemUserName, title, isSeen);
            }
            
        },
        error: function(){
                    
        }
    });
    
}

/**
 * This function gets all items to present to the unauthorized user
 */
function getAllItemsFromParse(bool){

    $("#ajaxloader").fadeIn();

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

                toggleAvgRating(provider.name);

                getAverageRatingOfMovie(provider.name)

                if(bool){
                    toggleToolBar();
                }

                //Clear the rating
                var rateId = createId(provider.name,4);
                $("#" + rateId).html("");

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
                    removeMovieratingFromParse(title);
                },
                error: function(){

                }
            });
        }
    });
}

/**
 * This funtion removes the Rating Object of the Movie
 */
function removeMovieratingFromParse(title){

    var MovieRating = Parse.Object.extend("MovieRating");
    var query = new Parse.Query(MovieRating);
    query.equalTo("title", title);
    query.first({
        success: function(object){
            object.destroy({
                success: function(){
                },
                error: function(){

                }
            })
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

/**
 * This function updates the Ration on Parse
 */
function updateRationOnParse(name, ration){
    var titleId = createId(name, 2);
    var filmName = $("#" + titleId).html();
    var user = Parse.User.current();

    var Movie = Parse.Object.extend("Movie");
    var query = new Parse.Query(Movie);
    query.equalTo("title", filmName);
    query.equalTo("user", user);
    query.first({
        success: function(object){
            object.set("ration", ration)
            object.save();
        },
        error: function(){
            alert("Objekt wurde nicht gefunden");
        }
    });
}

/**
 * This function creates a new Rating Object on Parse
 */
function saveRateObject(title){
    var MovieRating = Parse.Object.extend("MovieRating"); 
    var movieRating = new MovieRating();

    movieRating.set("title", title);
    movieRating.set("rating", new Array());

    movieRating.save(null, {
        success: function(movie){
            
        },
        error: function(){

        }
    });
    
}

/**
 * This function pushes the Rating to the Array on Parse
 */
function pushRatingToMovie(movieTitle, rating){
    
    var user = Parse.User.current();
    var username = user.get("username"); 
    
    var MovieRating = Parse.Object.extend("MovieRating");
    var query = new Parse.Query(MovieRating);
    query.equalTo("title", movieTitle);
    query.first({
        success: function(object){
            var ratingArray = object.get("rating");
            var updatedArray = new Array();

            //Object to store
            var ratingObject = {
                "user":username,
                "rating":rating
            };


            ratingArray.push(ratingObject);

            //Iterate over the array
            for(var i = 0; i < ratingArray.length; i++){
                updatedArray.push(ratingArray[i]);
            }

            //Remove the ratability for this user
            var idBase = createId(movieTitle, 10);

            for(var z = 1; z <= 5; z++){
                $("#" + idBase + z).attr("onclick", "showAlreadyRated();");
            }

            object.set("rating", updatedArray);
            object.save();
        }
    });
    
}

/**
 * This function gets the own rating from parse and imports
 * it to the view
 */
function getOwnRatingOfMovie(movieTitle){

    var user = Parse.User.current();
    var username = user.get("username");

    var idBase = createId(movieTitle, 10);

    var MovieRating = Parse.Object.extend("MovieRating");
    var query = new Parse.Query(MovieRating);
    query.equalTo("title", movieTitle);
    query.first({
        success: function(data){
            var ratingArray = data.get("rating");
            var isRatedByUser;

            //Iterate over the rating array
            for(var i = 0; i < ratingArray.length; i++){
                if(ratingArray[i].user == username){
                    //Color the stars
                    var rating = ratingArray[i].rating;
                    for(var y = 1; y <= rating; y++){
                        $("#" + idBase + y).addClass('active');
                        $("#" + idBase + y).attr("onclick", "");
                    }

                    //Remove the onclicks
                    for(var z = 1; z <= 5; z++){
                        $("#" + idBase + z).attr("onclick", "");
                    }

                    //Remove the enabled class from parent
                    var rateId = createId(movieTitle, 4);
                    $("#" + rateId).removeClass("enabled");

                }else{

                }
            }
        }
    })
}

/**
 * This function gets the average Rating of a Movie
 */
function getAverageRatingOfMovie(movieTitle){
    var idBase = createId(movieTitle, 10);

    var MovieRating = Parse.Object.extend("MovieRating");
    var query = new Parse.Query(MovieRating);
    query.equalTo("title", movieTitle);
    query.first({
        success: function(data){
            var ratingArray = data.get("rating");
            var allRating = 0;

            //Calc the whole rating
            for(var i = 0; i < ratingArray.length; i++){
                nextRating = parseInt(ratingArray[i].rating);  
                allRating = allRating + nextRating;
            }

            //Calc the average
            var average = Math.round(allRating / ratingArray.length);

            //Set the Value in the View
            var avgStarIdBase = createId(movieTitle, 13);

            //Iterate
            for(var y = 1; y <= average; y++){
                $("#" + avgStarIdBase + y).addClass("active");
            }

        }
    });
}

function sortByOwnRatingDescending(){

}