
var expected_failures = [
  {
    browser_configurations: [{ chrome: true, version: '28' }],
    tests: ['Failing on Chrome 28'],
    message: 'This test is deliberately broken on Chrome 28.',
  }, {
    browser_configurations: [{ chrome: true }],
    tests: ['Chrome for regexing'],
    message: 'This test is deliberately broken on all Chrome versions.',
  }, {
    browser_configurations: [{ firefox: true }],
    tests: ['Failing on all Firefox'],
    message: 'This test is deliberately broken on all Firefox versions.',
  }
];
