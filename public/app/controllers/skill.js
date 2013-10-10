skillFactory = {
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
}