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
                            "<div class='fieldColumn'><input class='input-sm form-control' type='text' id='nameField' placeholder='z.B. mario' onkeydown='return pressEnterLogin(event)' autofocus/></div>" +
                            "<div style='clear: both'></div>" +
                            "<div class='nameColumn'>Benutzerpasswort</div>" +
                            "<div class='fieldColumn'><input class='input-sm form-control' type='password' id='passField' placeholder='password' onkeydown='return pressEnterLogin(event)'/></div>" +
                            "<div class='nameColumn'></div>" + 
                            "<div class='fieldColumn'><button class='btn btn-success form-control' onclick='signIn();'>Login</button></div>" +
                            "<div style='clear: both;'></div>" +
                            "<br>" +
                            "Noch keinen Account?  <a href='#' onclick='getUserCreateForm();'>Anmelden</a>" +
                        "</div>";


/**
 * This is the Template for the Area where the user can create new Movies
 * @type {string}
 */
var addFieldTemplate = "<div id='wrapper'>" +
                             "<h4>Neuen Film speichern</h4>" +
                             "<input type='text' id='movieTitle' class='input-sm form-control' placeholder='Titel' onkeypress='return pressEnterAddMovie(event)'/>" +
                             "<button id='storeButton' onclick='createNewItem();' class='btn btn-primary input-sm'>Speichern</button>" +
                             "<div style='clear: both;'></div>" +
                             "<div id='errorContainer'></div>" +
                         "</div>";

/**
 * This is the Template for a new Row in the List
 * @type {string}
 */
var listRowTemplate = "<tr id='<%= item.rowId %>'>" +
                          "<td id='<%= item.titleCell %>'><%= item.name %></td>" +
                          "<td id='<%= item.seenCell %>'><%= item.isSeenHtml %></td>" +
                          "<td></td>" +
                          "<td id='<%= item.rateCell %>'><%= item.ration %></td>" +
                          "<td class='toolsItem' id='<%= item.toolBar %>'></td>" +
                          "<td class='ownerItem'></td>" +
                          "<td><button id='<%= item.infoButton %>' class='btn btn-default' onclick='showInfoDialog(this.id);'>" +
                             "<span class='glyphicon glyphicon-align-justify'></span>" +
                          "</button></td>" +
                          "<td class='owner' id='<%= item.ownerCell %>''><%= item.owner %></td>" +
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
                      "<span id='<%= provider.idFive %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idFour %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idThree %>' onclick='rateMovie(this.id)' class='star'>☆</span>" + 
                      "<span id='<%= provider.idTwo %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                      "<span id='<%= provider.idOne %>' onclick='rateMovie(this.id)' class='star'>☆</span>" +
                    "</div>";

/**
 * Template for the Area where average-rating is displayed
 */
var avgRateTemplate = "<div id='<%= provider.avgId %>' class='avgRating'>" +
                            "<span id='<%= provider.avg1 %> class='avgStar'>☆</span>" +
                            "<span id='<%= provider.avg2 %> class='avgStar'>☆</span>" +
                            "<span id='<%= provider.avg3 %> class='avgStar'>☆</span>" +
                            "<span id='<%= provider.avg4 %> class='avgStar'>☆</span>" +
                            "<span id='<%= provider.avg5 %> class='avgStar'>☆</span>" +
                      "</div>";

/**
 * Template for the tools
 * @type {string}
 */
var toolTemplate = "<button class='btn btn-info' id='<%= item.renameButton %>' onclick='renameMovie(this.id);'>" + 
                      "<span class='glyphicon glyphicon-pencil'></span>" + 
                   "</button>" + 
                   "<button class='btn btn-info btn-right' id='<%= item.removeButton %>' onclick='deleteMovie($(this).parent())'>" + 
                      "<span class='glyphicon glyphicon-trash'></span>" + 
                   "</button>";

/**
 * Template for the Info Dialog
 */
var infoTemplate = "<div class='infoContainer'>" + 
                      "<h3><%= info.title %></h3>" +
                      "<div class='cover'>" +
                          "<img class='img-rounded' src='<%= info.cover %>' alt='Cover of: <%= info.title %>'/>" + 
                      "</div>" +
                      "<div class='info'>" +
                        "<p><b>Bewertung: </b><%= info.rating %></p>" +
                        "<p><b>Erscheinungsjahr: </b><%= info.year %></p>" +
                        "<p><b>Regisseur: </b><%= info.regie %></p>" +
                        "<p><b>Laufzeit: </b><%= info.runtime %> </p>" +
                        "<p><b>Genre: </b><%= info.genre %></p>" +
                      "</div>" +
                   "<div style='clear: both'></div>" +
                   "</div>";

var renameTemplate = "<h3>Name ändern</h3>" +
                     "<input id='newTitle' type='text' class='form-control' value='<%= item.name %>' />";

var ownerTemplate = "<%= item.name %>";

/**
 * Template for the create User Dialog
 */
var createTemplate = "<div>"+
                        "<h3>Neuen Benutzer anlegen</h3>" +
                        "<input type='text' id='desiredNickname' placeholder='Spitzname' class='form-control form-group'>" +
                        "<input type='email' id='desiredEmail' placeholder='test@example.com' class='form-control form-group'>" +
                        "<input type='password' class='form-control form-group' id='desiredPassword' placeholder='abcd'>" +
                    "</div>";

                    