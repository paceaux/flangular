employeeFactory = {
	employee: function (name, contact, address) {
		this.name = name;
		this.contact = contact;
		this.address = address;
	}
}
function addEmployee($scope, $http) {
	$scope.reset = function () {
		$scope.name = {};
		$scope.address = {};
		$scope.contact =  {};
	}
	$scope.submit = function() {
		var person = {};
		person.name = $scope.name;
		person.contact = $scope.contact;
		person.address = $scope.address;
		$http({method: 'POST', url: '/employees/add', data: person}).success(function(data,status,headers,config) {
			alert('posted successfully');
			$scope.reset();
		}).error(function(data, status, headers, config) {

		});
	}
}