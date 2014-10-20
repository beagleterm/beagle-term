
"use strict";

var directions = ["normal", "reverse", "alternate", "alternate-reverse"];

var animation = [{left: "100px"}, {left: "500px"}];

for (var i = 0; i < directions.length; i++) {
  var direction = directions[i];
  var container = document.getElementById(direction);

  // Interaction of default start time with parent iterations. At the time of
  // addition, the child picks up a start time of zero. The parent then updates
  // its duration and its iteration time jumps, causing the child to start
  // playing part way through the animation.
  var intrinsicGroup = new AnimationGroup([], {iterations: 2.0, direction: direction});
  document.timeline.play(intrinsicGroup);
  var fixedGroup = new AnimationGroup([], {iterations: 2.0, direction: direction, duration: 4.0 * 1000});
  document.timeline.play(fixedGroup);

  timing_test(function() {
      at(0.75 * 1000, (function(container, direction, intrinsicGroup, fixedGroup) {
        return function() {
          intrinsicGroup.append(new Animation(document.getElementById(direction + '_a'), animation, {duration: 1.0 * 1000, fill: 'forwards'}));
          fixedGroup.append(new Animation(document.getElementById(direction + '_b'), animation, {duration: 1.0 * 1000, fill: 'forwards'}));
        };
      })(container, direction, intrinsicGroup, fixedGroup));
    });
}
