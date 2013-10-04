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
};skillFactory = {
	skill : function(name, id, skparent){
		this.name = name;
		this.id = id;
		this.skparent = skparent;
	}
}
function addSkill($scope, $http) {
	function grabskills(){
		$http({method: 'GET', url: '/skills/get'}).success(function(data,status, headers, config) {
			$scope.skparents = data;
		}).error(function(data, status, headers, config) {

		})
	}
	grabskills();	
	$scope.refresh = function () {
		$scope.skill.name = '';
		$scope.skill.id = '';
		$scope.skill.skparent =  '';
		grabskills();	
	}
	$scope.submit = function() {
		var id = $scope.skill.id,
			name = $scope.skill.name,
			skparent = $scope.skill.skparent;

		skill = new skillFactory.skill(name, id, skparent)
		$http({method: 'POST', url: '/skills/add', data: skill}).success(function(data,status,headers,config) {
			$scope.refresh();
			grabskills();
		}).error(function(data, status, headers, config) {

		});
	}
}
function getSkills($scope, $http) {
	$http({method: 'GET', url: '/skills/get'}).success(function(data,status, headers, config) {
		$scope.skills = data;
	}).error(function(data, status, headers, config) {

	});
	$scope.update = function (skill) {
		$http({method: 'PUT', url: '/skills/put?id='+skill._id, data:skill}).success(function(data, status, headers, config) {
			console.log('updated')
		}).error(function(data, status, headers, config) {

		})
	}
	$scope.delete = function (skill) {
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
};function getContactList($scope, $http) {
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

;function globalHeader($scope) {
	var siteTitle = 'assets/img/logo-white.png', 
		subHead = "Tahzoo Demo";

	$scope.siteTitle = siteTitle;
	$scope.subHead = subHead;
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

;function navigation($scope) {
	var page = function(title, url) {
		this.title = title;
		this.url = url;
	}
	var index = new page('Home', 'tasks.html'),
		add = new page("Add Employee", 'add-employee.html'),
		results = new page('Employee Contact', 'results.html'),
		contact = new page('Employee Addresses', 'address-list.html'),
		addSkill = new page('Add Skill', 'add-skill.html'),
		skillList = new page('Skills', 'skill-list.html')
		three = new page('Three Col', 'layout.html'),
		one = new page('One Column', 'one-col.html'), 
		two = new page("Two Column", 'two-col.html');
	$scope.topNav = [index, add, results, contact, addSkill, skillList];
	$scope.skillNav = [addSkill, skillList];
	$scope.leftNav = [three, two, one ];
}/*! tz-skills-app - v0.1.0 -  */