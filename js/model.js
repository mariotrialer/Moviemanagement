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
    user.set("username", "mariotrialer");
    user.set("password", "password");
    user.set("email", "mariotrialer@gmail.com");

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

function getAllItemsFromParse(){
    
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

            }
        },
        error: function(){
            alert("Fehler beim holen der Filme");
        }
    });
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