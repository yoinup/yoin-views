
// change name for placeholder
Yn.FormItemInputView = Em.ContainerView.extend({
  tagName: 'p',
  classNames: ['form_item_input'],
  childViews: ['input'],

  name: null,
  type: null,
	value: null,
  inputName: null,
	//valueBinding: 'input.value',

  label: Yn.UnboundView.extend({
      classNames: ['form_label'],
      tagName: 'label',
      itemBinding: Em.Binding.oneWay('parentView.name')
  }),

  input: Em.View.extend( Yn.Input, {
    classNames: ['form_input'],

    valueBinding: Em.Binding.oneWay('parentView.value'),
    attributeBindings: ['type'],
		init: function() {
			this._super();

      var parentView = this.get('parentView');
			this.set('placeholder', parentView.get('name') );
			this.set('type', parentView.get('type') );

		}

  })
});
