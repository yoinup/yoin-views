var get = Em.get;

Yn.SingleBigButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['large-button single'],
	
	action: null,
	
	content: null,

  // set this property to apply FormActionContent mixin
  inputs: null,

  init: function() {

    this._super();

    var inputs = get(this, 'inputs');
    if ( !!inputs ) {
      Yn.FormActionContent.apply(this);
    }


  },
	
	didInsertElement: function() {
    this._super();
    this.$().text( get(this, 'content') );
  }

});

/*{{view Yn.SingleBigButtonView class="is-grey button-text is-small is-font-black" contentI18n="login_twitter"}}*/
