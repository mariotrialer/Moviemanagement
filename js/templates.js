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
var listRowTemplate = "<tr id='<%= item.rowId %>'>" +
                          "<td id='<%= item.titleCell %>'><%= item.name %></td>" +
                          "<td id='<%= item.seenCell %>'><%= item.isSeenHtml %></td>" +
                          "<td id='<%= item.rateCell %>'><%= item.ration %></td>" +
                          "<td class='toolsItem' id='<%= item.toolBar %>'></td>" +
                          "<td><button class='btn btn-default' onclick='showInfoDialog();'>" +
                             "<span class='glyphicon glyphicon-align-justify'></span>" +
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


/**
 * Template for the Is Seen Button (Green)
 * @type {string}
 */
var seenButtonTemplate = "<button class='btn btn-success' onclick='updateIsSeen(false, this.id);' id='<%= provider.seenButton %>'><span class='glyphicon glyphicon-eye-open'></span></button>";

/**
 * Template for the Is Not Seen Button (Orange)
 * @type {string}
 */
var notSeenButtonTemplate = "<button class='btn btn-warning' onclick='updateIsSeen(true, this.id);' id='<%= provider.seenButton %>'><span class='glyphicon glyphicon-eye-close'></span></button>";

/**
 * Template for the Rate Area
 * @type {string}
 */
var rateTemplate = "<div id='<%= provider.starId %>' class='rating'>" + 
                      "<span id='<%= provider.idOne %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idTwo %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idThree %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                      "<span id='<%= provider.idFour %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                      "<span id='<%= provider.idFive %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                    "</div>";

/**
 * Template for the tools
 * @type {string}
 */
var toolTemplate = "<button class='btn btn-info' id='<%= item.renameButton %>'>" + 
                      "<span class='glyphicon glyphicon-pencil'></span>" + 
                   "</button>" + 
                   "<button class='btn btn-info btn-right' id='<%= item.removeButton %>' onclick='deleteMovie($(this).parent())'>" + 
                      "<span class='glyphicon glyphicon-trash'></span>" + 
                   "</button>";