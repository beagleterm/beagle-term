
"use strict";

var dt = document.timeline;
var timing = {duration: 2 * 1000, fill: 'forwards'};

dt.play(new Animation(document.querySelector("#a"),
    [{backgroundColor: "red"}, {backgroundColor: "green"}], timing));
dt.play(new Animation(document.querySelector("#b"),
    {backgroundColor: "rgb(0, 128, 0)"}, timing));
dt.play(new Animation(document.querySelector("#c"),
    new KeyframeEffect([
      {offset: 0.25, backgroundColor: "rgb(255, 0, 0)"},
      {offset: 0.75, backgroundColor: "rgb(0, 0, 255)"},
    ], 'add'), timing));
dt.play(new Animation(document.querySelector("#d"),
    {offset: 0.5, backgroundColor: "white"}, timing));
dt.play(new Animation(document.querySelector("#e"),
    {offset: 0.5, backgroundColor: "white"}, timing));

dt.play(new Animation(document.querySelector("#f"),
    [{backgroundColor: "#000000"}, {backgroundColor: "#ffffff"}], timing));

dt.play(new Animation(document.querySelector("#g"),
    [{backgroundColor: "#000"}, {backgroundColor: "#fff"}], timing));

