var set = Em.set, get = Em.get;

Yn.UiManager = Em.Object.extend({

	mustUnblockEvents: false,
	isBlocked: false,

	triggerEvent: function(view, eventName, context) {

		if ( !get( this, 'isBlocked') ) {

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

		set(this, 'mustUnblockEvents', true);

	},

	endAsyncEvent: function() {

		Em.assert( 'endAsyncEvent ' + this.get('mustUnblockEvents') + ' ' +this.get('isBlocked') , this.get('mustUnblockEvents') === true && this.get('isBlocked') === true );

		set(this, 'mustUnblockEvents', false);
		this._endEvent();

	},

	_initEvent: function(view) {
		this._block(view);
	},

	_endEvent: function() {

		if ( !get(this, 'mustUnblockEvents') ) {
			this._unblock();
		}

	},

	_block: function(view) {
		this.blockerView = view;

		if ( Yn.IsPending.detect(this.blockerView)  ) {

			this.blockerView.$().addClass('is-pending');

		}
		set(this, 'isBlocked', true);
		Em.applicationGestureManager.set('isAllBlocked', true);

	},

	_unblock: function() {

		if ( Yn.IsPending.detect(this.blockerView) && !!this.blockerView.$() ) {
			this.blockerView.$().removeClass('is-pending');
		}

		Em.applicationGestureManager.set('isAllBlocked', false);
		set(this, 'isBlocked', false);
	}

});
