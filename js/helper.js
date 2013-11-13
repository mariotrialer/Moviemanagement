/**
 * This function creates an id dynamically from the given string
 * @param type
 * if type = 1 => rowId
 * if type = 2 => titleCell
 * if type = 3 => seenCell
 * if type = 4 => rateCell
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
        "isSeenHtml": _.template(notSeenButtonTemplate, {provider: provider}),
        "rowId": createId(item.name, 1),
        "titleCell": createId(item.name, 2),
        "seenCell": createId(item.name, 3),
        "rateCell": createId(item.name, 4),
        "renameButton": createId(item.name, 5),
        "removeButton": createId(item.name, 6),
        "toolBar": createId(item.name, 7),
        "ration": _.template(rateTemplate, {provider:provider})
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
            "isSeenHtml": _.template(seenButtonTemplate, {provider: provider}),
            "rowId": createId(item.name, 1),
            "titleCell": createId(item.name, 2),
            "seenCell": createId(item.name, 3),
            "rateCell": createId(item.name, 4),
            "renameButton": createId(item.name, 5),
            "removeButton": createId(item.name, 6),
            "toolBar": createId(item.name, 7),
            "ration": _.template(rateTemplate, {provider:provider})
        };

    return viewable;  
}
