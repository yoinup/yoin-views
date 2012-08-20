Yn.AdaptativeButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['rectangle-button-adaptative'],
	
	action: null,
	
	content: null,
	
	didInsertElement: function() {
    this._super();
    this.$().text(I18n.t(this.content));
  }

});

/*{{view Yn.AdaptativeButtonView class="is-grey button-text is-small is-font-black" content="login_twitter"}}*/
