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
    $("#NFL").innerHTML = "NFL:  " + nfl1;
    console.log("NCAA: " + ncaa1);
    console.log("NFL: " + nfl1);
}

$(document).ready(function() {
  $("#myBtn").click(calculate());
});
