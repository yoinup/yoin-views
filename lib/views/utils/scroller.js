Yn.ScrollerView = Em.View.extend( Yn.ScreenContext, {
	classNames: ['scroller'],

	isAtBottom: false,
	check: true,
	holdPeriod: 200,

  // property check if content was already refreshed
	// used to allow showRefreshBottonView
	isRefreshed: null,
	length: null,

	_height: null,
	_top: null,
	_innerHeight: null,
	_inner: null,

	showBottomView: Em.computed(function() {

		return !this.get('isRefreshed') && this.get('isAtBottom');

	}).property('isAtBottom', 'isRefreshed'),
	

	didInsertElement: function() {
		this._super();
		this.refresh();

	},

  didBottomRefresh: function() {
		

  },

	refresh: function() {

		if ( !this.get('isDestroyed') || !this.get('isDestroying') ) {
			//http://www.jquery4u.com/events/jquery-detect-scroll-bottom-read-tc/#.UBGPNkTmovc
			this._height = this.$().height();
			this._offsetTop = this.$().offset().top;

			this._inner = $("> .scroller-container", this.$() );

			//{{#view class="scroller-container" }} 
			// <div class="scroller-container"> --> childViews not working
			this._innerOuterHeight = this._inner.outerHeight(); 
		}

	},

	_isRefreshedChanged: Em.observer(function() {

		if ( this.get('isRefreshed') ) {

			// update after a period to closeshowBottomView 
			var self = this;
			Ember.run.later(function() { 
				self.set('isRefreshed', false);
			}, 500);

		}

	},'isRefreshed'),

	_lengthChanged: Em.observer(function() {

		//console.log('length changed  ' + this.get('length') );

		var self = this;
		// wait to render new content, any better way to do it?
		//Ember.run.schedule ??
		Em.run.next(function() {
			Em.run.next(function() {
				self.refresh();
			});

		});

	},'length'),

  mouseWheel: function(event) { 
		this._check();
	},

  touchMove: function(event) {
		this._check();
	},

	_check: function() {

		if ( this.check ) {
			var isAtBottom =  Math.ceil(this._height - this._inner.offset().top + this._offsetTop) >= this._innerOuterHeight; 
			this.set('isAtBottom', isAtBottom);
		}

	},

  _showBottomViewChanged: Em.observer(function() {

    if ( this.get('showBottomView') ) {

      var self = this;
      this._endTimeout = window.setTimeout( function() {
        self._endFired();
      }, this.holdPeriod);

    } else {

      this._disableEndFired();

    }

  }, 'showBottomView' ),

  _endFired: function() {

    this._disableEndFired();
    this.didBottomRefresh();

  },

  _disableEndFired: function() {

    if ( this._endTimeout ) {
      window.clearTimeout(this._endTimeout);
      this._endTimeout = null;
    }

  },

  destroy: function() {

    this._disableEndFired();
    this._super();

  }

});
