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
        default:
            alert("Wrong input");
    }

    return generatedId;
}

/**
 * This function builds a new Row Object when the Movie
 * was seen
 */
function createIsntSeenObject(item){
    var viewable = {
        "name": item.name,
        "isSeenHtml": "<span class='glyphicon glyphicon-eye-close'>&nbsp Nein</span>",
        "rowId": createId(item.name, 1),
        "titleCell": createId(item.name, 2),
        "seenCell": createId(item.name, 3),
        "rateCell": createId(item.name, 4),
        "renameButton": createId(item.name, 5),
        "removeButton": createId(item.name, 6),
        "toolBar": createId(item.name, 7),
        "ration": "Noch keine Bewertung"
    };

    return viewable;
}
