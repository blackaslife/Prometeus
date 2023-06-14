function showText (element) {
    if(element.previousElementSibling.clientHeight === 80) {
     element.previousElementSibling.style.height = "100%";
     element.innerHtml = "Show less...";
    } else {
        element.previousElementSibling.style.height ="80px";
        element.innerHtml = "Read More..."
    }
}
