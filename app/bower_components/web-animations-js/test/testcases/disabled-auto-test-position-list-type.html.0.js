
"use strict";

function generateGridLinesURI(size) {
  var canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  var context = canvas.getContext('2d');

  context.fillStyle = 'green';
  context.fillRect(0.5, 0.5, size - 1, size - 1);

  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.strokeRect(1, 1, size - 2, size - 2);

  return canvas.toDataURL();
}
var backgroundImage = 'url(' + generateGridLinesURI(150) + ')';

var startPosition = '0% 0%';
var endPositions = [
  'left',
  'center',
  'right',
  'top',
  'bottom',
  '10px',
  '20%',
  'center left',
  'center center',
  'right bottom',
  'right 25%',
  '10px bottom',
  '10px 40px',
  'left bottom 10px',
  'center top 20%',
  'right top 10px',
  'right bottom 80%',
  'right 80% bottom',
  'bottom left 10px',
  'left 40px bottom 10px',
  'left 20% top 20%',
  'calc(25% - 5px)',
  'calc(25% - 5px) 25%',
  'top calc(25% - 5px) center',
  'bottom left 10px',
  'bottom calc(25% - 5px) right',
  'left 10px bottom 10px',
  'left 25% top 25%',
  'left calc(25% - 5px) top 10px',
  'top 10px right calc(25% - 5px)',
  'bottom calc(25% - 5px) left 10px',
];

for (var i = 0; i < endPositions.length; i++) {
  var endPosition = endPositions[i];
  var pre = document.createElement('pre');
  pre.style.backgroundImage = backgroundImage;
  pre.className = 'anim';
  pre.innerText = 'background-position:\nfrom: ' + startPosition + '\nto: ' + endPosition;
  document.querySelector('#container').appendChild(pre);
  document.timeline.play(new Animation(pre, new KeyframeEffect([
    { backgroundPosition: startPosition },
    { backgroundPosition: endPosition },
  ]), { duration:2, easing: 'ease-in'}));
}
