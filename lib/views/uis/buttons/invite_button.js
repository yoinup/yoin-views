Yn.InviteButtonView = Em.View.extend(Yn.Btap, {

  classNames: ['invite-button'],
  product: null,
  venue: null,
	action: 'inviteProduct',

	actionContent: Em.computed(function() {

		return { product: this.get('product'), venue: this.get('venue') };

	}).property('product' , 'venue'),

  templateName: 'invite_button'


});
