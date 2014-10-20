
"use strict";

var fills = ["none", "backwards", "forwards", "both"];
var categories = [".a", ".b", ".c", ".d"]

var directions = ["normal", "reverse", "alternate", "alternate-reverse"]
var groups = [];

for (var i = 0; i < directions.length; i++) {
  var dir = directions[i];
  groups.push(new AnimationGroup([], {
    delay: 1 * 1000,
    duration: 8 * 1000,
    iterations: 3,
    playbackRate: 2,
    direction: dir,
    fill: 'forwards',
  }));
}

function sampleFunc(timeFraction, target, animation) {
  target.innerHTML = Math.floor(timeFraction * 1000) / 1000 + " : " + animation.currentIteration;
}

for (var i = 0; i < fills.length; i++) {
  var divs = document.querySelectorAll(categories[i]);
  for (var j = 0; j < divs.length; j++) {
    groups[j].append(new Animation(divs[j], [{left: "100px"}, {left: "200px"}], {
      delay: 1 * 1000,
      duration: 1 * 1000,
      iterations: 2,
      fill: fills[i],
      playbackRate: 0.8
    }));
    groups[j].append(new Animation(divs[j], sampleFunc, {
      delay: 1 * 1000,
      duration: 1 * 1000,
      iterations: 2,
      fill: fills[i],
      playbackRate: 0.8
    }));
  }
}
for (var j = 0; j < divs.length; j++) {
  document.timeline.play(groups[j]);
}
