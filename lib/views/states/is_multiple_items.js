Yn.IsMultipleItems = Em.Mixin.create({

  classNameBindings: ['isOneItem', 'isTwoItems', 'isThreeItems', 'isFourItems', 'isFiveItems'],


  init: function() {
		this._super();
	  this._changedContent();
	
	},
	
	_changedContent: Ember.observer(function() {

		var content  = this.get('content');
		if ( content ) {
      var length = content.get('length');

			this.set('isOneItem',  length === 1  );
			this.set('isTwoItems',  length === 2 );
			this.set('isThreeItems',  length === 3 );
			this.set('isFourItems',  length === 4 );
			this.set('isFiveItems',  length === 5 );
		}

	}, 'content')

});

Yn.IsMultipleItemsView = Em.View.extend(Yn.IsMultipleItems, {

});
