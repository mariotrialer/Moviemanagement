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
 * This function toggles the Login Button to the title bar
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

function showLoggedInView(){
    toggleLogoutButton();
}