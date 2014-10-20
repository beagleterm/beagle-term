
"use strict";
var width = 25;
var totalWidth = 800;
var startZ = 0;
var endZ = 100;
var test = document.querySelector("#test");
var marker = test.nextSibling;

for (var i = 0; i < totalWidth; i += width) {
  var div = document.createElement("div");
  div.style.width = width + "px";
  div.style.height = "50px";
  div.style.background = "red";
  div.style.zIndex = startZ +
      Math.round((i / totalWidth) * (endZ - startZ));
  div.style.position = "relative";
  document.body.insertBefore(div, marker);
}
document.timeline.play(new Animation(document.querySelector("#test"),
    [{zIndex: String(startZ)}, {zIndex: String(endZ)}], {duration: 3 * 1000, fill: 'forwards'}));
