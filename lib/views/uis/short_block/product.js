Yn.ProductShortBlockView = Em.View.extend(Yn.Btap, {
  
  classNameBindings: ['hasExt'],
  classNames: ['short-block'],

  content: null,
  venue: null,

  hasPrice: false,

  hasExt: Em.computed(function() {
    return this.get('hasPrice');
  }).property('hasPrice'),

	imagetype: null,

  templateName: 'product_short_block'

});
