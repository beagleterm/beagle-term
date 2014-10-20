
"use strict";
var rect = document.querySelector(".anim")

document.timeline.play(new Animation(rect, {x: "400px", height: "40px"}, {duration: 1 * 1000, fill: 'forwards'}));

