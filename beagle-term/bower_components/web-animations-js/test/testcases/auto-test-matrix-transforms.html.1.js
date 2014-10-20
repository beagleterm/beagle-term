
"use strict";
var a = document.querySelector("#a")
var b = document.querySelector("#b")
var c = document.querySelector("#c")
var d = document.querySelector("#d")
var e = document.querySelector("#e")

var dt = document.timeline;

var timing = {duration: 2 * 1000, fill: 'forwards'};

dt.play(new Animation(a, {transform: "translate(100px)"}, timing));
dt.play(new Animation(b, {transform: "translate(100px)"}, timing));
dt.play(new Animation(c, {transform: "translate(100px)"}, timing));
dt.play(new Animation(d, {transform: "translate(100px) rotate(45deg)"}, timing));
dt.play(new Animation(e,
    {transform: "translate(100px) rotate(20deg) scale(0.5)"}, timing));
