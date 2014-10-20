

    var d1 = document.getElementById('decorator1');
    var i1 = document.getElementById('input1');

    test('aria-label set on input', function() {
      assert.strictEqual(i1.getAttribute('aria-label'), d1.label);
    });

  