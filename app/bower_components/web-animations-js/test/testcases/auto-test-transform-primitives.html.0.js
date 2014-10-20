
"use strict";

var transformValues = [
  ['translate(0px)', 'translate(30px)', 'translate(20px, 40px)',
   'translateX(20px)', 'translateY(20px)'],
  ['scale(1, 1)', 'scale(1.5, 3)', 'scale(2)', 'scaleX(2)', 'scaleY(2)'],
  ['rotate(0deg)', 'rotate(50deg)'],
  ['skew(0deg)', 'skew(20deg)', 'skew(40deg, 20deg)'],
  ['skewX(0deg)', 'skewX(40deg)'],
  ['skewY(0deg)', 'skewY(40deg)'],
  ['matrix(1, 0, 0, 1, 0, 0)', 'matrix(-1, 1, -1, -1, 10, 10)'],
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

