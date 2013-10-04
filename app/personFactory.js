//name object
//
 derp = function() {
 	return 'derp'
 }
var personFactory = {
	fullName: function (first, last) {
		this.first = first;
		this.firstu = first.toLowerCase()
		this.last = last;
		this.lastu = last.toLowerCase()
		this.fullName = function () {
			var f = this.first + " " + this.last;
			return f;
		}		
	},
	address: function (state,city, street, zip) {
		this.state = state;
		this.statu = state.toLowerCase();
		this.city = city;
		this.cityu = city.toLowerCase();
		this.street = street;
		this.zip = zip;
	},
	contact: function (email,phone,skype) {
		this.email = email.toLowerCase()
		this.phone = phone;
		this.skype = skype;
		this.skypeu = skype.toLowerCase();
		this.getPhone = function () {
			return this.phone;
		};		
	},
	person: function (first, last, email, phone, skype, state, city, street, zip) {
		this.name = new personFactory.fullName(first, last);
		this.contact = new personFactory.contact(email, phone, skype);
		this.address = new personFactory.address(state, city, street, zip);	
	}
}

exports.personFactory = personFactory;
//fake data
var frank = new personFactory.person("Frank", "Taylor", "frank@tahzoo.com", "214 234 6496", "paceaux","IL", "bloomington"),
	alex = new personFactory.person("Alex", "Klock", "Alex@tahzoo.com", "something", "alex.klock", "OH", "columbus"),
	joey = new personFactory.person("Joey", "Shirley", "joey@tahzoo.com", "something", "illfittingshoes","OH", "columbus"),
	jim = new personFactory.person("Jim", "Rubadue", "jim@tahzoo.com", "something", "jim.rubadue","OH", "Cleveland"),
	jason = new personFactory.person("Jason", "Kaufman", "jason@tahzoo.com", "something", "jason.Kaufman","VA", "richmond"),
	davidb = new personFactory.person("david", "Brimmer", "davidb@tahzoo.com", "something", "david.brimmer","VA", "richmond"),
	davidr = new personFactory.person("david", "Roe", "david@tahzoo.com", "something", "david.roe","VA", "richmond"),
	davidk = new personFactory.person("david", "kearfott", "davidk@tahzoo.com", "something", "david.kearfott","VA", "richmond");

exports.fakeData = [frank, alex, joey, jason, jim, davidb, davidr, davidk];

