Yn.ConfirmPopupView = Em.View.extend( Yn.Context, {
  classNames:['popup'],
  manager: null,
>>>>>>> 6be8320b7529eb9152d4b715747a1b1eee83764a
  content: null,

  templateName: 'confirm_popup',

  didInsertElement: function() {

    this._super();

    var self = this; 
    Em.AppGestureManager.block(this, function(view) {

      return self === view.get('parentView');
                              
    });


  },

  destroy: function() {

    Em.AppGestureManager.unblock(this);
    this._super();

  }

});
