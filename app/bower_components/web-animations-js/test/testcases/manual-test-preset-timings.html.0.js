
"use strict";

var size = 100;
var duration = 3.0 * 1000;

function testTiming(name) {
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(0, size);
  var span = document.createElement('span');
  span.appendChild(canvas);
  span.appendChild(document.createElement('br'));
  span.appendChild(document.createTextNode(name));
  document.body.appendChild(span);
  return new Animation(ctx,
    function(timeFraction, animation) {
      var inputTimeFraction = player.currentTime / duration;
      animation.target.lineTo(inputTimeFraction * size, size - timeFraction * size);
      animation.target.stroke();
    }, {
      duration: duration,
      easing: name,
    });
}

// TODO: Making player global like this is is rather ugly. It would be nice if
// the animation or player were passed to the custom animation effect's sample
// function.
var player = document.timeline.play(new AnimationGroup([
  testTiming('ease'),
  testTiming('linear'),
  testTiming('ease-in'),
  testTiming('ease-out'),
  testTiming('ease-in-out'),
]));

