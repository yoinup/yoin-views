//Menu
Yn.MenuTabsButtonView = Em.View.extend( {

	classNames: ['tabs three'],
	
	menuItems: [{'name': 'Me', 'action': 'me'}, {'name': 'Friends', 'action': 'friends'}, {'name': 'Others', 'action': 'others'} ],
	
	templateName: 'menu_tabs_button',
	
	didInsertElement: function() {
		console.log(this.menuItems);
	}

});

//Menu item
Yn.MenuTabButtonView = Em.View.extend(Yn.Btap, {

	classNames: ['tab'],
	
	action: null,
	
	content: null,
	
	didInsertElement: function() {
    this._super();
    this.$().text(this.content); //I18n.t()
  },
	
	bTap: function() {
		//Sent action to state manager
	}

});
