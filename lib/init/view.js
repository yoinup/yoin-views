// TODO: check that is cacheable
Em.View.reopen({

	contextView: Em.computed(function() {
    var view = this,
        is = false;

    while ( !is && view) {
      view = view.get('parentView');
      is = Yn.Context.detect(view);
    }

		return (is) ? view : undefined;
  }).property(),

  uiManager: Em.computed(function() {
    return Em.get('App.uiManager');
  }).property(),


  triggerEvent: function(eventName, context) {
    this.get('uiManager').triggerEvent(this, eventName, context);
  }

});
