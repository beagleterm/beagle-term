
var easings = [
  '',
  'linear',
  'ease-in-out',
  'step-middle',
  'steps(4, end)',
];

var keyframeHeight = 50;
var timing = {duration: easings.length * 1000, fill: 'forwards'};

control.animate({height: easings.length * keyframeHeight + 'px'}, timing);

var keyframes = [];
easings.forEach(function (easing, i) {
  var textBlock = document.createElement('div');
  textBlock.textContent = easing.length ? easing : '<default>';
  textBlock.classList.add('block');
  container.appendChild(textBlock);
  var keyframe = {height: i * keyframeHeight + 'px'};
  if (easing.length) {
    keyframe.easing = easing;
  }
  keyframes.push(keyframe);
});
keyframes.push({height: easings.length * keyframeHeight + 'px'});
target.animate(keyframes, timing);
