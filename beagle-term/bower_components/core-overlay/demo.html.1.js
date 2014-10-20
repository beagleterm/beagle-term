
	
	Polymer('x-container', {
	
		inputHandler: function(e) {
			if (e.target.value === 'something') {
				this.$.confirmation.toggle();
			}
		},
	
		tapHandler: function() {
			this.$.dialog.toggle();
		}
	
	});
	
	