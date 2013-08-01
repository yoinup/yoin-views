Yn.IsOneItemHidden = Em.Mixin.create({

	classNameBindings: ['isHidden'],
	content: null,

	isHidden: Em.computed(function() {

		return this.get('content.length') === 1;

	}).property('content.length')


});

Yn.IsOneItemHiddenView = Em.View.extend(Yn.IsOneItemHidden, {

});
