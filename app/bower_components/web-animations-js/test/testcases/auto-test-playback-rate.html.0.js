
"use strict";

var containers = ["ca", "cb"];

var directions = ["normal", "reverse"];
var groups = [];

var effect100To300 = [{left: "100px"}, {left: "300px"}];
var effect300To100 = [{left: "300px"}, {left: "100px"}];

for (var i = 0; i < directions.length; i++) {
  var dir = directions[i];
  groups.push(new AnimationGroup([], {direction: dir, duration: 3 * 1000}));
}

for (var i = 0; i < containers.length; i++) {
  var container = document.getElementById(containers[i]);
  // Test basic use.
  groups[i].append(new Animation(container.getElementsByClassName("a")[0],
      effect100To300, {duration: 1.0 * 1000, fill: 'forwards'}));
  groups[i].append(new Animation(container.getElementsByClassName("b")[0],
      effect100To300, {duration: 0.5 * 1000, playbackRate: 0.5, fill: 'forwards'}));
  groups[i].append(new Animation(container.getElementsByClassName("c")[0],
      effect100To300, {duration: 2.0 * 1000, playbackRate: 2.0, fill: 'forwards'}));
   // Test negative values.
  groups[i].append(new Animation(container.getElementsByClassName("d")[0],
      effect300To100, {duration: 1.0 * 1000, playbackRate: -1.0, fill: 'forwards'}));
  groups[i].append(new Animation(container.getElementsByClassName("e")[0],
      effect300To100, {duration: 0.5 * 1000, playbackRate: -0.5, fill: 'forwards'}));
  groups[i].append(new Animation(container.getElementsByClassName("f")[0],
      effect300To100, {duration: 2.0 * 1000, playbackRate: -2.0, fill: 'forwards'}));
   // Test zero.
  groups[i].append(new Animation(container.getElementsByClassName("g")[0],
      effect300To100, {duration: 1.0 * 1000, playbackRate: 0.0, fill: 'forwards'}));
  document.timeline.play(groups[i]);
}
