
"use strict";

var effect = [{left: "100px"}, {left: "500px"}];

var anim1 = new Animation(
    document.getElementById("a"), effect,
    {duration: 1.0 * 1000, iterations: 3.0, direction: "alternate", fill: 'forwards'});

var anim2 = new Animation(
    document.getElementById("b"), effect,
    {duration: 1.0 * 1000, fill: 'forwards'});
var animationGroup = new AnimationGroup(
    [anim2],
    {duration: 1.0 * 1000, iterations: 3.0, direction: "alternate", fill: 'forwards'});

document.timeline.play(anim1);
document.timeline.play(animationGroup);
