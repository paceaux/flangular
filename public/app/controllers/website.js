website = {
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
}