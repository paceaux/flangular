function getContactList($scope, $http) {
	$http({method: 'GET', url: '/employees/get'}).
	success(function(data, status, headers, config) {
		$scope.results = data;
	}).
	error(function(data, status, headers, config) {
	});
	$scope.delete = function (person) {
		$http({method: 'DELETE', url: '/employees/del?id='+person._id}).success(function(data, status, headers, config) {
		  	var length = $scope.results.length;
		  	while (length--) {
		  		if($scope.results[length]._id === person._id) {
		  			$scope.results.splice(length, 1);
		  		}
		  	}
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });		
	}
	$scope.update = function (person) {
		$http({method: 'PUT', url: '/employees/put?id='+person._id, data: person}).
		success(function(data, status, headers, config) {
			console.log('updated')
		}).error(function(data, status, headers, config) {

		})		
	}
}

