
'use strict';

var directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
var fills = ['none', 'backwards', 'forwards', 'both', 'auto'];
var effect = [{left: '100px'}, {left: '200px'}];
var nextId = 0;

function testCase(element, direction, fill, duration) {
  document.timeline.play(
      new Animation(element, effect, {
        iterations: 4,
        direction: direction,
        fill: fill,
        duration: duration,
      }));
  element.id = 'anim' + (nextId++);
  element.textContent = 'ID: ' + element.id + ' | dir: ' + direction + ' | fill: ' + fill + ' | dur: ' + duration;
}

directions.forEach(function (direction) {
  fills.forEach(function (fill) {
    var dur0 = document.querySelector('.dir-' + direction + ' .fill-' + fill);
    var dur1 = dur0.cloneNode(true);
    dur0.parentElement.insertBefore(dur1, dur0);
    testCase(dur1, direction, fill, 1000);
    testCase(dur0, direction, fill, 0);
  });
});
