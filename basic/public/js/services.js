//SERVICES

movieApp.service('searchQueryServiec', function(){
    this.searchQuery = 'Interstellar';
	this.searchKey = '';
	this.item = '';
    //Justice League
});

movieApp.service('getYears', function(){
	this.years = function() {
		var startingYear = 1900;
		var currentDate = new Date();
		var currentYear = currentDate.getFullYear();
		var yearArray = [];

		for (var i = startingYear; i <= currentYear; i++) {
			yearArray.push(i);
		}

		return yearArray;
	}
});

movieApp.service('textTransformes', function(){
    
	this.capitalize = function(str) {

		if (str) {
			str = str.split(' ');
			str = str.map(function(input){
					return input.charAt(0).toUpperCase() + input.substr(1);
			})
			str = str.join(' ')
		}

		return str || '';
	}
    
});

movieApp.service('movieApi', ['$resource', function($resource){
    
    var searchApi = $resource('/api/series?');
	var saveApi = $resource('/api/save');
	var updateApi = $resource('/api/update');
	var deleteApi = $resource('/api/delete');

	var fieldjson = $resource('/assets/json/field.json', {}, {
		 getJson: {isArray: true}
	});
    
    this.getSearch = function (query, searchKey){			
        return searchApi.get({query: query, searchKey: searchKey});
    };

	this.saveData =  function (data){		
        return saveApi.save(data);
    };

	this.updateData =  function (data){		
        return updateApi.save(data);
    };

	this.deleteData =  function (data){		
        return deleteApi.delete(data);
    };

	this.getFieldJson = function() {
		return fieldjson.getJson();
	};
}]);