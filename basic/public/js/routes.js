//ROUTES
movieApp.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider){
    $locationProvider.hashPrefix('');
    
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://imdbapi*.poromenos.org/**js**',
        'http://localhost*:3000/api/series**'
    ]);
    
    $routeProvider
        .when('/', {
            templateUrl: '/assets/pages/search.html',
            controller: 'searchQueryController'
        })
        .when('/searchResults', {
            templateUrl: '/assets/pages/searchResults.html',
            controller: 'searchResultController'
        })
        .when('/new', {
            templateUrl: '/assets/pages/new.html',
            controller: 'createItemController'
        })
        .when('/edit', {
            templateUrl: '/assets/pages/new.html',
            controller: 'createItemController'
        })
}]);