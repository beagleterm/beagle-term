
"use strict";

document.timeline.play(new Animation(document.querySelector("#a"),
    {left: "200px"}, {delay: 1 * 1000, duration: 2 * 1000, fill: 'forwards'}));
var elems = document.querySelectorAll(".test");
for (var i = 0; i < elems.length; i++) {
  var element = elems[i];
  document.timeline.play(new Animation(element, {left: "200px"},
      {delay: 1 * 1000, duration: 2 * 1000, easing: element.textContent, fill: 'forwards'}));
}
