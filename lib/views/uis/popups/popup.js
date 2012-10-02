
Yn.PopupView = Em.View.extend(Yn.Context, {
  classNames:['popup'],
  manager: null,

  content: null,

  templateName: 'popup',

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
