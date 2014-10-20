
"use strict";

var divs = document.querySelectorAll(".anim");

var group = new AnimationGroup([], 2000);

for (var i = 0; i < divs.length; i++) {
  group.append(new Animation(divs[i], {left: (100 * (i+1)) + "px"}, {duration: 2 * 1000, fill: 'forwards'}));
}
document.timeline.play(group);

