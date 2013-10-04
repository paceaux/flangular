employeeFactory = {
	employee: function (name, contact, address) {
		this.name = name;
		this.contact = contact;
		this.address = address;
	}
}
employee = {
	init: function ($scope, $http) {

	}, 
	addEmployee: function ($scope, $http) {

	},
	reset: function ($scope, $http) {

	}, 
	submit: function ($scope, $http) {

	}
}
function addEmployee($scope, $http) {
	 function skillList() {
	 	console.log('im skill list')
	 	var filter = {
	 		children: 0,
	 		id: 0
	 	};
		$http({method: 'GET', url: '/skills/get/filter', data:filter}).success(function(data,status, headers, config) {
			$scope.skills = data;
		}).error(function(data, status, headers, config) {

		});
	}
	skillList();
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
		person.skills = $scope.skills;
		console.log (person.skills);
		$http({method: 'POST', url: '/employees/add', data: person}).success(function(data,status,headers,config) {
			alert('posted successfully');
			$scope.reset();
		}).error(function(data, status, headers, config) {

		});
	}
}