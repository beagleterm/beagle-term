

    var s = document.querySelector('#selector');

    suite('multi', function() {

      test('honors the multi attribute', function() {
        assert.isTrue(s.multi);
      });

      test('has sane defaults', function() {
        assert.equal(s.selected, null);
        assert.equal(s.selectedClass, 'core-selected');
        assert.equal(s.valueattr, 'name');
        assert.equal(s.items.length, 5);
      });

      test('allows multi-selection', function(done) {
        // setup listener for core-select event
        var selectEventCounter = 0;
        s.addEventListener('core-select', function(e) {
          if (e.detail.isSelected) {
            selectEventCounter++;
          } else {
            selectEventCounter--;
          }
        });
        // set selected
        s.selected = [0, 2];
        asyncPlatformFlush(function() {
          // check core-select event
          assert.equal(selectEventCounter, 2);
          // check selected class
          assert.isTrue(s.children[0].classList.contains('core-selected'));
          assert.isTrue(s.children[2].classList.contains('core-selected'));
          // check selectedItem
          assert.equal(s.selectedItem.length, 2);
          assert.equal(s.selectedItem[0], s.children[0]);
          assert.equal(s.selectedItem[1], s.children[2]);
          // tap on already selected element should unselect it
          s.children[0].dispatchEvent(new CustomEvent('tap', {bubbles: true}));
          // check selected
          assert.equal(s.selected.length, 1);
          asyncPlatformFlush(function() {
            assert.equal(selectEventCounter, 1);
            assert.isFalse(s.children[0].classList.contains('core-selected'));
            // add selected
            s.selected.push(3);
            s.selected.push(4);
            // check core-select event
            asyncPlatformFlush(function() {
              assert.equal(selectEventCounter, 3);
              done();
            });
          });
        });
      });
      
      test('toggle multi to false', function(done) {
        // set selected
        s.selected = [0, 2];
        var first = s.selected[0];
        // set mutli to false, so to make it single-selection
        s.multi = false;
        asyncPlatformFlush(function() {
          // selected should not be an array
          assert.isNotArray(s.selected);
          // selected should be the first value in the old array
          assert.equal(s.selected, first);
          done();
        });
      });

    });

  