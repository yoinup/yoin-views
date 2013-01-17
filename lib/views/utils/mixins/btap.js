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

Yn.NonSimultaneouslyBtap = Ember.Mixin.create( Yn.Touch, Yn.IsPending, Yn.ContextManager, {

  tapOptions: {
    simultaneously: false
  },
	action: null,
	actionContent: null,

  tapEnd: function(recognizer) {
    this.bTap();
  },

	bTap: function() {
    this._super();
    App.get('gestureManager').unblock(this);
  }

});
