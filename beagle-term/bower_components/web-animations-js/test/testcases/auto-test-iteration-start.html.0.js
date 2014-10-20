
"use strict";

var containers = ["ca", "cb", "cc", "cd"];

var directions = ["normal", "reverse", "alternate", "alternate-reverse"];
var groups = [];

var effect100To300 = [{left: "100px"}, {left: "300px"}];
var effect100To180 = [{left: "100px"}, {left: "180px"}];

for (var i = 0; i < directions.length; i++) {
  var dir = directions[i];
  groups.push(
      new AnimationGroup([], {iterations: 2, direction: dir, duration: 4 * 1000, fill: 'forwards'}));
}

for (var i = 0; i < containers.length; i++) {
  var container = document.getElementById(containers[i]);
  // Test basic use.
  groups[i].append(new Animation(container.getElementsByClassName("a")[0],
      effect100To300,
      {duration: 1 * 1000, iterations: 3.1, iterationStart: 0.3, fill: 'forwards'}));
  groups[i].append(new Animation(container.getElementsByClassName("b")[0],
      effect100To300,
      {duration: 1 * 1000, iterations: 3.6, iterationStart: -0.2, fill: 'forwards'}));
  // Test that iterationStart is not clipped to iterations.
  groups[i].append(new Animation(container.getElementsByClassName("c")[0],
      effect100To300,
      {duration: 1 * 1000, iterations: 1.6, iterationStart: 1.8, fill: 'forwards'}));
  // Test that nothing odd happens when iterations is an integer.
  groups[i].append(new Animation(container.getElementsByClassName("d")[0],
      effect100To300,
      {duration: 1 * 1000, iterations: 3.0, iterationStart: 0.4, fill: 'forwards'}));
  // Test that nothing odd happens when (iterations - iterationStart) is an
  // integer.
  groups[i].append(new Animation(container.getElementsByClassName("e")[0],
      effect100To300,
      {duration: 1 * 1000, iterations: 3.2, iterationStart: 0.2, fill: 'forwards'}));
  // Test that nothing odd happens when (iterations + iterationStart) is an
  // integer.
  groups[i].append(new Animation(container.getElementsByClassName("f")[0],
      effect100To180,
      {duration: 1 * 1000, iterations: 2.8, iterationStart: 0.2, fill: 'forwards'}));
  document.timeline.play(groups[i]);
}
