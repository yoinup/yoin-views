// uses manager property if defined
// otherwise use manager of the parent Context View
Yn.ContextManager = Em.Mixin.create({

	manager: null,

  // TODO: cachning and improvements
  assignContextManager: function() {

    var manager = this.get('manager');

    //if ( !manager ) {
      var context = this.get('contextView');
      if ( !!context ) {
        manager = context.get('manager');
      }
    //}

    if ( Em.typeOf(manager) === "string" ) {
      manager = Em.get(manager);
    }

    this.manager = manager;

  },

  didInsertElement: function() {
    this.assignContextManager();
  }

});
