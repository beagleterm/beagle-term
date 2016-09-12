// Copyright (c) 2016, Sungguk Lim. Please see the AUTHORS file for details.
// All rights reserved. Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

function assert(condition, out_message) {
  if (!condition) {
    var message = 'Assert failed';
    if (out_message)
      message = message + ': ' + out_message;
    var error = new Error(message);
    console.warn(error.stack);
    throw error;
  }
  return condition
}

function assertNotReached(out_message) {
  assert(false, 'Unreachable hit: ' + out_message);
}
