
      function validateAll() {
        var $d = document.getElementById('validate').querySelectorAll('paper-input-decorator');
        Array.prototype.forEach.call($d, function(d) {
          d.isInvalid = !d.querySelector('input').validity.valid;
        });
      }
    