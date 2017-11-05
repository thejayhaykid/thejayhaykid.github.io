// Setup global variables
var AM = true;
var weatherURL = "https://fcc-weather-api.glitch.me/api/current?lat=";
var weatherObj, tempF, tempC, weatherSymbol, symbolList, symbolNightList, lat, lon;
var curT, sunrise, sunset, weatherDesc;

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            weatherURL += lat + "&lon=" + lon;

            // Set weather symbols
            setSymbolList();
            setNightSymbolList();

            // Update top symbols
            updateWeather();

            // Update weather every 15 minutes
            setInterval(updateWeather, 900000);
        });
    } else {
      var c = confirm("Cannot get weather without location!");
      if (c == true) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                url += lat + "&lon=" + lon;

                // Set weather symbols
                setSymbolList();
                setNightSymbolList();

                // Update top symbols
                updateWeather();

                // Update weather every 15 minutes
                setInterval(updateWeather, 900000);
            });
        }
      } else {
        alert("Cannot get weather...");
      }
    }
};

function dateAndTime() {
    var d = new Date();
    var retVal = "\nUpdated: ";
    retVal += (d.getMonth() + 1) + "/" + d.getDate() + " - " + d.getHours() + ":";
    var min = d.getMinutes();
    if (min < 10) {
        retVal += "0";
    }
    retVal += min;
    return retVal;
}

// Columbus lat/lon: 39.9612° N, 82.9988° W
function updateWeather() {
    var weatherDiv = document.getElementById("weather");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', weatherURL);
    xhr.onload = function() {
        if (xhr.status === 200) {
            //console.log(weatherURL);
            weatherObj = JSON.parse(xhr.responseText);
            processWeather();
        } else {
            console.log('Request failed. Returned ' + xhr.status);
        }
    };
    xhr.send();
}

function processWeather() {
    tempC = Math.round(weatherObj.main.temp);
    tempF = Math.round((weatherObj.main.temp * 9.0 / 5.0) + 32);
    curT = weatherObj.dt;
    sunrise = weatherObj.sys.sunrise;
    sunset = weatherObj.sys.sunset;
    if (curT < sunrise && curT > sunset) {
        setNightWeatherSymbol();
    } else {
        setWeatherSymbol();
    }
    writeWeather();
}

function writeWeather() {
    setTemp();
    setLoc();
    var weatherDiv = document.getElementById("weather");
    var weatherH1 = document.getElementById("weather-h1");
    var weatherSpan = document.getElementById("weather-span");

    weatherSpan.removeChild(weatherH1);
    weatherDiv.removeChild(weatherSpan);

    var icon = document.createElement("i");
    var h1 = document.createElement("H1");
    var newSpan = document.createElement("span");

    icon.classList.add("wi");
    icon.classList.add(weatherSymbol);
    h1.id = "weather-h1";
    weatherDesc = weatherObj.weather[0].description;
    weatherDesc += dateAndTime();
    newSpan.title = weatherDesc;
    newSpan.id = "weather-span";

    h1.appendChild(icon);
    h1.classList.add("text-center");

    newSpan.appendChild(h1);
    weatherDiv.appendChild(newSpan)
}

function setLoc() {
  var tempDiv = document.getElementById("loc");
  var tempH1 = document.getElementById("loc-h1");

  tempDiv.removeChild(tempH1);

  var loc = weatherObj.name + ", " + weatherObj.sys.country;
  var t = document.createTextNode(loc);
  var h1 = document.createElement("H1");

  h1.appendChild(t);
  h1.classList.add("text-center");
  tempDiv.appendChild(h1);
}

function setTemp() {
    var tempDiv = document.getElementById("temp");
    var tempH1 = document.getElementById("temp-h1");

    tempDiv.removeChild(tempH1);

    var icon2 = document.createElement("i");
    var t = document.createTextNode(tempF);
    var f = document.createTextNode("F");
    var h1 = document.createElement("H1");

    icon2.classList.add("wi");
    icon2.classList.add("wi-degrees");
    h1.appendChild(t);
    h1.appendChild(icon2);
    h1.appendChild(f);
    h1.classList.add("text-center");
    h1.id = "temp-h1";
    tempDiv.appendChild(h1);
}

function setWeatherSymbol() {
    var id = weatherObj.weather[0].id;
    //console.log("ID: " + id);
    //console.log("Weather: " + JSON.stringify(weatherObj.weather[0]));
    if (id === 800) {
        weatherSymbol = symbolList.sunny;
    } else if (id >= 801 && id <= 803) {
        weatherSymbol = symbolList.cloudy;
    } else if (id === 804) {
        weatherSymbol = symbolList.overcast;
    } else if (id >= 300 && id <= 321) {
        weatherSymbol = symbolList.sprinkle;
    } else if (id >= 200 && id <= 232) {
        weatherSymbol = symbolList.thunderstorm;
    } else if (id >= 500 && id <= 531) {
        weatherSymbol = symbolList.rain;
    } else if (id >= 600 && id <= 622) {
        weatherSymbol = symbolList.snow;
    } else if (id === 741) {
        weatherSymbol = symbolList.fog;
    } else if (id === 721) {
        weatherSymbol = symbolList.haze;
    } else if (id === 904) {
        weatherSymbol = symbolList.hot;
    } else if (id === 905) {
        weatherSymbol = symbolList.windy;
    } else if (id === 906) {
        weatherSymbol = symbolList.hail;
    } else if (id >= 951 && id <= 956) {
        weatherSymbol = symbolList.lWind;
    } else if (id === 701) {
        weatherSymbol = symbolList.mist;
    } else {
        weatherSymbol = symbolList.NA;
    }
}

function setNightWeatherSymbol() {
    var id = weatherObj.weather[0].id;
    console.log("ID: " + id);
    console.log("Weather: " + JSON.stringify(weatherObj.weather[0]));
    if (id === 800) {
        weatherSymbol = symbolNightList.sunny;
    } else if (id >= 801 && id <= 803) {
        weatherSymbol = symbolNightList.cloudy;
    } else if (id === 804) {
        weatherSymbol = symbolNightList.overcast;
    } else if (id >= 300 && id <= 321) {
        weatherSymbol = symbolNightList.sprinkle;
    } else if (id >= 200 && id <= 232) {
        weatherSymbol = symbolNightList.thunderstorm;
    } else if (id >= 500 && id <= 531) {
        weatherSymbol = symbolNightList.rain;
    } else if (id >= 600 && id <= 622) {
        weatherSymbol = symbolNightList.snow;
    } else if (id === 741) {
        weatherSymbol = symbolNightList.fog;
    } else if (id === 721) {
        weatherSymbol = symbolNightList.haze;
    } else if (id === 904) {
        weatherSymbol = symbolNightList.hot;
    } else if (id === 905) {
        weatherSymbol = symbolNightList.windy;
    } else if (id === 906) {
        weatherSymbol = symbolNightList.hail;
    } else if (id >= 951 && id <= 956) {
        weatherSymbol = symbolNightList.lWind;
    } else {
        weatherSymbol = symbolNightList.NA;
    }
    console.log(weatherSymbol);
}

function setSymbolList() {
    symbolList = {
        sunny: "wi-day-sunny",
        cloudy: "wi-day-cloudy",
        cloudyG: "wi-day-cloudy-gusts",
        cloudyW: "wi-day-cloudy-windy",
        fog: "wi-day-fog",
        hail: "wi-day-hail",
        haze: "wi-day-haze",
        lightning: "wi-day-lightning",
        rain: "wi-day-rain",
        rainMix: "wi-day-rain-mix",
        rainW: "wi-day-rain-wind",
        shower: "wi-day-showers",
        sleet: "wi-day-sleet",
        sleetS: "wi-day-sleet-storm",
        snow: "wi-day-snow",
        snowS: "wi-day-snow-thunderstorm",
        snowW: "wi-day-snow-wind",
        sprinkle: "wi-day-sprinkle",
        storm: "wi-day-storm-showers",
        overcast: "wi-day-sunny-overcast",
        thunderstorm: "wi-day-thunderstorm",
        windy: "wi-day-windy",
        hot: "wi-hot",
        lWind: "wi-day-light-wind",
        mist: "wi-windy",
        NA: "wi-na"
    }
}

function setNightSymbolList() {
    symbolNightList = {
        sunny: "wi-night-clear",
        cloudy: "wi-night-alt-cloudy",
        cloudyG: "wi-night-alt-cloudy-gusts",
        cloudyW: "wi-night-alt-cloudy-windy",
        fog: "wi-night-fog",
        hail: "wi-night-hail",
        haze: "wi-day-haze",
        lightning: "wi-night-alt-lightning",
        rain: "wi-night-alt-rain",
        rainMix: "wi-night-alt-rain-mix",
        rainW: "wi-night-alt-rain-wind",
        shower: "wi-night-alt-showers",
        sleet: "wi-night-alt-sleet",
        sleetS: "wi-night-alt-sleet-storm",
        snow: "wi-night-alt-snow",
        snowS: "wi-night-alt-snow-thunderstorm",
        snowW: "wi-night-alt-snow-wind",
        sprinkle: "wi-night-alt-sprinkle",
        storm: "wi-night-alt-storm-showers",
        overcast: "wi-night-cloudy-high",
        thunderstorm: "wi-night-thunderstorm",
        windy: "wi-windy",
        hot: "wi-hot",
        lWind: "wi-windy",
        NA: "wi-na"
    }
}

function switchTemp() {
  var btn = document.getElementById("btn");
  //console.log("In switch");
  if(btn.value == "C") {
    //console.log("C");
    btn.value = "F";
    setTemp();
  } else {
    //console.log("F");
    btn.value = "C";
    setC();
  }
}

function setC() {
  var tempDiv = document.getElementById("temp");
  var tempH1 = document.getElementById("temp-h1");

  tempDiv.removeChild(tempH1);

  var icon2 = document.createElement("i");
  var t = document.createTextNode(tempC);
  var f = document.createTextNode("C");
  var h1 = document.createElement("H1");

  icon2.classList.add("wi");
  icon2.classList.add("wi-degrees");
  h1.appendChild(t);
  h1.appendChild(icon2);
  h1.appendChild(f);
  h1.classList.add("text-center");
  h1.id = "temp-h1";
  tempDiv.appendChild(h1);
}
