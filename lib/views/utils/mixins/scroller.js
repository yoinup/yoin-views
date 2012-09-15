
// TODO: separate DynamicView Mixin
Yn.Scroller = Ember.Mixin.create({
	classNames: ['scroller'],

	exclude: null,



	didInsertElement: function() {

		this._super();

		var excludeHeights = this.get('exclude');

		if ( !!excludeHeights ) {

			var elementHeights = 0;
			excludeHeights.split(' ').forEach(function(item) {

				elementHeights += Yn.jQueryCache.outerHeight(item,true);

			});


			var height = Yn.jQueryCache.outerHeight('app',true)-elementHeights;
			this.$().height(height); 
		}

	}

});
