
      Polymer('x-shadow', {
        publish: {
          z: {value: 0, reflect: true}
        },
        up: true,
        zChanged: function() {
          this.fire('shadow-z-changed');
        },
        tapAction: function() {
          if (this.up) {
            if (this.z < 5) {
              this.z += 1;
            } else {
              this.z -= 1;
              this.up = false;
            }
          } else {
            if (this.z > 0) {
              this.z -= 1;
            } else {
              this.z += 1;
              this.up = true;
            }
          }
        }
      });
    