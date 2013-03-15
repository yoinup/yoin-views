var get = Em.get;

Yn.SingleLargeButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['large-button', 'single', 'button-text', 'is-big', 'is-middle'],
	
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

