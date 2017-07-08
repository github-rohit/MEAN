//Controllers

movieApp.controller('searchQueryController', ['$scope', '$location', 'searchQueryServiec', 'movieApi', function($scope, $location, searchQueryServiec, movieApi){
	$scope.searchQuery = searchQueryServiec.searchQuery;
	$scope.searchBy = '';

	$scope.$watch('searchQuery', function() {
		searchQueryServiec.searchQuery = $scope.searchQuery;
	});

	$scope.$watch('searchBy', function(){
		searchQueryServiec.searchKey = $scope.searchBy['name'];
	});

	$scope.submit = function(){
		$location.path('/searchResults');
	}
	
	$scope.formFields = movieApi.getFieldJson();
}]);

movieApp.controller('searchResultController', ['$scope', '$location', 'searchQueryServiec', 'movieApi', 'textTransformes', function($scope, $location, searchQueryServiec, movieApi, textTransformes) {
	var query = '';
	$scope.deleteSucc = '';

	$scope.searchQuery = searchQueryServiec.searchQuery || localStorage.getItem('movieapp-search-query');
	$scope.searchKey = searchQueryServiec.searchKey;

	localStorage.setItem('movieapp-search-query', $scope.searchQuery);

	$scope.searchResult = movieApi.getSearch({
		query: $scope.searchQuery,
		searchKey: $scope.searchKey
	});

	$scope.editItem = function(item) {
		searchQueryServiec.item = item;
		$location.path('/edit');
	};

	$scope.deleteItem = function(item) {
		$scope.deleteSucc = movieApi.deleteData(item);
	};
}]);

movieApp.controller('createItemController', ['$scope', '$location', 'movieApi', 'searchQueryServiec', 'getYears', function($scope, $location, movieApi, searchQueryServiec, getYears){
	var location = $location.path();
	$scope.formData = searchQueryServiec.item || {};
	$scope.isediting = !!searchQueryServiec.item;

	if (!$scope.isediting && location === '/edit') {
		$scope.formData = {};
		$scope.formData.error = true;
		return false;
	} 

	$scope.formFields = movieApi.getFieldJson();

	$scope.onfocus = function($event){
		angular.element($event.target).parent().addClass('form-toggled');
	};

 	$scope.onfocusOut = function($event){
		angular.element($event.target).parent().removeClass('form-toggled');
	};  

	$scope.submit = function() {
		var fn = $scope.isediting ? 'updateData' : 'saveData';

		$scope.response = movieApi[fn]($scope.formData);
	};	

	$scope.getYears = function() {
		return getYears.years();
	};

	$scope.removeElements = function(name) {
		var removeElements = ['title', 'release_year'];
		return $scope.isediting ? removeElements.indexOf(name) === -1 : true;
	};
}]);