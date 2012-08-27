Yn.SocialBigButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['large-button is-social'],

	classNameBindings: ['isDisabled'],

	isDisabled: true,
	
	action: null,
	
	content: null,
	
	templateName: 'social_big_button'

});

/*{{view Yn.SocialBigButtonView class="facebook" contentI18n="login_facebook"}}*/


