
"use strict";

var anim = [
  {clip: 'rect(300px, 400px, 300px, 400px)'},
  {clip: 'rect(0px, 800px, 600px, 0px)'},
];

document.timeline.play(
    new Animation(document.querySelector('#test'), anim, {duration: 1 * 1000, fill: 'forwards'}));
