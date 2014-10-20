
"use strict";

var containers = ["ca", "cb", "cc", "cd"];

var directions = ["normal", "reverse", "alternate", "alternate-reverse"];

for (var i = 0; i < directions.length; i++) {
  var dir = directions[i];
  var container = document.getElementById(containers[i]);

  document.timeline.play(
      new AnimationGroup([
          // Test basic use.
          new Animation(container.getElementsByClassName("a")[0],
              [{left: "100px"}, {left: "300px"}],
              {duration: 1 * 1000, iterations: 3.4, fill: 'forwards'}),
          // Test integer iterations.
          new Animation(container.getElementsByClassName("b")[0],
              [{left: "100px"}, {left: "180px"}],
              {duration: 1 * 1000, iterations: 3.0, fill: 'forwards'}),
          // Test zero iterations.
          new Animation(container.getElementsByClassName("c")[0],
              [{left: "180px"}, {left: "300px"}],
              {duration: 1 * 1000, iterations: 0.0, fill: 'forwards'}),
          ], {iterations: 2, direction: dir, duration: 4 * 1000, fill: 'forwards'}));
}
