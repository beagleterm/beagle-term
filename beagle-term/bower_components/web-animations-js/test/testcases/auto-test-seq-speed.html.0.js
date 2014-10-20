
"use strict";

var effect = [{left: "100px"}, {left: "200px"}];

var a1 = new Animation(
    document.querySelector("#a"), effect, {duration: 1.0 * 1000, fill: "forwards"});
var a2 = new Animation(
    document.querySelector("#b"), effect, {duration: 2.0 * 1000, fill: "forwards"});
var a3 = new Animation(
    document.querySelector("#c"), effect, {duration: 1.0 * 1000, fill: "forwards"});
var a4 = new Animation(
    document.querySelector("#d"), effect, {duration: 2.0 * 1000, fill: "forwards"});
var pgroup1 = new AnimationGroup([a1, a2], {name: "p1", fill: "forwards"});
var pgroup2 = new AnimationGroup([a4, a3], {name: "p2", fill: "forwards"});
document.timeline.play(
    new AnimationSequence([pgroup1, pgroup2], {name: "s", fill: "forwards"}));

