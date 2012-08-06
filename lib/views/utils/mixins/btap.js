Yn.Btap = Ember.Mixin.create( Yn.ContextManager, {

	action: null,
	actionContent: null,

	bTap: function() {

		this.manager.send( this.get('action'), this.get('actionContent') );

  },

  tapEnd: function(recognizer) {
    this.bTap();
  }

});
