
"use strict";
var rect = document.querySelector(".anim")
var rect2 = document.querySelector(".anim2")

var dt = document.timeline;

dt.play(new Animation(rect, [{x: "0px"}, {x: "400px"}], {duration: 3 * 1000, fill: 'forwards'}));
dt.play(new Animation(rect,
    new KeyframeEffect([{x: "0px"}, {x: "200px"}], 'add'),
    {delay: 1 * 1000, duration: 4 * 1000, fill: 'forwards'}));

dt.play(new Animation(rect2, [
  {transform: "translate(0px, 0px)"},
  {transform: "translate(200px, 200px)"},
], {duration: 3 * 1000, fill: 'forwards'}));
dt.play(new Animation(rect2, new KeyframeEffect([
  {transform: "rotate(0deg) translate(0px, 0px)"},
  {transform: "rotate(90deg) translate(100px, 0px)"},
], 'add'), {delay: 1 * 1000, duration: 4 * 1000, fill: 'forwards'}));
