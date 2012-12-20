Yn.PriceLabelView = Em.View.extend({
  classNameBindings: ['isFree'],
  isFreeBinding: Em.Binding.oneWay('product.isFree'),
  classNames: ['price-label'],
  product: null,
  templateName: 'price_label'
});
