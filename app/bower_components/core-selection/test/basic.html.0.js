

    var s = document.querySelector('core-selection');

    suite('basic', function() {

      test('select item', function(done) {
        var func = function(event) {
          assert.isTrue(event.detail.isSelected);
          assert.equal(event.detail.item, '(item)');
          assert.isTrue(s.isSelected(event.detail.item));
          assert.isFalse(s.isSelected('(some_item_not_selected)'));
          s.removeEventListener('core-select', func);
          done();
        }
        s.addEventListener('core-select', func);
        s.select('(item)');
      });

      test('select null', function(done) {
        var func = function(event) {
          assert.isFalse(event.detail.isSelected);
          assert.equal(event.detail.item, '(item)');
          assert.isFalse(s.isSelected(event.detail.item));
          s.removeEventListener("core-select", func);
          done();
        }
        s.addEventListener("core-select", func);
        s.select(null);
      });

    });

  