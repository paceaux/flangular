var factory = require('../app/personFactory');
var fakeData = factory.fakeData;
var databaseUrl = "test";
var collections = ["employees", "testemployees"];
var db = require("mongojs").connect(databaseUrl, collections);

var fakerton = {
	getAll : function(req, res) {
		db.testemployees.find(function(err, docs) {
			res.send(docs);
		})
	}
}

exports.data = function(req, res) {
	if(req.query.action) {
		if (req.query.action == 'del') {
			db.testemployees.remove();
			res.send("all clean")
		}
		if (req.query.action == 'ins') {
			for (datum in fakeData) {
				db.testemployees.save(fakeData[datum])
			}
			fakerton.getAll(req, res);
		}
	} else {
		fakerton.getAll(req, res);
	}
}