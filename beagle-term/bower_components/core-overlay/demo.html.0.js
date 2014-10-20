

	Polymer('x-dialog', {
	
		ready: function() {
			this.$.overlay.target = this;
		},

		toggle: function() {
			this.$.overlay.toggle();
		}

	});

	