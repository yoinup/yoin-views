
Yn.Scroller = Ember.Mixin.create({
	classNames: ['scroller'],

	exclude: null,

	didInsertElement: function() {

		this._super();
    this._setHeight();

	},

  _setHeight: function() {

    var elementHeights = 0;
    var excludeHeights;
    var self = this;
    
    // this allows some binding to work and their views to be appended
    // mainly because addExcludeExtra implementation
    elementHeights += self._getSum(self.get('exclude'));
    elementHeights += self._getSum(self.get('excludeGlobal'), true);

    var height = Yn.jQueryCache.outerHeight('app',true)-elementHeights;
    self.$().height(height); 

  },

  _getSum: function(heights, isGlobal) {

    var result = 0;
		if ( !!heights ) {

			if ( isGlobal ) {
				heights.split(' ').forEach(function(item) {
					result += Yn.jQueryCache.outerHeight(item,true);
				});
			} else {
				var view = this.nearestOfType(Yn.DefaultScreenView);
				view.$(heights).each( function(){ 
					result += $(this).outerHeight(true); 
				});
			}

    }
    return result;

  }

});
