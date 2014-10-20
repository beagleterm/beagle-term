

    var i1 = document.getElementById('input1');

    function dispatchInputEvent(target) {
      var e = new Event('input', {
        bubbles: true
      });
      target.dispatchEvent(e);
    };

    suite('preventInvalidInput', function() {

      test('cannot enter invalid input', function() {
        i1.value = '123';
        dispatchInputEvent(i1);
        assert.ok(!i1.value);
      });

      test('preserves valid input after entering invalid input', function() {
        var value = 'abc';
        i1.value = value;
        dispatchInputEvent(i1);
        assert.strictEqual(value, i1.value);
        i1.value = value + '123';
        dispatchInputEvent(i1);
        assert.strictEqual(value, i1.value);
      });

    });

  