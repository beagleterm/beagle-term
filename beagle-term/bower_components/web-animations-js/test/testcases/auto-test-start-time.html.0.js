
"use strict";

var containers = ["ca", "cb"];

var directions = ["normal", "reverse"];

var animation = [{left: "100px"}, {left: "300px"}];

for (var i = 0; i < directions.length; i++) {
  var container = document.getElementById(containers[i]);
  // Explicit parent duration.
  document.timeline.play(new AnimationGroup(
      [new Animation(container.getElementsByClassName("a")[0], animation,
          {duration: 1.0 * 1000, fill: 'forwards'})],
      {iterations: 2.0, direction: directions[i], duration: 1.0 * 1000}));
  // Parent calculates intrinsic duration.
  document.timeline.play(new AnimationGroup(
      [new Animation(container.getElementsByClassName("b")[0], animation,
          {duration: 1.0 * 1000, fill: 'forwards'})],
      {iterations: 2.0, direction: directions[i]}));
}
