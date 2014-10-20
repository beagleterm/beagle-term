

    var s = document.querySelector('core-selection');

    suite('basic', function() {

      test('select item', function(done) {
        var func = function(event) {
          assert.isTrue(event.detail.isSelected);
          assert.equal(event.detail.item, '(item1)');
          assert.isTrue(s.isSelected(event.detail.item));
          assert.equal(s.getSelection().length, 1);
          s.removeEventListener('core-select', func);
          done();
        }
        s.addEventListener('core-select', func);
        s.select('(item1)');
      });

      test('select null', function(done) {
        var func = function(event) {
          assert.isTrue(event.detail.isSelected);
          assert.equal(event.detail.item, '(item2)');
          assert.isTrue(s.isSelected(event.detail.item));
          assert.equal(s.getSelection().length, 2);
          s.removeEventListener("core-select", func);
          done();
        }
        s.addEventListener("core-select", func);
        s.select('(item2)');
      });

    });

  