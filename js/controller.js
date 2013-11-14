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
        pushStoredMoviesToList(true);
        showLoggedInView();
    }else{
        pushStoredMoviesToList();
        showLoggedOutView();
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
      "ration": 0
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

    //Toggle Toolbar to new Item
    toggleToolBar();
}

/**
 * This function calls the functions to append the stored movies to the list
 */
function pushStoredMoviesToList(bool){
    getAllItemsFromParse(bool);
}

/**
 * This function updates the isSeen-Cell on parse to the given boolean
 */
function updateIsSeen(bool, id){
    var idBase = id.replace(/seenButton_/g, "");
    var cellId = "seenCell_" + idBase;
    var titleId = "titleCell_" + idBase;
    if(bool){
        //If movie was seen
        updateSeenIcon(true, cellId);
        updateIsSeenOnParse($("#" + titleId).html(), true);
    }else{
        //If movie wasnt seen
        updateSeenIcon(false, cellId);
        updateIsSeenOnParse($("#" + titleId).html(), false);
    }
}

function rateMovie(id, object){
    
}

/**
 * Calls the Functions for deleting the Movie
 */
function deleteMovie(toolBar){
    var toolBarId = toolBar.attr("id");
    var idBase = toolBarId.replace(/toolBar_/g, "");
    var trId = createId(idBase, 1);
    var tcId = createId(idBase, 2);

    removeMovieFromParse(tcId);
    removeMovieFromView(trId);
}

/**
 * This function calls the model and the view
 */ 
function showInfoDialog(movieTitle){
    passFirstRequestToOmdb(movieTitle);
}

/**
 * This function calls the Rename Dialog
 */
function renameMovie(id){
    showTheRenameDialog(id);
}

/**
 * This function reacts to the rename dialogs action
 */
function updateName(id){
    closeDialog();
    var oldBase = id.replace(/renameButton_/g, "");
    var newBase = $("#newTitle").val();
    
    //Change the id of the title cell
    var oldRow = createId(oldBase, 1); 
    var newRow = createId(newBase, 1);
    $("#" + oldRow).attr("id", newRow);

    //Change the id of the title cell
    var oldTitle = createId(oldBase, 2);
    var newTitle = createId(newBase, 2);
    $("#" + oldTitle).attr("id", newTitle);

    //Change the seen cell
    var oldSeen = createId(oldBase, 3);
    var newSeen = createId(newBase, 3);
    $("#" + oldSeen).attr("id", newSeen);


}