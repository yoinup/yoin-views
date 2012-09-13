
Yn.SocialButton = Em.Mixin.create(Yn.Btap, {

	classNames: ['is-social'],

	classNameBindings: ['isDisabled'],
	isDisabled: false,

	tapOptions: {
    isEnabledBinding: 'isEnabled'
  },

	isEnabled: Em.computed(function() {
		return !this.get('isDisabled');
	}).property('isDisabled'),

	action: null,
	content: null

});
