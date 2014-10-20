
"use strict";
document.timeline.play(new Animation(document.querySelector('#test'), [
  {display: 'none'},
  {display: 'block'},
  {display: 'none'},
  {display: 'block'},
  {display: 'none'},
  {display: 'block'},
  {display: 'none'},
], {duration: 0.5 * 1000, fill: 'forwards'}));
