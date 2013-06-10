
Yn.UserType = {
	appuser: 'appuser',
	FbChannel: 'FbChannel',
	PhoneChannel: 'PhoneChannel'
};

Yn.BaseUserShortBlockView = Em.View.extend({

  classNames: ['short-block'],

  content: null,
	imagetype: null,

  templateName: 'user_short_block'

/*
	//Default type
	type: Yn.UserType.appuser,

	
	fbName: null,
	fbId: null,

  userName: Em.computed(function() {

     if ( this.get('isFBUser') ) {
       return this.get('fbName');
     } else {

       var content = this.get('content');
       if (content ) {
         return content.get('suspended') ? I18n.t('suspended') : content.get('name');
       }

     }

  }).property('isFBUser', 'content', 'fbName'),

  contentPhoto: Em.computed(function() {

    return this.get('isFBUser') ? this.get('fbId') : this.get('content');

  }).property('isFBUser'),

	isFBUser: Em.computed(function() {
		return (this.get('type') === Yn.UserType.FbChannel);
	}).property('type'),
  */



});



Yn.UnregisteredUserShortBlockView = Em.View.extend({

  classNames: ['short-block'],

  invitation: null,
  templateName: 'unregistered_user_short_block'
});

// this view are optimized because FB users
Yn.UserShortBlockView = Yn.BaseUserShortBlockView.extend({

  templateName: 'user_short_block'

});


Yn.TapUserShortBlockView = Yn.UserShortBlockView.extend(Yn.Btap, {

});

Yn.InviteUserShortBlockView = Yn.BaseUserShortBlockView.extend({

  templateName: 'invite_user_short_block'

});
