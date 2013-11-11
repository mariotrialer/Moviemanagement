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
}

/**
 * This function changes the view to logged out
 */
function showLoggedOutView(){
    toggleLoginButton();
    removeToolTitle();
    removeAddArea();
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

function toggleToolTitle(){
    $("#toolHead").html("Tools");
}

/**
 * This function removes the Tool Column
 */
function removeToolTitle(){
    $("#toolHead").html("");
}

function toggleToolsToItem(id){

}