
"use strict";

var element = document.createElement('span');
document.body.appendChild(element);

test(function() {
  element.animate([{marginLeft: '1px'}, {marginLeft: '1px'}], 1);
  assert_styles(element, {marginLeft: '0px'});
}, 'New animation should not apply within script before timeline has started.')

timing_test(function() {
  at(0, function() {
    element.animate([{marginTop: '1px'}, {marginTop: '1px'}], 1);
    assert_styles(element, {marginTop: '1px'});
  });
}, 'New animation should apply within script after timeline has started.')

timing_test(function() {
  var player = element.animate([{left: '0px'}, {left: '1000px'}], 10);
  at(1, function() {
    assert_styles(element, {left: '100px'});

    player.currentTime += 1;
    assert_styles(element, {left: '200px'});
  });
}, 'Updated style should be visible after player seek');

timing_test(function() {
  var player = element.animate([{top: '0px'}, {top: '1000px'}], 10);
  at(1, function() {
    assert_styles(element, {top: '100px'});

    player.source.timing.delay = -1;
    assert_styles(element, {top: '200px'});
  });
}, 'Updated style should be visible after change to specified timing');

var group = new AnimationSequence([
  new Animation(element, {}, 1),
  new Animation(element, [{right: '0px'}, {right: '1000px'}], 10),
]);
document.timeline.play(group);
timing_test(function() {
  at(2, function() {
    assert_styles(element, {right: '100px'});

    group.children[0].timing.duration = 0.5;
    assert_styles(element, {right: '150px'});

    group.children[0].remove();
    assert_styles(element, {right: '200px'});
  });
}, 'Updated style should be visible after change to animation tree');

timing_test(function() {
  at(3, function() {
    var player = element.animate([{color: 'red'}, {color: 'green'}, {color: 'red'}], 1);
    assert_equals(player.startTime, 3);
    assert_styles(element, {color: 'red'});

    player.startTime -= 0.5;
    assert_styles(element, {color: 'green'});
  });
}, 'Changing the start time of a new player to before the current time should cause it to take effect');

var player2 = element.animate([{bottom: '0px'}, {bottom: '1000px'}], 10);
// Run this last, since if it fails it's likely to corrupt the other tests.
timing_test(function() {
  at(5, function() {
    assert_styles(element, {bottom: '500px'});

    try {
      var group = new AnimationGroup();
      group.append(group);
    } catch (e) {
    }
    player2.source.timing.delay = -1;
    assert_styles(element, {bottom: '600px'});
  });
}, 'Updated style should be visible despite unrelated errors');
