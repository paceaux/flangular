
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

};//name object
//
window.personFactory = {
	fullName: function (first, last) {
		this.first = first;
		this.last = last;
		this.fullName = function () {
			var f = this.first + " " + this.last;
			return f;
		}		
	},
	contact: function (email, phone,skype) {
		this.email = email;
		this.phone = phone;
		this.skype = skype;
		this.getPhone = function () {
			return this.phone;
		};		
	},
	person: function (first, last, email, phone, skype) {
		this.name = new personFactory.fullName(first, last);
		this.contact = new personFactory.contact(email, phone, skype);		
	}
}
//fake data
var frank = new personFactory.person("Frank", "Taylor", "frank@tahzoo.com", "214 234 6496", "paceaux"),
	alex = new personFactory.person("Alex", "Klock", "Alex@tahzoo.com", "something", "alex.klock"),
	joey = new personFactory.person("Joey", "Shirley", "joey@tahzoo.com", "something", "illfittingshoes"),
	jason = new personFactory.person("Jason", "Kaufman", "jason@tahzoo.com", "something", "jason.Kaufman");

function people($scope) {
	$scope.people = [
		frank, joey, alex, jason
	];
	$scope.people = $scope.people
}

;skillFactory = {
	filters: {
		nameOnly: {
			children:0,
			id: 0
		}
	},
	skill : function(name, id, description, parentID, children){
		this.name = name;
		this.id = id;
		this.description = description;
		this.parentID = parentID;
		this.children = [];
	},
	relative : function(name, id){
		this.name = name;
		this._id = id;
	},
	methods: {
		add: function($scope, $http, skill, parentID) {
			$http({method: 'POST', url: '/skills/add', data: skill}).success(function(data,status,headers,config) {
				skillFactory.refresh($scope, $http)
				skillFactory.queries.all($scope, $http);
				if (parentID !== undefined){
					skillFactory.updateParent($scope, $http, parentID, data._id);
				}
			}).error(function(data, status, headers, config) {

			});
		},
		update: function($scope, $http, skill){
			$http({method: 'PUT', url: '/skills/put?id='+skill._id, data:skill}).success(function(data, status, headers, config) {
				console.log('updated')
			}).error(function(data, status, headers, config) {

			})
		},
		del: function($scope, $http, skill){
			$http({method: 'DELETE', url: '/skills/del?id='+skill._id}).success(function(data, status, headers, config) {
				var length = $scope.skills.length;
				while (length--){
					if ($scope.skills[length]._id === skill._id) {
						$scope.skills.splice(length, 1);
					}
				}
			}).error(function(data, status, headers, config) {

			})

		}
	},
	queries: {
		all: function($scope, $http) {
			$http({method: 'GET', url: '/skills/get'}).success(function(data,status, headers, config) {
				$scope.parentIDs = data;
				$scope.skills = data;
			}).error(function(data, status, headers, config) {

			})			
		}, 
		filtered: function($scope, $http, filter) {
			$http({method: 'GET', url: '/skills/get/filter', data:filter}).success(function(data,status, headers, config) {
				$scope.skills = data;
			}).error(function(data, status, headers, config) {

			});			
		}, 
		tree: function($scope, $http) {
			$http({method: 'GET', url: '/skills/get/tree'}).success(function(data, status, headers, config) {
				$scope.skills = data
			}).error(function(data, status, headers, config) {

			})
		}
	},
	updateParent: function($scope, $http, parentID, childID) {
		parentID.children.push(childID);
		$http({method: 'PUT', url: '/skills/put?id='+parentID._id, data:parentID}).success(function(data, status, headers, config) {
			console.log('updated')
		}).error(function(data, status, headers, config) {

		})
	},
	refresh: function($scope, $http){
		$scope.skill = {};
/*		$scope.skill.name = '';
		$scope.skill.id = '';
		$scope.skill.parentID =  '';*/
		skillFactory.queries.all($scope, $http)
	},
	getSkillNames: function($scope, $http) {
		var filter = skillFactory.filters.nameOnly;
		skillFactory.queries.filtered($scope, $http, filter);
	},
	getSkills: function($scope, $http) {
		skillFactory.queries.all($scope, $http);
		$scope.update = function (skill){
			skillFactory.methods.update($scope, $http, skill)
		}	
		$scope.delete = function (skill) {
			skillFactory.methods.del($scope, $http, skill );
		}		
	},
	getTree: function($scope, $http) {
		skillFactory.queries.tree($scope, $http);
		$scope.hide = function (skill) {

		}
		$scope.update = function (skill){
			skillFactory.methods.update($scope, $http, skill)
		}	
		$scope.delete = function (skill) {
			if(window.confirm("Are you sure you want to delete the "+skill.name+" skill ?")){
				if(skill.childSkills.length > 0) {
					if(window.confirm("You're ok with the child subskills becoming orphans?")){
						skillFactory.methods.del($scope, $http, skill );						
					}
				} else {
					skillFactory.methods.del($scope, $http, skill );
					
				}
				
			}
		}			
	},
	addSkill: function ($scope, $http) {
		skillFactory.queries.all($scope, $http);
		$scope.submit = function() {
			var id = $scope.skill.id,
				name = $scope.skill.name,
				description = $scope.skill.description,
				parentID = $scope.skill.parentID !== undefined ? $scope.skill.parentID : undefined;
			var skill = new skillFactory.skill(name, id, description);
			skillFactory.methods.add($scope, $http, skill, parentID)
		}	
	}
};website = {
	siteTitle : 'assets/img/logo-white.png',
	subHead: "Tahzoo Demo",
	page: function(title, url) {
		this.title = title;
		this.url = url;
	},
	globalHeader: function($scope) {
		$scope.siteTitle = website.siteTitle;
		$scope.subHead = website.subHead;
	}, 
	navigation: function($scope) {
		var index = new website.page('Home', 'tasks.html'),
			add = new website.page("Add Employee", 'add-employee.html'),
			results = new website.page('Employee Contact', 'results.html'),
			orgChart = new website.page("Org chart", "org-chart.html"),
			contact = new website.page('Employee Addresses', 'address-list.html'),
			addSkill = new website.page('Add Skill', 'add-skill.html'),
			skillList = new website.page('Skill List', 'skill-list.html'),
			skillTree = new website.page('Skill Tree', 'skill-tree.html'),
			three = new website.page('Three Col', 'layout.html'),
			one = new website.page('One Column', 'one-col.html'), 
			two = new website.page("Two Column", 'two-col.html');	
		$scope.skillNav = [skillTree, addSkill, skillList];
		$scope.employeeNav = [add, orgChart, results, contact];
		$scope.topNav = $scope.skillNav.concat($scope.employeeNav);

		$scope.leftNav = [three, two, one ];	
	}
}/*! tz-skills-app - v0.1.0 -  */