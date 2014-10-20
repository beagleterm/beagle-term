
var expected_failures = [
  {
    browser_configurations: [{ firefox: true }],
    tests: ['#background at t=0ms'],
    message: 'rgb(0, 0, 0) gets converted to transparent in Firefox.',
  }, {
    browser_configurations: [{ firefox: true }],
    tests: ['#background at t=1000ms'],
    message: 'FIXME: Transparency is wrong.',
  }, {
    browser_configurations: [{ firefox: true }],
    tests: ['#border at t=2000ms'],
    message: 'FIXME: Border is wrong.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: ['#transform at t=0ms'],
    message: 'none in IE.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: ['#transform at t=1000ms'],
    message: 'Very small value floating point issue.',
  }, {
    browser_configurations: [{ msie: true }],
    tests: [
      '#(background|border) at t=(1|2)000ms',
      '#text at t=0000ms',
      '#(text|outline) at t=(1|2)000ms',
    ],
    message: 'IE returns rbga values.',
  }, {
    browser_configurations: [
      { chrome: true, version: '30|31' },
      { firefox: true },
    ],
    tests: ['#text at t=(0|1000)ms'],
    message: 'Different initial font-size.',
  }
];
