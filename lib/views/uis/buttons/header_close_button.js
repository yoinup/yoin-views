
Yn.HeaderCloseButtonView = Em.View.extend(Yn.Btap, {
	classNames: ['rectangle-button-adaptative', 'header-button', 'l-left', 'is-black', 'button-text', 'is-small', 'is-font-white'],
  action: 'close',

  didInsertElement: function(){
    this._super();
    this.$().text(I18n.t('close'));

  }

});
