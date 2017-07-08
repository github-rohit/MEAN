movieApp.filter('digits', function() {
	return function(input) {
		if (input < 10) { 
			input = '0' + input;
		}

		return input;
	}
});

movieApp.filter('arrayToString', function() {
	return function(array) {
		array = array || [];
		array = array.join(', ');
		return array;
	}
});

movieApp.filter('typeof', function() {
	return function(variable) {
		return typeof variable
	}
});