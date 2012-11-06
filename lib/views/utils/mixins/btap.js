Yn.Btap = Ember.Mixin.create( Yn.Touch, Yn.IsPending, Yn.ContextManager, {

	action: null,
	actionContent: null,

	bTap: function() {
    this.triggerEvent( this.get('action'), this.get('actionContent') );
  },

  tapEnd: function(recognizer) {
    this.bTap();
  }


});
