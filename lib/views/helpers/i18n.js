// i18n helper for Handlebars
Ember.Handlebars.registerHelper('I18n', function(str){
  //return (I18n != undefined) ? I18n.t(str) : str;
  return I18n.t(str);
});
