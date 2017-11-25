// Setup global variables
var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=";

function search(event) {
    console.log("searching...");
    var form = document.forms["search-form"];
    var searchbar = form["q"];
    var query = searchbar.value;
    searchURL += query;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            setResults(JSON.parse(xhr.responseText));
        } else {
            console.log('Request failed. Returned ' + xhr.status);
        }
    };
    xhr.send();
    console.log("Sent " + JSON.stringify(xhr));
    event.preventDefault();
}

function setResults(results) {
  console.log(results);
}
