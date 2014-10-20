
"use strict";

var transformValues = [
  ['translate3d(0px, 0px, 0px)', 'translate3d(20px, 40px, 60px)',
   'translateZ(20px)'],
  ['translateZ(50px) scale3d(1, 1, 1)', 'translateZ(50px) scale3d(1.5, 3, 5)', 'translateZ(50px) scaleZ(2)'],
  ['rotateX(0deg)', 'rotateX(50deg)'],
  ['rotateY(0deg)', 'rotateY(50deg)'],
  ['rotateZ(0deg)', 'rotateZ(50deg)'],
];

var separation_x = 70;
var separation_y = 70;
var max_x = 1000;

var toplevel = document.querySelector("div");

var animations = [];

var y = 50;
for (var i = 0; i < transformValues.length; i++) {
  var x = 300;
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
      div.textContent = "perspective";
      div.id = "i_" + i + "_" + j + "_" + k;
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

