
employeeFactory = {
	filters: {
		nameOnly: {
			subordinates:0,
			contact: 0,
			address: 0
		}
	},
	methods: {
		add: function($scope, $http, person, managerID) {
			$http({method: 'POST', url: '/employees/add', data: person}).success(function(data,status,headers,config) {
				alert('posted successfully');
				employeeFactory.refresh($scope, $http);
				employeeFactory.queries.all($scope, $http);
				if (managerID !== undefined) {
					console.log('has manager')
					employeeFactory.updateParent($scope, $http, managerID , data._id);
				} 
			}).error(function(data, status, headers, config) {

			});
		}, 
		update: function($scope, $http, person) {
			$http({method: 'PUT', url: '/employees/put?id='+person._id, data: person}).success(function(data, status, headers, config) {
			}).error(function(data, status, headers, config) {

			})	
		}, 
		del: function($scope, $http, person) {
			$http({method: 'DELETE', url: '/employees/del?id='+person._id}).success(function(data, status, headers, config) {
			  	var length = $scope.employees.length
			  	while (length--) {
			  		if( $scope.employees[length]._id === person._id) {
			  			$scope.employees.splice(length, 1)
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
				$scope.employees = data;
			}).error(function(data, status, headers, config) {

			});
		},
		filtered: function($scope, $http, filter) {
			$http({method: 'GET', url: '/employees/get/filter', data:filter}).success(function(data,status, headers, config) {
				$scope.employees = data;
			}).error(function(data, status, headers, config) {

			});	
		}, 
		tree: function ($scope, $http) {
			$http({method: 'GET', url: '/employees/get/tree'}).success(function(data, status, headers, config) {
				$scope.employees = data;
			}).error(function(data, status, headers, config) {

			})
		}
	},
	updateParent: function($scope, $http, managerID, childID){
		console.log('updating parent');
		managerID.subordinates.push(childID);
		console.log(managerID)
		$http({method: 'PUT', url: '/employees/put?id='+managerID._id, data:managerID}).success(function(data, status, headers, config) {
			console.log('updated'+managerID.name.first)
		}).error(function(data, status, headers, config) {

		})
	},
	refresh: function($scope) {
		$scope.name = {};
		$scope.address = {};
		$scope.contact =  {};
	},
	submit: function ($scope, $http) {

	},
	addEmployee: function ($scope, $http) {
		employeeFactory.queries.all($scope, $http);
		skillFactory.getSkillNames($scope, $http);
		$scope.submit = function() {
			var person = {},
				managerID = $scope.managerID !== undefined ? $scope.managerID : undefined;
			person.name = $scope.name;
			person.contact = $scope.contact;
			person.address = $scope.address;
			person.skills = $scope.skills;
			person.subordinates = [];
			employeeFactory.methods.add($scope, $http, person, managerID)
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
	}, 
	getEmployeeNames : function ($scope, $http) {
		var filter = employeeFactory.filters.nameOnly;
		employeeFactory.queries.filtered($scope, $http, filter);
	},
	getTree: function($scope, $http) {
		employeeFactory.queries.tree($scope, $http);
		$scope.update = function (employee){
			employeeFactory.methods.update($scope, $http, skill)
		}	
		$scope.delete = function (employee) {
			if(window.confirm("Are you sure you want to delete  "+employee.name.first+" "+employee.name.last+" ?")){
				console.log(employee)
				if(employee.subordinates.length > 0) {
					if(window.confirm("You're ok with the employees who report becoming orphans?")){
						employeeFactory.methods.del($scope, $http, employee );						
					}
				} else {
					employeeFactory.methods.del($scope, $http, employee );
					
				}
				
			}
		}
	}

}