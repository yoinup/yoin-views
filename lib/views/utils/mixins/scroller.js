
// TODO: separate DynamicView Mixin
Yn.Scroller = Ember.Mixin.create({
	classNames: ['scroller'],

	exclude: null,
  addExcludeExtra1: false,
  excludeExtra1: null,

  _addExcludeExtra1: Em.observer(function() {

    // view IN DOM
    // TODO: find the Ember API way
    if ( Ember.$('#'+this.get('elementId')).length !== 0 ) {
      this._setHeight();
    }

  },'addExcludeExtra1'),

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
    Em.run.next(function() {
      elementHeights += self._getSum(self.get('exclude'));
      elementHeights += self._getSum(self.get('excludeGlobal'), true);

      if ( self.get('addExcludeExtra1')  ) {
        elementHeights += self._getSum(self.get('excludeExtra1'));
        elementHeights += self._getSum(self.get('excludeExtra1Global'), true);
      }

      var height = Yn.jQueryCache.outerHeight('app',true)-elementHeights;
      self.$().height(height); 
    });

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
