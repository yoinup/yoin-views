// uses manager property if defined
// otherwise use manager of the parent Context View
Yn.ContextManager = Em.Mixin.create({

	manager: null,
  gestureDelegate: null,

  // TODO: cachning and improvements
  assignContextManager: function() {

    var manager = this.get('manager'),
        gestureDelegate = this.get('gestureDelegate');

    //if ( !manager ) {
    var context = this.get('contextView');
    if ( !!context ) {
      manager = context.get('manager');
      gestureDelegate = context.get('gestureDelegate');
    }
    //}

    if ( Em.typeOf(manager) === "string" ) {
      manager = Em.get(manager);
    }

    if ( Em.typeOf(gestureDelegate) === "string" ) {
      gestureDelegate = Em.get(gestureDelegate);
    }

    this.manager = manager;
    this.gestureDelegate = gestureDelegate;

  },

  applyGestureDelegate: function() {
    if (!!this.gestureDelegate){
      var self = this;
      this.get('eventManager.gestures').forEach(function(gesture) {
        gesture.set('delegate', self.gestureDelegate); 
      });
    }
  },

  didInsertElement: function() {
    this._super();
    this.assignContextManager();
    this.applyGestureDelegate();
  }

});
