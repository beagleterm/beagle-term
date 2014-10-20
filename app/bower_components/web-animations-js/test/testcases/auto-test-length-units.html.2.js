
"use strict";
for (var id in anims) {
  document.timeline.play(
      new Animation(document.querySelector(id), anims[id], {duration: 2 * 1000, fill: 'forwards'}));
}
