Yn.SocialSmallButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['rectangle-button', 'is-social'],

	classNameBindings: ['isDisabled'],

	isDisabled: false,
	
	action: null,
	
	content: null,
	
	templateName: 'social_small_button'

});

/*{{view Yn.SocialSmallButtonView class="twitter" contentI18n="twitter"}}*/