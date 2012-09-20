Yn.EmptyView = Em.View.extend( {

	classNames: ['empty-view'],

	content: null,

	messageAction: null,

	textAction: null,

	templateName: 'empty',

	includeAction: Em.computed(function() {
		return (!!this.get('messageAction') && !!this.get('textAction'));
	}).property('messageAction', 'textAction'),

});

//{{view Yn.EmptyView messageText="" messageAction="" textAction="" }}