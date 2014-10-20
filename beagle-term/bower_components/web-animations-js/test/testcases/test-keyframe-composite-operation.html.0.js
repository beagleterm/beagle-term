
var expected_failures = [
  {
    browser_configurations: [{ chrome: true }],
    tests: ['Add-composite the neutral value onto a percent length type property with default value'],
    message: 'getComputedStyle is broken under Chrome and this will return auto while the specification says it should return pixels. crbug.com/229280',
  }, {
    browser_configurations: [{ msie: true }],
    tests: ['(Add|Replace)-composite a color type property at t=1ms'],
    message: 'IE returns rbga values.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: [
      '(Add|Replace)-composite a shadow type property at t=1ms',
      'Add-composite the neutral value onto a shadow type property at t=0ms',
    ],
    message: 'IE returns different shadow format.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: ['Add-composite the neutral value onto a (percent length|shadow|transform) type property with default value at t=0ms'],
    message: 'IE returns auto|none|none.',
  }
];
