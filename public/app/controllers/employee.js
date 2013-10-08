
employeeFactory = {
	filters: {

	},
	methods: {
		add: function($scope, $http, person) {
			$http({method: 'POST', url: '/employees/add', data: person}).success(function(data,status,headers,config) {
				alert('posted successfully');
				employeeFactory.refresh($scope);
			}).error(function(data, status, headers, config) {

			});
		}, 
		update: function($scope, $http, person) {
			$http({method: 'PUT', url: '/employees/put?id='+person._id, data: person}).success(function(data, status, headers, config) {
				console.log('updated')
			}).error(function(data, status, headers, config) {

			})	
		}, 
		del: function($scope, $http, person) {
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
	},
	queries: {
		all: function ($scope, $http) {
			$http({method: 'GET', url: '/employees/get'}).success(function(data, status, headers, config) {
				$scope.results = data;
			}).
			error(function(data, status, headers, config) {

			});
		},
		filtered: function($scope, $http, filter) {

		}
	},
	refresh: function($scope) {
		$scope.name = {};
		$scope.address = {};
		$scope.contact =  {};
	},
	submit: function ($scope, $http) {

	},
	addEmployee: function ($scope, $http) {
		skillFactory.getSkillNames($scope, $http);
		$scope.submit = function() {
			var person = {};
			person.name = $scope.name;
			person.contact = $scope.contact;
			person.address = $scope.address;
			person.skills = $scope.skills;
			console.log (person.skills);
			employeeFactory.methods.add($scope, $http, person)
		}
	}, 
	getContactList: function ($scope, $http) {
		employeeFactory.queries.all($scope, $http)
		$scope.delete = function (person){
			employeeFactory.methods.del($scope, $http, person);
		}
		$scope.update = function (person) {
			employeeFactory.methods.update($scope, $http, person);
		}
	}

}