// Setup global variables
var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";

function search() {
    console.log("searching...")
    var form = document.forms["search-form"];
    var searchbar = form["q"];
    var query = searchbar.value;
    url += query + "&format=json";
    var xhr = new XMLHttpRequest();
    console.log("XHR made");
    xhr.open('GET', "http://ron-swanson-quotes.herokuapp.com/v2/quotes");
    console.log("Get made");
    xhr.send();
    console.log("Sent");
    xhr.onload = function() {
      console.log("onload");
      if (xhr.status === 200) {
        console.log("Good return");
        var userInfo = JSON.parse(xhr.responseText);
        setResults(userInfo);
      }
      else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
}

function setResults(results) {
  console.log(JSON.stringify(results));
}
