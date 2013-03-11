Yn.SeeMoreButtonView = Em.View.extend(Yn.Btap, {

  classNames: ['control', 'right-column', 'space-nowrap', 'has-tap'],
  content: null,
  action: 'seeMore',
  actionContentBinding: Em.Binding.oneWay('content'),

  templateName: 'see_more_button'

});
