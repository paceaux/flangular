function globalIncludes($scope) {
	$scope.includes = [
		{
			name: 'footer',
			url: 'assets/includes/footer.html'
		}
	]
	$scope.footer = $scope.includes[0].url;
}
angular.module('hrApp', [])


