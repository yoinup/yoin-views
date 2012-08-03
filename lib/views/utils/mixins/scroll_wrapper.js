Yn.ScrollWrapper = Ember.Mixin.create({
	heights: [],
	enableLogging: false,

	classNames: ['scroll-wrapper'],

	shouldSetUpDimensions: false,

	init: function( ) {
		this._super();

		if ( this.get('shouldSetUpDimensions') ) {
			this.setUpProperties();
		}
	},

	didInsertElement: function() {

		this._super();

		if ( this.get('shouldSetUpDimensions') ) {
			this.setUpDimensions();
		}

		var id = this.get('elementId');
		//this.iScroll = new iScroll(id, { checkDOMChanges:false, hScrollbar:false, vScrollbar:false });

	},

	setUpProperties: function() {

		var heights = this.get('heights');
		if ( Em.typeOf(heights) === "string" ) {
			this.heights = this.heights.split(' ');
		}

	},


	setUpDimensions: function() {

		var elementHeight, elementHeights = 0, self = this;

		this.heights.forEach( function(item) {

			//elementsHeight+= $('#'+item).height();
			
			elementHeight = (typeof item === 'number')?item:$('#'+item).outerHeight();

			Em.assert('scroll wrapper mixin (' + item + ') not found ', !!elementHeight);

			elementHeights+=elementHeight;

			if ( self.enableLogging ) {
				console.log('item ' + item + ' elementHeight ' + elementHeight + ' total ' + elementHeights  );
			}
			
		});


		// innerHeight: works in safari browser and phonegap ios app
		// TODO: move to window.mkHeight prototype
		//var height = window.innerHeight-elementHeights;
		var height = 460-elementHeights;

		this.$().height(height); 

	},

	refreshScroll: function() {

/*
		var iScroll = this.iScroll;

		if ( iScroll ) {
			// because it could be not in the DOM
			Em.run.next(function() {


				Em.run.next(function() {
					iScroll.refresh();
					iScroll.scrollTo(0, 0, 0);
				});

			});

		}
*/
	},

	_contentChanged: Ember.observer(function() {
	
		this.refreshScroll();

	}, 'content.[]'),


	destroy: function() {

		var iScroll = this.iScroll;
    if ( iScroll ) {
      iScroll.destroy();
      iScroll = null;
    }

		this._super();

	}

});
