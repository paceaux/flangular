skillFactory = {
	filters: {
		small: {
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
	filteredSkills: function($scope, $http) {
		var filter = skillFactory.filters.small;
		console.log(filter);
		$http({method: 'GET', URL:'/skills/get/filter', data: filter}).success(function(data, status, headers, config) {
			$scope.skills = data;
			$scope.balls = "balls";
		}).error(function(data, status, headers, config){

		});
	}
}
function addSkill($scope, $http) {
	function grabskills(){
		$http({method: 'GET', url: '/skills/get'}).success(function(data,status, headers, config) {
			$scope.parentIDs = data;
		}).error(function(data, status, headers, config) {

		})
	}
	function updateParent(parentID, childID){
		parentID.children.push(childID);
		$http({method: 'PUT', url: '/skills/put?id='+parentID._id, data:parentID}).success(function(data, status, headers, config) {
			console.log('updated')
		}).error(function(data, status, headers, config) {

		})		
	}
	grabskills();	
	$scope.refresh = function () {
		$scope.skill.name = '';
		$scope.skill.id = '';
		$scope.skill.parentID =  '';
		grabskills();	
	}
	$scope.submit = function() {
		var id = $scope.skill.id,
			name = $scope.skill.name,
			parentID = $scope.skill.parentID;

		var skill = new skillFactory.skill(name, id);

		$http({method: 'POST', url: '/skills/add', data: skill}).success(function(data,status,headers,config) {
			$scope.refresh();
			grabskills();
			if (parentID !== undefined){
				updateParent(parentID, data._id)
			}
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
}