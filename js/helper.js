/**
 * This function serves as factory for ids
 */
function createId(name, type){
    //Eliminate Commas
    var title = name.replace(/,/g, "");
    //Eliminate Stripes
    title = title.replace(/-/g, "");
    //Eliminate Whitespace
    title = title.replace(/ /g, "");

    //Id that will be returned
    var generatedId;

    //Select the matching algorithm
    switch(type){
        case 1:
            generatedId = "rowId_" + title;
            break;
        case 2:
            generatedId = "titleCell_" + title;
            break;
        case 3:
            generatedId = "seenCell_" + title;
            break;
        case 4:
            generatedId = "rateCell_" + title;
            break;
        case 5:
            generatedId = "renameButton_" + title;
            break;
        case 6:
            generatedId = "removeButton_" + title;
            break;
        case 7:
            generatedId = "toolBar_" + title;
            break;
        case 8:
            generatedId = "seenButton_" + title;
            break;
        case 9:
            generatedId = "starId_" + title;
            break;
        case 10:
            generatedId = title;
            break;
        case 11:
            generatedId = "infoButton_" + title;
            break;
        case 12:
            generatedId = "owner_" + title;
            break;
        case 13:
            generatedId = "avgStar_" + title;
            break;
        case 14:
            generatedId = "avgCell_" + title;
            break;
        default:
            alert("Wrong input");
    }

    return generatedId;
}

/**
 * This function builds a new Row Object when the Movie
 * was not seen
 */
function createIsntSeenObject(item){

    var viewable = {
        "name": item.name,
        "isSeenHtml": '',
        "rowId": createId(item.name, 1),
        "titleCell": createId(item.name, 2),
        "seenCell": createId(item.name, 3),
        "avgCell": createId(item.name, 14),
        "rateCell": createId(item.name, 4),
        "renameButton": createId(item.name, 5),
        "removeButton": createId(item.name, 6),
        "toolBar": createId(item.name, 7),
        "ration":"",                                     
        "infoButton":createId(item.name, 11),
        "owner": "",
        "ownerCell": createId(item.name, 12)
    };

    return viewable;
}

/**
 * This function builds a new Row Object when the Movie
 * was seen
 */
function createIsSeenObject(item){
        var newName = "'" + item.name + "'";
        var provider = {
            "name":item.name,
            "seenButton":createId(item.name, 8),
            "starId":createId(item.name, 9), 
            "idOne":createId(item.name, 10) + "1",
            "idTwo":createId(item.name, 10) + "2",
            "idThree":createId(item.name, 10) + "3",
            "idFour":createId(item.name, 10) + "4",
            "idFive":createId(item.name, 10) + "5"
        };

        var viewable = {
            "name": item.name,
            "isSeenHtml": '',
            "rowId": createId(item.name, 1),
            "titleCell": createId(item.name, 2),
            "seenCell": createId(item.name, 3),
            "avgCell": createId(item.name, 14),
            "rateCell": createId(item.name, 4),
            "renameButton": createId(item.name, 5),
            "removeButton": createId(item.name, 6),
            "toolBar": createId(item.name, 7),
            "ration": _.template(rateTemplate, {provider:provider}),
            "infoButton":createId(item.name, 11),
            "owner": item.owner,
            "ownerCell": createId(item.name, 12)
        };

    return viewable;  
}

/**
 * This function creates a templatable object for an authorized view
 */
function createLoggedInObject(item){

        var provider = {
            "name":item.name,
            "seenButton":createId(item.name, 8),
            "starId":createId(item.name, 9), 
            "idOne":createId(item.name, 10) + "1",
            "idTwo":createId(item.name, 10) + "2",
            "idThree":createId(item.name, 10) + "3",
            "idFour":createId(item.name, 10) + "4",
            "idFive":createId(item.name, 10) + "5"
        };

        var viewable = {
            "name": item.name,
            "isSeenHtml": '',
            "rowId": createId(item.name, 1),
            "titleCell": createId(item.name, 2),
            "seenCell": createId(item.name, 3),
            "avgCell": createId(item.name, 14),
            "rateCell": createId(item.name, 4),
            "renameButton": createId(item.name, 5),
            "removeButton": createId(item.name, 6),
            "toolBar": createId(item.name, 7),
            "ration": _.template(rateTemplate, {provider:provider}),
            "infoButton":createId(item.name, 11),
            "owner": item.owner,
            "ownerCell": createId(item.name, 12)
        }

        return viewable;
}

/**
 * This function builds the average object to toggle into the view
 */ 
function createAvgObject(movieTitle){

    var idBase = createId(movieTitle, 13);

    var viewable = {
        "avgId": idBase,
        "avg1": idBase + 5,
        "avg2": idBase + 4,
        "avg3": idBase + 3,
        "avg4": idBase + 2,
        "avg5": idBase + 1
    };

    return viewable;
}
