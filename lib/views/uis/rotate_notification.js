
Yn.RotateNotificationView = Em.View.extend(Yn.RotateNotification, {

  classNameBindings: ['isInfo', 'isError', 'isSucceed'],

  type: null,
  content: null,

  _typeChanged: Em.observer(function() {

    this.set('isInfo', false);
    this.set('isError', false);
    this.set('isSucceed', false);

    var type = this.get('type');
    if ( !!type ) {

      var classNameBinding = 'is' + type.charAt(0).toUpperCase() + type.slice(1);
      this.set(classNameBinding, true);

    }

  }, 'type'),

	templateName: 'rotate_notification'

});
