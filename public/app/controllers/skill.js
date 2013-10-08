skillFactory = {
	filters: {
		nameOnly: {
			children:0,
			id: 0
		}
	},
	skill : function(name, id, parentID, children){
		this.name = name;
		this.id = id;
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
		$scope.skill.name = '';
		$scope.skill.id = '';
		$scope.skill.parentID =  '';
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
	addSkill: function ($scope, $http) {
		skillFactory.queries.all($scope, $http);
		$scope.submit = function() {
			var id = $scope.skill.id,
				name = $scope.skill.name,
				parentID = $scope.skill.parentID !== undefined ? $scope.skill.parentID : undefined;
			var skill = new skillFactory.skill(name, id);
			skillFactory.methods.add($scope, $http, skill, parentID)
		}	
	}
}