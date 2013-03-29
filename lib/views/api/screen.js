Yn.ScreenView = Em.View.extend({

  classNames: ['screen'],

  init: function() {

    var elementId = this.get('elementId');
    this.set('templateName', Em.String.underscore(elementId) );

    this._super();

  }

});

Yn.DefaultScreenView = Yn.ScreenView.extend({

  classNames: ['default'],
	classNameBindings: ['withHeaderAction', 'withoutHeader'],

	withHeaderAction: false,
	withoutHeader: false,

	setMinHeight: true,


	init: function() {

		this._super();

		var self = this;
		this.on('didInsertElement', function () {

			if ( self.get('setMinHeight') ) {

				Em.run.next(function() {
					self._applyMinHeightScreenContainer();
				});

			}

		});

	},


	_applyMinHeightScreenContainer: function() {

		var heights = 0,
				path = "";


		if ( this.get('withHeaderAction') ) {
			path += ", .header-action";
		}

		if ( !this.get('withoutHeader') ) {
			// can be .header or > .header
			path += ", .header";
		}

		if ( path !== "" ) {
			path = path.slice(2);
			
			var items = this.$(path);
			if ( !!items ) {	
				items.each( function(){ 
					heights += $(this).outerHeight(true); 
				});
			}
		}

		//min-height to center SpinnerView	and show background pattern
		var height = Yn.jQueryCache.outerHeight('app',true) - heights;
		this.$('.screen-container').css('min-height', height+'px');

	}

});
