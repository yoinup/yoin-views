
Yn.PhoneInputView = Yn.InputView.extend({
  inputName:'phone',
  type: 'tel',

  focusIn: function(event) {

    var value = this.get('value');
    if (!value) {
      var prefix;

      // TODO: improve accessing this kind of vars
      if ( Yn.Env.Settings ) {
        prefix = Yn.Env.Settings.phonePrefix;
      }

      this.set('value', prefix || '+34' );
    }
    this._super(event);

  }

});
