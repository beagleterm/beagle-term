
"use strict";

// This test case exhibits the kinda weird behavour that occurs when you have
// an inner animation which has a duration which is a multiple of the
// outer group's duration *and* you use direction: "alternate"
//
// See Bug 22402 about the specification
//   https://www.w3.org/Bugs/Public/show_bug.cgi?id=22402

var anim = new Animation(
    document.getElementById("a"), [{left: "100px"}, {left: "500px"}],
    {iterations: Infinity, duration: 1.0 * 1000, fill: 'forwards'});
var animationGroup = new AnimationGroup([anim],
    {direction: "alternate", duration: 1.0 * 1000, iterations: 3.0, fill: 'forwards'});

document.timeline.play(animationGroup);
