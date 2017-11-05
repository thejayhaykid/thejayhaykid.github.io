// Setup global variables
var ronURL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";
var ronObj;

window.onload = function() {
    ronClick();
};

function ronClick() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ronURL);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //      console.log(xhr.responseText);
            ronObj = JSON.parse(xhr.responseText);
            processRon();
        } else {
            console.log('Request failed. Returned ' + xhr.status);
        }
    };
    xhr.send();
}

function processRon() {
    var quote = ronObj[0];
    //console.log(quote);
    var ronDiv = document.getElementById("ron1");
    var ronH1 = document.getElementById("ronH1");
    var icon = document.createElement("i");
    var ronH2 = document.createElement("h1");
    var breaker = document.createElement("br");

    ronDiv.removeChild(ronH1);

    ronH2.id = "ronH1";

    icon.classList.add("fa");
    icon.classList.add("fa-quote-left");
    icon.classList.add("fa-3x");

    var txtNode = document.createTextNode(quote);
    ronH2.appendChild(icon);
    ronH2.appendChild(breaker);
    ronH2.appendChild(txtNode);
    ronDiv.appendChild(ronH2);
}
