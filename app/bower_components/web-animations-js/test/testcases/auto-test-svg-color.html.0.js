
"use strict";
var rect = document.querySelector(".anim")
document.timeline.play(new Animation(rect, {cx: "400px", cy: "85px", r: "75px", stroke: "rgba(150, 40, 250, 1)"}, {duration: 1000, fill: 'forwards'}));
