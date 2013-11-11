/**
 * Calls the Model-Function that connects to parse
 */
function connectParse(){
    establishParseConnection();
}

/**
 * Calls the Model-Function that checks parse's user state
 */
function checkAuthentificationState(){
    //Check if user is authorized
    var isAuthorized = checkLoginState();
    //React
    if(isAuthorized){
        showLoggedInView();
    }else{
        toggleLoginButton();
    }
}

/**
 * Calls the View-Function that removes the Login Area
 */
function deleteLoginArea(){
    removeLoginArea();
}

/**
 * Calls the View-Function that gets the form data, then calls the model function to log in
 */
function signIn(){
    var dataEntered = getLoginData();
    loginUser(dataEntered);
}

/**
 * Calls the Model-Function that logs the user out
 */
function logOut(){
    clearCurrentUser();
    showLoggedOutView();
}

/**
 * This function is called when the user wants to create a new Movie in the List
 */
function createNewItem(){
    var title = getNewMovieTitle();

    //Generate the new Object
    var item = {
      "name": title,
      "isSeen": false,
      "ration": null
    };

    var viewable;

    //React if Movie was seen
    if(item.isSeen){
        //Generate Code

    }else{
        //Generate Code
        viewable = createIsntSeenObject(item);
    }

    //Save item to Parse
    saveItemToParse(item);

    //Append the Item
    appendNewMovie(viewable);
}