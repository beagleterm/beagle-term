
'use strict';

var effect = [{left: '100px'}, {left: '100px'}];
function inEffect(element) {
  return getComputedStyle(element).left === '100px';
}

function createAnim(element, fill) {
  return new Animation(element, effect, {
      delay: 0.1,
      duration: 0.1,
      fill: fill,
    });
}
function createGroup(element, fill) {
  return new AnimationSequence([
      new Animation(element, effect, {
        duration: 0.1,
        fill: 'both'})
    ], {
      delay: 0.1,
    });
}

function createElement() {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
}

timing_test(function() {
  var animElement = createElement();
  document.timeline.play(createAnim(animElement, 'auto'));
  var changingAnimElement = createElement();
  var changingAnim = createAnim(changingAnimElement, 'both');
  document.timeline.play(changingAnim);

  var groupElement = createElement();
  document.timeline.play(createGroup(groupElement, 'auto'));
  var changingGroupElement = createElement();
  var changingGroup = createGroup(changingGroupElement, 'none');
  document.timeline.play(changingGroup);

  at(0, function () {
    assert_false(inEffect(animElement), 'Animations should not be in effect by default before they start.');
    assert_true(inEffect(groupElement), 'Timing Groups should be in effect by default before they start.');
  }, 'Before phase');

  at(0.5, function () {
    assert_false(inEffect(animElement), 'Animations should not be in effect by default after they end.');
    assert_true(inEffect(groupElement), 'Timing Groups should be in effect by default before after they end.');

    changingAnim.timing.fill = 'auto';
    changingGroup.timing.fill = 'auto';
    assert_false(inEffect(changingAnimElement), 'Updating Animation fill mode to auto should take effect immediately.');
    assert_true(inEffect(changingGroupElement), 'Updating Timing Group fill mode to auto should take effect immediately.');
  }, 'After phase');
});
