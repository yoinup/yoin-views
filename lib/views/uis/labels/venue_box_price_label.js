Yn.VenueBoxPriceLabelView = Em.View.extend({
  classNameBindings: ['isFree'],
  isFreeBinding: Em.Binding.oneWay('product.isFree'),
  classNames: ['venue-box-price-label'],
  product: null,
  templateName: 'price_label'
});
