
"use strict";
var rect = document.querySelector(".anim");

document.timeline.play(new Animation(rect, [
  {y: "300px", width: "100px"},
  {width: "20px"},
  {x: "400px", y: "200px", width: "50px"},
], {duration: 1 * 1000, fill: 'forwards'}));

