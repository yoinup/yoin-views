Yn.AdaptativeButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['rectangle-button-adaptative'],
	
	action: null,
	
	content: null,
	
	didInsertElement: function() {
    this._super();
    this.$().text(this.content);
  }

});

/*{{view Yn.AdaptativeButtonView class="is-grey button-text is-small is-font-black" contentI18n="login_twitter"}}*/
