
var expected_failures = [
  {
    browser_configurations: [{ firefox: true }],
    tests: [
      '#animTR at t=(0|(1|2|9|10|11)000)ms',
      '#animBL at t=(0|(5|7|8|10)000)ms',
      '#animBR at t=(0|(3|8|9|10)000)ms',
    ],
    message: 'Doesn\'t quite follow path correctly.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: [
      '#animTR at t=(0|(1|2|3|4|9|10|11)000)ms',
      '#animBL at t=(0|(1|3|4|7|8|10|11)000)ms',
      '#animBR at t=(0|(1|3|9|10|11)000)ms',
    ],
    message: 'Doesn\'t quite follow path correctly.',
  }
];
