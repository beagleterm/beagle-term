
"use strict";

// Run a simple animation. It should animate indefinitely.
var anim = new Animation(document.getElementById("a"),
    [{left: "100px"}, {left: "500px"}], {iterations: Infinity, duration: 2.0 * 1000});
document.timeline.play(anim);

// After 3.0s, move it to a parallel group and run that.
testharness_timeline.schedule(function() {
    document.timeline.play(new AnimationGroup([anim],
        {duration: 1.0 * 1000, iterations: 3.0}));
  }, 3000);

// After 3.0s, move it to a parallel group and run that.
testharness_timeline.schedule(function() {
    document.timeline.play(new AnimationGroup([anim],
        {duration: 1.5 * 1000, iterations: 3.0}));
  }, 8000);

