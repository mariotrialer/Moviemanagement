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