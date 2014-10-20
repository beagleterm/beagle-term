
"use strict";
var timing = {duration: 0.5 * 1000, easing: 'steps(2, end)', fill: 'forwards'};

// Add the animations
var animations = [];
for (var start in states) {
  for (var end in states) {
    var effect = [{visibility: start}, {visibility: end}];
    var testElement = document.getElementById(start + "_" + end);
    animations.push(
        new Animation(testElement, effect, timing));
  }
}
