
'use strict';

var startPath = 'M10,10v100l100,-50z';
var endPath = 'M200,10v100h100v-100z';

function addPath(d, fill) {
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  if (d)
    path.setAttribute('d', d);
  path.setAttribute('fill', fill);
  svg.appendChild(path);
  return path;
}

addPath(startPath, 'red');
addPath(endPath, 'red');
var target = addPath(startPath, 'green');
target.classList.add('target');
target.animate({d: endPath}, 1000);
