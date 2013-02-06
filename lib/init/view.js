// TODO: check that is cacheable
Em.View.reopen({

	contextView: Em.computed(function() {

		return this.nearestOfType(Yn.Context);


  }).property(),

  uiManager: Em.computed(function() {
    return Em.get('App.uiManager');
  }).property(),


  triggerEvent: function(eventName, context) {
    this.get('uiManager').triggerEvent(this, eventName, context);
  }

});
