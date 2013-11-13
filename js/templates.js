/**
 * This is the Template for the Logout-Button
 * @type {string}
 */
var logoutButtonTemplate = "<button id='logoutButton' onclick='logOut();' class='btn btn-danger'>" +
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


/**
 * This is the Template for the Area where the user can create new Movies
 * @type {string}
 */
var addFieldTemplate = "<div id='wrapper'>" +
                             "<h4>Neuen Film speichern</h4>" +
                             "<input type='text' id='movieTitle' class='input-sm' placeholder='Titel'/>" +
                             "<button id='storeButton' onclick='createNewItem();' class='btn btn-primary input-sm'>Speichern</button>" +
                         "</div>";

/**
 * This is the Template for a new Row in the List
 * @type {string}
 */
var listRowTemplate = "<tr id='<%= item.row%>'>" +
                          "<td id='<%= item.titleCell %>'><%= item.name %></td>" +
                          "<td id='<%= item.seenCell %>'><%= item.isSeenHtml %></td>" +
                          "<td id='<%= item.rateCell %>'><%= item.ration %></td>" +
                          "<td id='<%= item.toolBar %>'></td>" +
                          "<td><button class='btn btn-sm btn-default btn-lg' onclick=''>" +
                             "<span class='glyphicon glyphicon-align-justify'>&nbsp Info</span>" +
                          "</button></td>" +
                      "</tr>";

/**
 * This is the Template for adding a toolbar
 * @type {string}
 */
var toolBarTemplate = "<td class='toolBar'>" +
                          "<button class='btn btn-sm btn-default btn-lg'>" +
                             "<span class='glyphicon glyphicon-edit'></span>" +
                          "</button>" +
                      "</td>";

var seenButtonTemplate = "<button id='<%= provider.seenButton %>' onclick='updateIsSeen(false, this.id);'><span class='glyphicon glyphicon-eye-open'></span></button>";

var notSeenButtonTemplate = "<button id='<%= provider.seenButton %>' onclick='updateIsSeen(true, this.id);'><span class='glyphicon glyphicon-eye-close'></span></button>";

var rateTemplate = "<div id='<%= provider.starId %>' class='rating'>" + 
                      "<span id='<%= provider.idOne %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idTwo %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idThree %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                      "<span id='<%= provider.idFour %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                      "<span id='<%= provider.idFive %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                    "</div>";