function navigation($scope) {
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
}