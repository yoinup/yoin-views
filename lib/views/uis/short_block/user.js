
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


  hasImage: Em.computed(function() {
		return (this.get('type') !== Yn.UserType.PhoneChannel);
  }).property('type'),

	isYoinUser: Em.computed(function() {
		return (this.get('type') === Yn.UserType.appuser);
	}).property('type'),

	isFbUser: Em.computed(function() {
		return (this.get('type') === Yn.UserType.FbChannel);
	}).property('type'),

	isPhoneUser: Em.computed(function() {
		return (this.get('type') === Yn.UserType.PhoneChannel);
	}).property('type'),
	


  templateName: 'user_short_block'

});

Yn.TapUserShortBlockView = Yn.UserShortBlockView.extend(Yn.Btap, {

});