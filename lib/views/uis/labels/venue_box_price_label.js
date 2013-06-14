Yn.VenueBoxPriceLabelView = Em.View.extend(Yn.Btap, {
  classNameBindings: ['isFree'],
  isFreeBinding: Em.Binding.oneWay('product.isFree'),

  action: 'selectVenueProduct',
  actionContent: Em.computed(function() {

    return { venue: this.get('venue'),
             product: this.get('product') };

  }).property('venue', 'selected'),

  classNames: ['venue-box-price-label'],
  product: null,
  templateName: 'price_label'
});
