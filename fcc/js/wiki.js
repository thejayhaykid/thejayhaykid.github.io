// Setup global variables
var AM = true;
var weatherURL = "https://fcc-weather-api.glitch.me/api/current?lat=40&lon=-83";
var moonURL = "http://api.usno.navy.mil/moon/phase?date=today&nump=1";
var trivURL = "https://opentdb.com/api.php?amount=1";
var ronURL = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";
var jokeURL = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke";
var weatherObj, trivObj, jokeObj, ronObj, tempF, weatherSymbol, symbolList, symbolNightList, moonSymbol, moonList, moonObj;
var curT, sunrise, sunset, weatherDesc;

function ClearSearch() {
    //console.log("Entered ClearSearch()");
    var form = document.forms["search-form"];
    var searchbar = form["q"];
    var query = searchbar.value;
    var url = "http://www.google.com/search?q=" + query;
    var win = window.open(url, '_blank');
    win.focus();
    form.reset();
}
