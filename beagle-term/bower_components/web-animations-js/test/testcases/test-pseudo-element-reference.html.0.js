
'use strict';
var parent = document.querySelector('#parent');
var child = document.querySelector('#parent');
document.timeline.play(new Animation(
    new PseudoElementReference(child, ':before'), [{width: '0px'}, {width: '100px'}], 1));

timing_test(function() {
  at(0.5, function() {
    assert_styles(parent, {height: '20px'});
  });
}, 'PseudoElementReference is implemented but not supported.');
