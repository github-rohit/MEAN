var movieApp = angular.module('movieApp', ['ngRoute', 'ngResource', 'ngSanitize']);
movieApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

movieApp.run(function($rootScope) {
	angular.element(document).on("click", function(e) {
		$rootScope.$broadcast("documentClicked", angular.element(e.target));
	});
});