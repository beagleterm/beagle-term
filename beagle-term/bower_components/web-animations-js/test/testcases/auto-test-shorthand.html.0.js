
var expected_failures = [
  {
    browser_configurations: [{ firefox: true }],
    tests: ['#font at t=(0|500|1000|1500|2000)ms'],
    message: 'Floating point issues.',
  }, {
    browser_configurations: [{ firefox: true }],
    tests: ['#background at t=(0|500|1000|1500|2000)ms'],
    message: 'Setting background to "auto" gets back "auto auto".',
  }, {
    browser_configurations: [{ msie: true }],
    tests: [
      '#((?!(borderWidth|borderRadius|margin|padding)).*) at t=(0|500|1000|1500|2)ms',
      '#borderWidth at t=(500|1000|1500)ms',
    ],
    message: 'IE returns rgba.',
  }, {
    browser_configurations: [{ chrome: true, version: '30|31' }],
    tests: ['#font'],
    message: 'Different initial font-size.',
  }
];
