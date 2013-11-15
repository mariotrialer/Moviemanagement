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

    var viewable;

    //Check if field is filled
    if(checkEmptynessOfInputfield()){

        //Remove Error
        $("#errorContainer").html("");
        destroyErrorField();

        //Detect the User
        var user = Parse.User.current();

        var item = {
            "name":title,
            "user":user,
            "isSeen": false,
            "ration": 0
        };

        if(item.isSeen){

        }else{
            viewable = createIsntSeenObject(item);
        }

        //Save item to Parse
        saveItemToParse(item);

        //Append the Item
        appendNewMovie(viewable);

        //Toggle Toolbar to new Item
        toggleToolBar();

        //Clear the Field
        clearInputField();
    }else{
        $("#errorContainer").html("<span class='error'>Feld darf nicht leer sein</span>");
        makeErrorField();
    }
}

/**
 * This function calls the functions to append the stored movies to the list
 */
function pushStoredMoviesToList(bool){
    $("#ajaxloader").fadeIn();
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

function rateMovie(id){
    alert(id);

}

/**
 * Calls the Functions for deleting the Movie
 */
function deleteMovie(toolBar){

    var isWanted = confirm("Wollen sie den ausgewählten Film wirklich entfernen?");

    if(isWanted){
        var toolBarId = toolBar.attr("id");
        var idBase = toolBarId.replace(/toolBar_/g, "");
        var trId = createId(idBase, 1);
        var tcId = createId(idBase, 2);

        removeMovieFromParse(tcId);
        removeMovieFromView(trId);
    }else{

    }
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
    newBase = newBase.replace(/,/g, "");
    newBase = newBase.replace(/-/g, "");
    newBase = newBase.replace(/ /g, "");

    //Get the old Name from the view
    var oldName = $("#" + createId(oldBase, 2)).html();
    var newName = $("#newTitle").val();

    //Change the name in the view
    var newTitleCellId = createId(newBase, 2);
    $("#" + newTitleCellId).html($("#newTitle").val());
    
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

    //Change the id fo the rate cell 
    var oldRate = createId(oldBase, 4);
    var newRate = createId(newBase, 4);
    $("#" + oldRate).attr("id", newRate);

    //Change the id of the starWrap
    var oldStar = createId(oldBase, 9);
    var newStar = createId(newBase, 9);
    $("#" + oldStar).attr("id", newStar);

    //Change the id of the stars themeslves
    for(var i = 1; i <= 5; i++){
        var oldId = oldBase + i;
        var newId = newBase + i;
        $("#" + oldId).attr("id", newId);
    }
    
    //Change the id of the toolbar
    var oldTools = createId(oldBase, 7);
    var newTools = createId(newBase, 7);
    $("#" + oldTools).attr("id", newTools);

    //Change the id of the rename button
    var oldRenButt = createId(oldBase, 5);
    var newRenButt = createId(newBase, 5);
    $("#" + oldRenButt).attr("id", newRenButt);

    //Change the id of the remove Button
    var oldRemButt = createId(oldBase, 6);
    var newRemButt = createId(newBase, 6);
    $("#" +oldRemButt).attr("id", newRemButt);

    //Change the id of the info Button
    var oldInfoButt = createId(oldBase, 11);
    var newInfoButt = createId(newBase, 11);
    $("#" + oldInfoButt).attr("id", newInfoButt);

    //Rename the Movie on Parse
    renameMovieOnParse(oldName, newName);

    //Change the name in the view
    var newTitleCellId = createId(newBase, 2);
    $("#" + newTitleCellId).html($("#newTitle").val());
}

function sortTable(){
    sortAlphabetically();
}