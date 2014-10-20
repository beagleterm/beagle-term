
"use strict";

document.timeline.play(new Animation(anim, [{transform: 'scale(2)'}, {transform: 'rotate(45deg)'}], {duration: 1, fill: 'forwards'}));


timing_test(function() {
  // should start as a scale(2) matrix
  at(0, function() {
    assert_styles('.anim', [{'transform': 'matrix(2, 0, 0, 2, 0, 0)'}]);
  });

  // should be a scale(1.5) rotate(22.5deg) matrix halfway though
  at(0.5, function() {
    assert_styles('.anim', [{'transform': 'matrix(1.3858, 0.574, -0.574, 1.3858, 0, 0)'}]);
  });

  // should end as a rotate(45deg) matrix
  at(1, function() {
    assert_styles('.anim', [{'transform': 'matrix(0.7071067811865476, 0.7071067811865475, -0.7071067811865475, 0.7071067811865476, 0, 0)'}]);
  });
});

