//name object
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

