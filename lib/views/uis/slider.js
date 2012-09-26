
Yn.SliderView = Em.ContainerView.extend({
	classNames: ['slider'],
	childViews: ['child'],
	child: Em.View.extend({
		classNames: ['slider-progress']

	})

});
