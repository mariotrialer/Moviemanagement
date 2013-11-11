/**
 * This is the Template for the Logout-Button
 * @type {string}
 */
var logoutButtonTemplate = "<button id='logoutButton' onclick='logOut();' class='btn btn-success'>" +
                                "Logout" +
                           "</button>";


/**
 * This is the Template for the Login-Button
 * @type {string}
 */
var loginButtonTemplate = "<button id='loginButton' class='btn btn-error' onclick='toggleLoginArea()'>" +
                                "Login" +
                          "</button>";

/**
 * This is the Template for the Login-Area
 * @type {string}
 */
var loginAreaTemplate = "<div id='loginFormContainer' class='jumbotron'>" +
                            "<div id='loginNavigator'>" +
                                "<img id='hideImage' src='img/exit_button.png' onclick='deleteLoginArea();'/>" +
                            "</div>" +
                            "<div style='clear: both;'></div>" +
                            "<div id='formContainer'>" +
                            "<div class='nameColumn'>Benutzername</div>" +
                            "<div class='fieldColumn'><input class='input-sm' type='text' id='nameField' placeholder='z.B. mario'/></div>" +
                            "<div style='clear: both'></div>" +
                            "<div class='nameColumn'>Benutzerpasswort</div>" +
                            "<div class='fieldColumn'><input class='input-sm' type='password' id='passField' placeholder='password' /></div>" +
                            "</div style='clear: both;'>" +
                            "<button class='btn btn-success' onclick='signIn();'>Login</button>"
                        "</div>";
