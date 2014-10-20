
"use strict";

var animFuncTR = new MotionPathEffect(
    document.querySelector('#pathTR').pathSegList, 'auto-rotate');
document.timeline.play(new Animation(document.querySelector("#animTR"),
    animFuncTR, {duration: 10 * 1000, iterations: 2}));

var animFuncBL = new MotionPathEffect(
    document.querySelector('#pathBL').pathSegList, 'auto-rotate');
document.timeline.play(new Animation(
    document.querySelector("#animBL"), animFuncBL,
    {duration: 10 * 1000, iterations: 2, easing: "paced"}));

var animFuncBRKeyFrames = new KeyframeEffect(
    [{transform: "translate(387.5px, 287.5px) rotate(180deg)"}], "replace");
var animFuncBRPath = new MotionPathEffect(
    document.querySelector('#pathBR').pathSegList, 'auto-rotate');
var animBR = new Animation(document.querySelector("#animBR"), animFuncBRPath,
    {duration: 10 * 1000, iterations: 2, easing: "paced"});
document.timeline.play(animBR);

testharness_timeline.schedule(function() {
    animBR.effect = animFuncBRKeyFrames;
}, 3000);
testharness_timeline.schedule(function() {
    animBR.effect = animFuncBRPath;
}, 6000);
