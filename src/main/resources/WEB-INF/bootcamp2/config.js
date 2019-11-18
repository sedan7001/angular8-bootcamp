app.config(function($stateProvider, $urlRouterProvider) {
 
});
 
app.run(function($translatePartialLoader) {
	$translatePartialLoader.addPart('/apps/bootcamp2/bootcamp2/locales');
});
 
//# sourceURL=apps/bootcamp2/bootcamp2/config.js