
// TODO: separate DynamicView Mixin
Yn.Scroller = Ember.Mixin.create({
	classNames: ['scroller'],

	exclude: null,
  addExcludeExtra1: false,
  excludeExtra1: null,



	didInsertElement: function() {

		this._super();

    var elementHeights = 0;
    var excludeHeights;

    elementHeights += this._getSum(this.get('exclude'));
    elementHeights += this._getSum(this.get('excludeGlobal'), true);

		if ( this.get('addExcludeExtra1')  ) {
      elementHeights += this._getSum(this.get('excludeExtra1'));
      elementHeights += this._getSum(this.get('excludeExtra1Global'), true);
    }

    var height = Yn.jQueryCache.outerHeight('app',true)-elementHeights;
    this.$().height(height); 

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
