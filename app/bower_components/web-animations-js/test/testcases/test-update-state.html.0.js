
var expected_failures = [
  {
    browser_configurations: [{ firefox: true }],
    tests: ['Updated style should be visible despite unrelated errors at t=5ms'],
    message: 'Issue with window sizing cause value to be zero rather then 500px.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: ['Changing the start time of a new player to before the current time should cause it to take effect at t=3ms'],
    message: 'IE returns rgba.',
  }
];
