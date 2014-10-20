
"use strict";

var divs = document.querySelectorAll(".anim");

var dt = document.timeline;

var timing = {duration: 2 * 1000, fill: 'forwards'};

dt.play(new Animation(divs[0],
    [{transform: "translate(0px, 0px)"}, {transform: "translate(200px, 0px)"}],
    timing));
dt.play(new Animation(divs[1],
    [{transform: "rotate(0deg)"}, {transform: "rotate(90deg)"}], timing));
dt.play(new Animation(divs[2], [
  {transform: "translate(0px, 0px) rotate(0deg)"},
  {transform: "translate(200px, 0px) rotate(90deg)"},
], timing));
dt.play(new Animation(divs[3], [
  {transform: "rotate(0deg) translate(0px, 0px)"},
  {transform: "rotate(90deg) translate(200px, 0px)"},
], timing));

