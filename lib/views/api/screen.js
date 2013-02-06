Yn.ScreenView = Em.View.extend({

  classNames: ['screen'],

  init: function() {

    var elementId = this.get('elementId');
    this.set('templateName', elementId );

    this._super();

  }

});

Yn.DefaultScreenView = Yn.ScreenView.extend(Yn.Context, {

  classNames: ['default'],
	classNameBindings: ['withHeaderAction', 'withoutFooter', 'withoutHeader'],

	withHeaderAction: false,
	withoutFooter: false,
	withoutHeader: false,


	init: function() {

		this._super();

		var self = this;
		this.one('didInsertElement', function () {
			self._applyMinHeightScreenContainer();
		});

	},


	_applyMinHeightScreenContainer: function() {

		//.screen {
		//.screen.with-header-action {
		//.screen.without-footer {
		//.screen.with-header-action.without-footer {
		// TODO: set exactly depending on classNameBindings
		this.$('.screen-container').css('min-height', Yn.jQueryCache.outerHeight('app',true)+'px');

	}

});
