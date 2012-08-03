
Yn.ConfirmPopupView = Em.ContainerView.extend({

  childViews: ['child'],
  classNames: ['confirm-popup'],
  classNameBindings: ['hidden'],

  hidden:true,

  headerText:null,
  messageText:null,
  cancelText: null,
  okText: null,

  cancel: Ember.K,
  ok: Ember.K,

  transitionEnd: function() {

    if ( this.get('hidden') ) {
      this.destroy();
    }

  },

  didInsertElement: function() {
    this._super();

    var self = this;

    var button1 = self.getPath('child.footer.cancel');
    var button2 = self.getPath('child.footer.ok');

    Em.AppGestureManager.block(this, function(view) {
      return view === button1 || view === button2;
    });

    //TODO: because childs has not still been inserted in DOM
    Em.run.next(function(){

      var height = self.$().outerHeight();
      var width = self.$().outerWidth();
      self.$().css({'margin-top': (-1/2)*height+'px','margin-left':(-1/2)*width+'px'});
      self.set('hidden', false);

    });

  },

  hideAndDestroy: function() {

    this.set('hidden', true);
    Em.AppGestureManager.unblock(this);

  },


  child: Em.ContainerView.extend({

    classNames: ['cp-container'],
    childViews: ['header', 'message', 'footer'],

    header: Yn.UnboundView.extend({

      classNames: ['cp-header'],

      item: Em.computed( function() {
        return this.getPath('parentView.parentView.headerText');
      }).property()

    }),

    message: Yn.UnboundView.extend({

      classNames: ['cp-message'],

      item: Em.computed( function() {
        return this.getPath('parentView.parentView.messageText');
      }).property()


    }),

    footer: Em.ContainerView.extend({

      classNames: ['cp-footer'],
      childViews: ['cancel', 'ok'],

      cancel: Yn.UnboundView.extend(Yn.Btap, {

        classNames: ['cp-cancel', 'cp-button'],


        didInsertElement: function() {
          this.rootView = this.getPath('parentView.parentView.parentView');
          this._super();
        },


        item: Em.computed( function() {
          return this.rootView.get('cancelText');
        }).property(),

        bTap: function() {

          this.rootView.cancel();

        }

      }),

      ok: Yn.UnboundView.extend(Yn.Btap, {

        classNames: ['cp-ok', 'cp-button'],

        didInsertElement: function() {
          this.rootView = this.getPath('parentView.parentView.parentView');
          this._super();
        },

        item: Em.computed( function() {
          return this.rootView.get('okText');
        }).property(),

        bTap: function() {

          this.rootView.ok();

        }

      })

    })
  })

});

