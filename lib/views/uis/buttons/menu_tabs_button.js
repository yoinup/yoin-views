//Menu
Yn.MenuTabsButtonView = Em.View.extend(Yn.IsMultipleItems, {

	classNames: ['menu-tabs'],
	
	content: null,
	selected: null,
	
	eventName: 'tabFire',
	
	templateName: 'menu_tabs_button',
	
	isSingleButton: Em.computed(function() {
		
		return this.get('content').get('length') === 1;
		
	}).property('content'),
	
	firstButton: Em.computed(function() {
	
    return this.get('content').get('firstObject');

	}).property('content'),
	
	lastButton: Em.computed(function() {
	
		return this.get('content').get('lastObject');

	}).property('content'),
	
	middleButtons: Em.computed(function() {
		
		var result = Em.A([]),
				menuItems = this.get('content'),
				length = menuItems.get('length'); 
		
		menuItems.forEach( function (item, index) {
			
			if ( (index !== 0) && (index !== length-1 ) ) {
				result.pushObject(item);
			}
			
		});
		
		return result;
		
	}).property('content')

});


//Menu item
Yn.MenuTabButtonView = Em.View.extend(Yn.Btap, Yn.IsSelected, {

	classNames: ['menu-tab'],
	
	action: null,
	actionContent:null,
	
	content: null,
	
	selected: null,
	
	didInsertElement: function() {
    this._super();
    this.set('action', this.get('parentView.eventName'));
    this.$().text(I18n.t(this.content));
  }

});
