Yn.InviteButtonView = Em.View.extend(Yn.Btap, {

  classNameBindings: ['isFree'],
  classNames: ['invite-button'],
  product: null,
  venue: null,
	action: 'inviteProduct',

	actionContent: Em.computed(function() {

		return { product: this.get('product'), venue: this.get('venue') };

	}).property('product' , 'venue'),

	isFreeBinding: Em.Binding.oneWay('product.isFree'),

  templateName: 'invite_button'

});
