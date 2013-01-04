Yn.UiManager = Em.Object.extend({

	mustUnblockEvents: false,
	isBlocked: false,

	triggerEvent: function(view, eventName, context) {

		if ( !this.get('isBlocked') ) {

        this._initEvent(view);
        try {
          view.manager.send(eventName, context);
          this._endEvent();
        } catch (e) {
          console.log(e.message);
          console.log(e.stack);
          if ( this.get('mustUnblockEvents') ) {
            this.endAsyncEvent();
          } else {
            this._endEvent();
          }
        }

		}

	},

	initAsyncEvent: function() {

		this.set('mustUnblockEvents', true);

	},

	endAsyncEvent: function() {

		Em.assert( 'endAsyncEvent ' + this.get('mustUnblockEvents') + ' ' +this.get('isBlocked') , this.get('mustUnblockEvents') === true && this.get('isBlocked') === true );

		this.set('mustUnblockEvents', false);
		this._endEvent();

	},

	_initEvent: function(view) {
		this._block(view);
	},

	_endEvent: function() {

		if ( !this.get('mustUnblockEvents') ) {
			this._unblock();
		}

	},

	_block: function(view) {
		this.blockerView = view;

		if ( Yn.IsPending.detect(this.blockerView)  ) {
			/*
			var self = this;
			Ember.run(function(){
				self.blockerView.set('isPending', true);
			});
			*/

			//this.blockerView.set('isPending', true);
			this.blockerView.$().addClass('is-pending');

		}
		this.set('isBlocked', true);
		Em.applicationGestureManager.set('isAllBlocked', true);

	},

	_unblock: function() {

		if ( Yn.IsPending.detect(this.blockerView)  ) {
			/*
			var self = this;
			Ember.run(function(){
				self.blockerView.set('isPending', false);
			});
			*/

			//this.blockerView.set('isPending', false);
			this.blockerView.$().removeClass('is-pending');
		}

		Em.applicationGestureManager.set('isAllBlocked', false);
		this.set('isBlocked', false);
	}

});
