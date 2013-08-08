var set = Em.set, get = Em.get;

Yn.UiManager = Em.Object.extend({

	mustUnblockEvents: false,
	isBlocked: false,

	triggerEvent: function(view, eventName, context) {

		if ( !get( this, 'isBlocked') ) {

        this._initEvent(view);
        try {
					this._sendEvent(view, eventName, context);
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

	_sendEvent: function(view, eventName, context) {

		view.manager.send(eventName, context);

	},

	initAsyncEvent: function() {

		set(this, 'mustUnblockEvents', true);

	},

	endAsyncEvent: function() {

		Em.assert('------endAsyncEvent\n ' + arguments.callee.caller.toString() + '\n  ' + this.get('mustUnblockEvents') + ' ' +this.get('isBlocked') + '\n---------------------------------------' , this.get('mustUnblockEvents') === true && this.get('isBlocked') === true );

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

		if ( !!this.blockerView && Yn.IsPending.detect(this.blockerView)  ) {

			this.blockerView.$().addClass('is-pending');

		}
		set(this, 'isBlocked', true);
		this._releaseBlock();
	},


	_unblock: function() {

		if ( !!this.blockerView && !!this.blockerView.$() && Yn.IsPending.detect(this.blockerView) ) {
			this.blockerView.$().removeClass('is-pending');
		}

		set(this, 'isBlocked', false);
		this._unreleaseBlock();
	},

	_releaseBlock: function() {
		Em.applicationGestureManager.set('isAllBlocked', true);
	},

	_unreleaseBlock: function() {
		Em.applicationGestureManager.set('isAllBlocked', false);
	}

});
