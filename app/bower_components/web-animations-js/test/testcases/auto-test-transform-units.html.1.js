
"use strict";

var transformValues = [
  ['translate(0px, 0px)', 'translate(10em)', 'translate(10%, 1in)'],
  ['rotate(0deg)', 'rotate(50deg)', 'rotate(3rad)', 'rotate(200grad)'],
  ['skew(0deg)', 'skew(20rad)', 'skew(40grad, 20rad)'],
  ['skewX(0deg)', 'skewX(20grad)', 'skewX(40rad)'],
  ['skewY(0deg)', 'skewY(20rad)', 'skewY(40grad)']
];

var separation_x = 100;
var separation_y = 50;
var max_x = 1000;

var toplevel = document.querySelector("div");
var y = 50;
var animations = [];
for (var i = 0; i < transformValues.length; i++) {
  var x = 10;
  for (var j = 0; j < transformValues[i].length; j++) {
    for (var k = 0; k < transformValues[i].length; k++) {
      if (j == k) {
        continue;
      }
      toplevel.appendChild(document.createElement("div"));
      var div = toplevel.lastChild;
      div.className = "expected";
      div.style.top = y + 'px';
      div.style.left = x + 'px';
      div.style[_WebAnimationsTestingUtilities._prefixProperty('transform')] = transformValues[i][k];
      toplevel.appendChild(document.createElement("div"));
      var div = toplevel.lastChild;
      div.className = "anim";
      div.style.top = y + 'px';
      div.style.left = x + 'px';
      div.id = "i" + i + "_" + j + "_" + k
      animations.push(new Animation(div, [
        {transform: transformValues[i][j]},
        {transform: transformValues[i][k]},
      ], {duration: 2 * 1000, fill: 'forwards'}));
      x += separation_x;
      if (x > max_x) {
        x = 20;
        y += separation_y;
      }
    }
  }
  y += separation_y;
}

animations.forEach(function(anim) { document.timeline.play(anim); });
