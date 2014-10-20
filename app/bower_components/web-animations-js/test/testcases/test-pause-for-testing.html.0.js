
'use strict';
var downRed = new AnimationGroup(
    [new Animation(document.querySelector('#a'), {top: '600px'}, 4)]);
var downBlue = new AnimationGroup(
    [new Animation(document.querySelector('#b'), {top: '600px'}, 4)],
    {delay: 1});
document.timeline.play(downRed);
document.timeline.play(downBlue);
document.timeline._pauseAnimationsForTesting(2);

timing_test(function() {
  at(0, function() {
    assert_styles('#a', {'top':'300px'})
    assert_styles('#b', {'top':'150px'})
  });
  at(12, function() {
    assert_styles('#a', {'top':'300px'})
    assert_styles('#b', {'top':'150px'})
  });
}, 'Pausing all animations should work when players have different start delays.')
