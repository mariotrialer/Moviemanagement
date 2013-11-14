/**
 * This function toggles the Logout Button to the title bar
 */
function toggleLogoutButton(){
    $("#buttonContainer").hide();
    var output = _.template(logoutButtonTemplate, {});
    $("#buttonContainer").html(output);
    $("#buttonContainer").fadeIn();
}

/**
 * This function toggles the Login Buttons to the title bar
 */
function toggleLoginButton(){
    $("#buttonContainer").hide();
    var output = _.template(loginButtonTemplate, {});
    $("#buttonContainer").html(output);
    $("#buttonContainer").fadeIn();
}

/**
 * This function toggles the Login-Area
 */
function toggleLoginArea(){
    $("#loginArea").hide();
    var output = _.template(loginAreaTemplate, {});
    $("#buttonContainer").html("");
    $("#loginArea").html(output);
    $("#loginArea").slideDown();
}


/**
 * This function slides the Loginarea out
 * and then removes the jumbotron
 */
function removeLoginArea(){
    $("#loginArea").slideUp();
    toggleLoginButton();
    $("#loginFormContainer").remove();
}

/**
 * This function gets the data the user entered into the
 * Login-Form
 * @returns {}
 */
function getLoginData(){
    var name = $("#nameField").val();
    var pass = $("#passField").val();
    var retObj = {
        "name":name,
        "pass":pass
    };
    return retObj;
}

/**
 * This function changes the View to logged out
 */
function showLoggedInView(){
    deleteLoginArea();
    toggleLogoutButton();
    toggleToolTitle();
    toggleAddArea();
    toggleToolBar();
    toggleSawTitle();
}

/**
 * This function changes the view to logged out
 */
function showLoggedOutView(){
    toggleLoginButton();
    removeToolTitle();
    removeAddArea();
    removeOnClickFromStars();
    removeToolBar();
    removeSawTitle();
}

/**
 * This function adds the container where the user can create
 * new Movies
 */
function toggleAddArea(){
    var output = _.template(addFieldTemplate, {});
    $("#addMovieContainer").html(output);
}

/**
 * This function removes the whole Add-Area
 */
function removeAddArea(){
    $("#addMovieContainer").html("");
}

/**
 * This function reads the User Input and returns the value
 * @returns {*|jQuery}
 */
function getNewMovieTitle(){
    var title = $("#movieTitle").val();
    return title;
}

/**
 * This function templates a new Item and appends it to the
 * List
 * @param item
 */
function appendNewMovie(item){
    var output = _.template(listRowTemplate, {item:item});

    $("#tableBody").append(output);
}

/**
 * This function adds the saw column
 */
function toggleSawTitle(){
    $("#sawHead").html("Gesehen?");
}

/**
 * This function removes the saw column
 */
function removeSawTitle(){
    $("#sawHead").html("");
}

/**
 * This function adds the Tool Column
 */
function toggleToolTitle(){
    $("#toolHead").html("Tools");
}

/**
 * This function removes the Tool Column
 */
function removeToolTitle(){
    $("#toolHead").html("");
}

/*
 * This function retemplates the Seen Button
 */
function updateSeenIcon(bool, id){
    var idBase = id.replace(/seenCell_/g, "");
    var buttonId = "seenButton_" + idBase;
    var provider = {"seenButton":buttonId};
    if(bool){
        var output = _.template(seenButtonTemplate, {provider:provider});
        $("#" + id).html(output);
    }else{
        var output = _.template(notSeenButtonTemplate, {provider:provider});
        $("#" + id).html(output);
    }
}

/**
 * This function removes the Listener from the stars
 */
function removeOnClickFromStars(){
    $(".star").attr("onclick", "");
}

function toggleRating(){

}

/**
 * This function templates the tools to each item
 */
function toggleToolBar(){
    var ids = [];

    //Iterate over Table and push the rows into array
    $('#tableBody tr').each(function(){
        ids.push(this.id);
    });

    for(var i = 0; i < ids.length; i++){
        var idBase = ids[i].replace(/rowId_/g, "");
        var toolId = "toolBar_" + idBase;
        var renameButton = createId(idBase, 5);
        var removeButton = createId(idBase, 5);

        var item = {
            "renameButton":renameButton,
            "removeButton":removeButton
        }
        
        var output = _.template(toolTemplate, {item:item});
        $("#" + toolId).html(output);
    }
}

/**
 * This function removes the tools from each item
 */
function removeToolBar(){
    $(".toolsItem").html('');
}

/**
 * This function removes the Movie from the View
 */
function removeMovieFromView(rowId){
    $("#" + rowId).remove();
}

/**
 * Functions for the dialog
 */
$("#myModal").on("show", function() {    // wire up the OK button to dismiss the modal when shown
    $("#myModal a.btn").on("click", function(e) {
        console.log("button pressed");   // just as an example...
        $("#myModal").modal('hide');     // dismiss the dialog
    });
});

$("#myModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
    $("#myModal a.btn").off("click");
});

$("#myModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
    $("#myModal").remove();
});

$("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
  "backdrop"  : "static",
  "keyboard"  : true,
  "show"      : false                     // ensure the modal is shown immediately
});

/**
 * This function closes the Dialog
 */
function closeDialog(){
    $("#myModal").modal('hide');
}

/**
 * This function shows the Dialog with a dropdown
 */
function showVariousOptionsDialog(object){
    var contentOfDialog = $("#contentOfDialog").html("");
    var headline = "<h3>Es gibt mehrere Treffer zu ihrer Anfrage</h3>";
    var head2 = "<h4>Bitte treffen sie ihre Auswahl</h4>";
    $("#contentOfDialog").append(headline);
    $("#contentOfDialog").append(head2);

    var selectBox = "<select id='moviesList' class='form-control'>";

    $.each(object, function(i,obj){
        selectBox = selectBox + "<option value=" + obj.imdbID + ">" + obj.Title + ", " + obj.Year + "</option>";
    });
    selectBox = selectBox + "</select>";

    $("#contentOfDialog").append(selectBox);
    $("#dialogOk").attr("onclick", "getInfoOfSpecialMovie();");
    openDialog();
}

/**
 * This function shows the info dialog
 */
function showTheInfoDialog(info){
    var output = _.template(infoTemplate, {info:info});
    $("#dialogOk").attr("onclick", "closeDialog();");
    $("#contentOfDialog").html(output);   
}

/**
 * This function shows the dialog for renaming
 */
function showTheRenameDialog(id){
    var output = _.template(renameTemplate, {});
    $("#contentOfDialog").html(output);
    $("#dialogOk").attr("onclick", "updateName('" + id +"');");
    openDialog();
}

/**
 * This function shows the not found dialog
 */
function showNotFoundDialog(){
    var output = "<h3>Fehler</h3><h4>Zum angegebenen Titel konnten keine Informationen abgerufen werden :(</h4>";
    output = output + "<p>Bitte überprüfen sie ihre Eingabe</p>";
    $("#contentOfDialog").html(output);
    $("#dialogOk").attr("onclick", "closeDialog();");
    openDialog();
}

/**
 * Opens the Modal dialog
 */
function openDialog(){
    $("#myModal").modal('show');
}

/**
 * Closes the Modal Dialog
 */
function closeDialog(){
    $("#myModal").modal('hide');
}

function sortAlphabetically(){
    
    var ids = new Array();

    //Itearte through table
    $('#tableBody tr').each(function(){
        ids.push(this.id);
    });  

    var titles = Array();

    //Get the titles and store them in Array
    for(var i = 0; i < ids.length; i++){
        var id = ids[i];
        var titleId = "titleCell_" + id.replace(/rowId_/g, "");
        var title = $("#" + titleId).html();
        titles.push(title);
    }
    var names = titles.sort();

    getItemsForSort(names);
}

/**
 * This function checks if the field for a new Movie Title
 * is filled
 */
function checkEmptynessOfInputfield(){
    var title = $("#movieTitle").val();
    var isFilled;
    if(title == ""){
        isFilled = false;
    }else{
        isFilled = true;
    }

    return isFilled;
}

/**
 * This function makes the input field red
 */
function makeErrorField(){
    $("#movieTitle").toggleClass('isFalse');
}

/**
 * This function removes the red border
 */
function destroyErrorField(){
    if($("#movieTitle").hasClass("isFalse")){
        $("#movieTitle").removeClass("isFalse");
    }else{

    }
}

/**
 * This function clears the input field for new movies
 */
function clearInputField(){
    $("#movieTitle").val("");
}

function toggleIsSeenButton(id){

}

