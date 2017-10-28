var comp = 0;
var att = 0;
var yar = 0;
var tds = 0;
var ints = 0;

function fillVars(){
  console.log("entered fillVars");
  comp = $("#CompID").val();
  att = $("#AttID").val();
  yar = $("#YarID").val();
  tds = $("#TDID").val();
  ints = $("#IntID").val();
}

function calculate() {
    console.log("entered calculate");
    fillVars();
    console.log("comp = " + comp);
    var ncaa = 0, nfl = 0;
    ncaa = ((8.4 * yar) + (330 * tds) + (100 * comp) - (200 * ints)) / (att);
    var a, b, c, d;
    a = ((comp / att) - (1 / 3)) * 5;
    b = ((yar / att) - 3) * (1 / 4);
    c = (tds / att) * 20;
    d = 2.375 - ((ints / att) * 25);
    nfl = ((a + b + c + d) / 6) * 100;
    var ncaa1 = ncaa.toString();
    var nfl1 = nfl.toString();
    $("#NCAA").innerHTML = "NCAA: " + ncaa1;
    document.getElementById("NFL").innerHTML = "NFL:  " + nfl1;
}

$(document).onReady(function() {
  $("#myBtn").click(calculate());
});

var currentQuote = '', currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}
function getQuote() {
  $.ajax({
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(r) {
      if (typeof r === 'string') {
       r = JSON.parse(r);
      }
      currentQuote = r.quote;
      currentAuthor = r.author;
    }
  });
}
$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
  $('#twitter-btn').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
  $('#tumblr-btn').on('click', function() {
    if(!inIframe()) {
      openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }
  });
});
