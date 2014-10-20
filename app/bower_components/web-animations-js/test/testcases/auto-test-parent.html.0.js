
"use strict";

var effect = [{left: "100px"}, {left: "200px"}];
var timing = {duration: 1 * 1000, fill: 'forwards'};

// Top level animation.
document.timeline.play(new Animation(document.getElementById("a"),
    effect, timing));

// Animation in group.
document.timeline.play(new AnimationGroup([
  new Animation(document.getElementById("c"), effect, timing)
], {iterations: 3}));

