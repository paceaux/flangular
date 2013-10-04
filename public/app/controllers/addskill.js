skillFactory = {
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
}