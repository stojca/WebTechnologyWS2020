function showDragAndDropWindos()
{
    var visibility = document.getElementById("filesfrm").style.visibility;

    if(visibility == 'visible')
        document.getElementById("filesfrm").style.visibility = "hidden";
    else
        document.getElementById("filesfrm").style.visibility = "visible";
}

function hideDragAndDrop()
{
    document.getElementById("filesfrm").style.visibility = "hidden";
}