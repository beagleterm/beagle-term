
    function toggleDialog(transition) {
      var dialog = document.querySelector('paper-dialog[transition=' + transition + ']');
      dialog.toggle();
    }
  