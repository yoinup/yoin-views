Yn.CarouselCirclesView = Em.CollectionView.extend( Yn.IsMultipleItems, {

  classNames: ['carousel-circles'],
	selected: null,
	content: null,

	isVisible: Em.computed(function(){

		return ( this.getPath('content.length') > 1 );

	}).property('content.length'),

  itemViewClass: Em.View.extend(Yn.IsSelected, {

    classNames: ['carousel-circle'],
		selectedBinding: Em.Binding.oneWay('parentView.selected')

  })

});

