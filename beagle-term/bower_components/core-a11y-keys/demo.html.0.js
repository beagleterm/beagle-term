
    addEventListener('template-bound', function(ev) {
      ev.target.keys = "* pageup pagedown left right down up shift+a alt+a home end space enter"
      ev.target.print = function(ev) {
        console.log(ev.detail);
        this.$.output.textContent += ev.detail.key + ' pressed!\n';
      }
    });
  