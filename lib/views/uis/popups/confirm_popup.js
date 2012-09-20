
Yn.ConfirmPopupView = Em.View.extend(Yn.Btap, {
  classNames:['alert', 'popup'],

  content: null,

  templateName: 'confirm_popup',

  gestureDelegate: null,

  didInsertElement: function() {

    var self = this; 

    var manager = this.get('manager');
    if (Em.typeOf(manager) === "string") {

      manager = Em.getPath(manager);
      this.set('manager', manager);

    }

    /*Em.run.next(function() { 
      self.get('gestureDelegate').set('confirmPopUpView', self );
    });*/

  },

  /*bTap: function() {
    this.get('manager').send('tap');
  },*/

  destroy: function() {

    //this.get('gestureDelegate').set('confirmPopUpView', null );
    this._super();

  }

});
