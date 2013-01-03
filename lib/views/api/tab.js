
var get = Ember.get , set = Ember.set;



Yn.TabPane = Ember.Mixin.create({

  classNameBindings: ['isSelected'],
  classNames: ['tab-pane']

});

// TabMainView logic is not required,
// the view brings pane behavior based on currentTabView binding property
Yn.IndependentTabPane = Ember.Mixin.create(Yn.TabPane, {

  currentTabView: null,
  isSelected: Em.computed(function() {

    return this.get('viewName') === this.get('currentTabView');

  }).property('viewName', 'currentTabView')


});

Yn.IndependentTabPaneView = Em.View.extend( Yn.IndependentTabPane, {

});

Yn.TabMainView = Em.View.extend({

  classNames: ['tab-main'],

  panes: null,
  currentTabView: null,

  init: function() {
    this._super();
    this.set('panes', {});
  },

  createChildView: function(view, attrs) {

    var result = this._super(view, attrs);

    if ( !Yn.TabPane.detect(result)  ) {
      Em.mixin(result, Yn.TabPane);
    }
    return result;

  },

  currentPane: Ember.computed(function() {

    var currentTabView = this.get('currentTabView');
    var panes = this.get( 'panes');
    return panes[currentTabView];

  }).property('currentTabView'),

  willInsertElement: function() {

    this._super(); 
    var panes = get( this, 'panes');
    var viewName, childViews, len, view, idx;

    childViews = get(this, '_childViews');
    len = get(childViews, 'length');


    for(idx = 0; idx < len; idx++) {
      view = childViews[idx];
      viewName = get(view, 'viewName');   

      if ( Yn.TabPane.detect(view)  ) {
        panes[viewName] = view;     
      }

    }

  },

  didInsertElement: function() {

    this._super(); 
    this.observesCurrentView();
  },

  observesBeforeCurrentView: function() {

    this.show(false);

  }.observesBefore('currentTabView'),

  observesCurrentView: function() {

    this.show(true);

  }.observes('currentTabView'), 
	
	// TODO: report feedback to emberjs community, this is a ugly hack
  appendTabPaneView: function(view) {

    Em.assert('appending a not Yn.TabPane', Yn.TabPane.detect(view) );

    view.set('_parentView', this);
    this.get('_childViews').pushObject(view);

  },

  show: function(visible, pane) {

    if ( pane === undefined ) {

      var currentTabView = get(this, 'currentTabView');
      var panes = get( this, 'panes');
      pane = panes[currentTabView];

      //console.log('currentTabView '+currentTabView);
    }


    if ( pane ) {

      // can be done via computed property  & observers
      // var selected = (visible) ? true : false;
      // with z-index var index = (visible)? "100" : "1";

      //console.log('viewName '+pane['viewName']);
      pane.set('isSelected', visible);			

    } 

  }

});


Yn.TabOption = Em.Mixin.create( Yn.Btap, {

  tab: null,
  currentTabView: null,

  classNameBindings: ['isSelected'],
  isSelected: Em.computed(function(){

		return this.get('currentTabView') === this.get('tab');

  }).property('currentTabView', 'tab'),

  action: Em.computed(function() {

    var tab = this.get('tab');
    var value = tab.charAt(0).toUpperCase() + tab.slice(1);
    return 'goTo'+value;

  }).property()

});

Yn.IconTabOptionView = Em.View.extend( Yn.Icon, Yn.TabOption, {

});

