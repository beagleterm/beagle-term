
"use strict";

test(function() {
  assert_false(/Firefox/.test(navigator.userAgent));
}, 'Failing on all Firefox');

test(function() {
  assert_false(/Chrome\/28/.test(navigator.userAgent));
}, 'Failing on Chrome 28');

test(function() {
  assert_false(/Chrome/.test(navigator.userAgent));
}, 'Failing on all Chrome for regexing 1');

test(function() {
  assert_false(/Chrome/.test(navigator.userAgent));
}, 'Failing on all Chrome for regexing 2');

