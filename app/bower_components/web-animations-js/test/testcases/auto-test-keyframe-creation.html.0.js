
"use strict";

var dt = document.timeline;

dt.play(new Animation(document.querySelector("#a"),
    [{left: "100px"}, {left: "200px"}], {delay: 1 * 1000, duration: 1 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#b"), {left: "200px"},
    {delay: 1 * 1000, duration: 1 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#c"),
    [{left: "100px"}, {left: "200px"}], {duration: 2 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#d"), {left: "200px"},
    {duration: 2 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#e"), [
  {offset: 0, left: "100px"},
  {offset: 1, left: "200px"},
], {duration: 2 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#f"), [
  {offset: 0, left: "200px"},
  {offset: 0.25, left: "100px"},
  {offset: 1, left: "200px"}
], {duration: 2 * 1000, fill: 'forwards'}));
dt.play(new Animation(document.querySelector("#g"), new KeyframeEffect([
  {offset: 0.25, left: "200px"},
  {offset: 0.5, left: "100px"},
  {offset: 0.75, left: "200px"}
], "add"), {duration: 2 * 1000, fill: 'forwards'}));

