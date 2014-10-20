
"use strict";

var dt = document.timeline;
var timing = {duration: 2 * 1000, fill: 'forwards'};

dt.play(new Animation(document.querySelector(".outer"),
    {width: "800px"}, timing));

// 50px -> 0px linear, 0% -> 50% (0px -> 400px quadratic)
dt.play(new Animation(document.querySelector("#a"), {width: "50%"}, timing));
// 25% -> 50% (50px -> 400px quadratic)
dt.play(new Animation(document.querySelector("#b"), {width: "50%"}, timing));
// 50px -> 400px linear
dt.play(new Animation(document.querySelector("#c"),
    {width: "400px"}, timing));
// 25px -> 0px linear, 12.5% -> 50% (25px -> 400px quadratic)
dt.play(new Animation(document.querySelector("#d"), {width: "50%"}, timing));
// 50px -> 100px linear, 0% -> 37.5% (0px -> 300px quadratic)
dt.play(new Animation(document.querySelector("#e"),
    {width: "calc(37.5% + 100px)"}, timing));
// 0px -> 100px linear, 25% -> 37.5% (50px -> 300px quadratic)
dt.play(new Animation(document.querySelector("#f"),
    {width: "calc(37.5% + 100px)"}, timing));
// 100px -> 100px linear, -25% -> 37.5% (-50px -> 300px quadratic)
dt.play(new Animation(document.querySelector("#g"),
    {width: "calc(37.5% + 100px)"}, timing));

