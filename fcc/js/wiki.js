// Setup global variables
var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=";
var artBaseURL = "https://en.wikipedia.org/?curid=";

function search(event) {
    //console.log("searching...");
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
    //console.log("Sent " + JSON.stringify(xhr));
    return false;
}

function setResults(results) {
  //console.log(results.query.search);
  var result_arr = results.query.search;
  var resultDiv = document.getElementById("results");

  for(var i = 0; i < result_arr.length; i++) {
    var title = result_arr[i].title;
    var desc = result_arr[i].snippet;
    console.log("title: " + title);
    console.log("desc: " + desc);
    console.log("URL: " + artBaseURL + result_arr[i].pageid);

    var titleNode = document.createTextNode(title);
    var titleH3 = document.createElement("h3");
    var descNode = document.createTextNode(desc);
    var descP = document.createElement("p");
    var rowDiv = document.createElement("div");
    var colDiv = document.createElement("div");
    var href = document.createElement("a");

    rowDiv.classList.add("row");
    colDiv.classList.add("col-xs-12");
    colDiv.classList.add("search_result");
    href.href = artBaseURL + result_arr[i].pageid;
    href.target = "_blank";

    titleH3.appendChild(titleNode);
    descP.appendChild(descNode);

    colDiv.appendChild(titleH3);
    colDiv.appendChild(descP);
    href.appendChild(colDiv);
    rowDiv.appendChild(href);
    resultDiv.appendChild(rowDiv);
  }
}
