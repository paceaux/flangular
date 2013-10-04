
function globalScripts($scope) {
	$scope.scripts = [
		{name: 'jquery', type: 'library', src: 'assets/js/lib/jquery.min.js'},
		{name: 'jqueryui', type: 'library', src: 'assets/js/lib/jquery-ui.min.js'},
		{name: 'main', type: 'app', src: 'assets/js/main.js'}
	];
	function typeFilter(filter) {
		var filteredScripts = [];
		$scope.scripts.forEach( function (el, i, arr) {
			if(el.type == filter){
				filteredScripts.push(el);
			}
		});
		return filteredScripts;
	}
	$scope.libs = typeFilter('library');
	$scope.apps = typeFilter('app');
}



