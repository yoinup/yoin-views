
Yn.UserType = {
	appuser: 'appuser',
	FbChannel: 'FbChannel',
	PhoneChannel: 'PhoneChannel'
};

Yn.UserShortBlockView = Em.View.extend({

  classNames: ['short-block'],

  hasInviteButton: false,

  hasExt: Em.computed(function() {
    return this.get('hasInviteButton');
  }).property('hasInviteButton'),

  content: null,

	imagetype: null,

	showCity: true,
	showStatus: true,

	//Default type
	type: Yn.UserType.appuser,

	
	fbName: null,
	fbId: null,
	phoneNumber: null,
	phoneName: null,

  userName: Em.computed(function() {

     if ( this.get('isFbUser') ) {
       return this.get('fbName');
     } else {

       var content = this.get('content');
       if (content ) {
         return content.get('suspended') ? I18n.t('suspended') : content.get('name');
       }

     }

  }).property('isFbUser', 'content', 'fbName'),

  contentPhoto: Em.computed(function() {

    return this.get('isFbUser') ? this.get('fbId') : this.get('content') ;

  }).property('isFbUser'),

	isFbUser: Em.computed(function() {
		return (this.get('type') === Yn.UserType.FbChannel);
	}).property('type'),


  templateName: 'user_short_block'

});

Yn.TapUserShortBlockView = Yn.UserShortBlockView.extend(Yn.Btap, {

});
