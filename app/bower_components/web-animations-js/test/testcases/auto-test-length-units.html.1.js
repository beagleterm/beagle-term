
"use strict";


// ex is font specific and there is no common webfont found on *all* browsers
// (including mobile).
var from = ["1em", "10px", "1rem", "5mm", "1cm", "1in", "10pt", "1pc"];
var to = ["5em", "50px", "5rem", "25mm", "2cm", "2in", "50pt", "5pc"];

var table = "<tr><td>from -&gt;<br>to v</td>"
for (var i = 0; i < from.length; i++) {
  table += "<td>" + to[i] + "<br>" + from[i] + "</td>";
}
table += "</tr>"

var anims = {}

for (var j = 0; j < to.length; j++) {
  var toVal = to[j];
  table += "<tr><td>" + toVal + "</td>";
  for (var i = 0; i < from.length; i++) {
    var fromVal = from[i];
    var id = 'a' + toVal + fromVal;
    table +=
        "<td><div class='container'><div class='expectation' style='width: " +
        toVal + "'</div><div id="+id+" class='anim'></div></div></td>";
    anims['#' + id] = [{width: to[i]}, {width: fromVal}, {width: toVal}];
  }
  table += "</tr>"
}

document.querySelector("table").innerHTML = table;
