//DIRECTIVES

movieApp.directive('searchResult', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/searchResults.html',
        replace: true,
        scope: {
            lists: '=',
            searchQuery: '@',
            editItem: '&',
            deleteItem: '&'
        }
    }
});

movieApp.directive('listItem', function() {
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/listItem.html',
        replace: true
    }
});

movieApp.directive('noRecord', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/norecord.html',
        replace: true,
        scope: {
            searchQuery: '@'
        }
    }
});

movieApp.directive('searchError', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/error.html',
        replace: true,
    }
});

// Form 

movieApp.directive('formElements', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/form.html',
        replace: true,
        scope: {
            formFields: '=',
            formData: '=',
            removeElements: '&'
        }
    }
});

movieApp.directive('typeInput', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/input.html',
        replace: true
    }
});

movieApp.directive('typeSelect', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/select.html',
        replace: true
    }
});

movieApp.directive('typeTextarea', function(){
    return {
        restrict: 'E',
        templateUrl: '/assets/directive/textarea.html',
        replace: true
    }
});

movieApp.directive("dropdown", function($rootScope) {
	return {
		restrict: "E",
		templateUrl: "/assets/directive/dropdown.html",
        replace: true,
		scope: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@",
            value: "@",
            searchKey: '='
		},
		link: function(scope) {
			scope.listVisible = false;
			scope.isPlaceholder = true;

            if ((scope.value || scope.value == 0) && scope.list) {
                scope.selected = scope.list[scope.value];
            }

			scope.select = function(item) {
				scope.isPlaceholder = false;
				scope.selected = item;
			};

			scope.isSelected = function(item) {
				return item[scope.property] === scope.selected[scope.property];
			};

			scope.show = function() {
				scope.listVisible = true;
			};

			$rootScope.$on("documentClicked", function(inner, target) {
				if (!angular.element(target).hasClass("clicked") && !angular.element(target).parent().hasClass("clicked")) {
                    scope.$apply(function() {
                        scope.listVisible = false;
                    });                       
                }
			});

			scope.$watch("selected", function(value) {
				scope.isPlaceholder = scope.selected[scope.property] === undefined;
				scope.display = scope.selected[scope.property];
                //scope.searchKey = scope.selected['name'];
			});
		}
	}
});
