
'use strict';

var test = async_test('Check second animation has fired after being triggered inside onend callback');
var element = document.querySelector('#target');
var animation = new Animation(element, {left: '50px'}, 0.5);
animation.addEventListener('end', function() {
  var nextAnimation = new Animation(element, {left: '100px'}, 0.5);
  nextAnimation.addEventListener('end', function() {
    test.step(function() { assert_styles("#target", {left:'100px'}); });
    test.done();
  });
  document.timeline.play(nextAnimation);
});
document.timeline.play(animation);

timing_test(function() {at(1 * 1000, function() {});}, 'Force testharness to execute to 1 second.');
