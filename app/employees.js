var factory = require('../app/personFactory'),
 fakeData = factory.fakeData,
 databaseUrl = "test",
 collections = ["employees", "testemployees"],
 mongojs = require("mongojs"),
 db = require("mongojs").connect(databaseUrl, collections);


exports.getAll = function (req, res) {
	var search = {};
	if (req.query.id) {
		db.testemployees.findOne(
			{
				_id: mongojs.ObjectId(req.query.id)
			}, function(err, doc) {
				res.send(doc)
			}
		)
	} else {
		db.testemployees.find(function(err, docs) {
			res.send(docs);
		})
	}
}
exports.query = {
	all: function (req, res) {
		var search = {};
		if (req.query.id) {
			db.testemployees.findOne(
				{
					_id: mongojs.ObjectId(req.query.id)
				}, function(err, doc) {
					res.send(doc)
				}
			)
		} else {
			db.testemployees.find(function(err, docs) {
				res.send(docs);
			})
		}
	},
	contact: function (req, res) {
		var search = {};
		if (req.query.email){search["contact.email"] = req.query.email};
		if (req.query.phone){search["contact.phone"] = req.query.phone};
		if (req.query.skype){search["contact.skype"] = req.query.skype};
		db.testemployees.find(search).toArray(function(err, items) {
			res.send(items);
		});
	},
	name: function (req, res) {
		var search = {};
		if (req.query.first){search["name.first"] = req.query.first};
		if (req.query.last){search["name.last"] = req.query.last};
		db.testemployees.find(search).toArray(function(err, items) {
			res.send(items);
		});
	},
	address: function (req, res){
		var search = {};
		if (req.query.city){search["address.city"] = req.query.city;};
		if (req.query.state){search["address.state"] = req.query.state;};
		if (req.query.street){search["address.street"] = req.query.street;};
		if (req.query.zip){search["address.zip"] = req.query.zip;};
		db.testemployees.find(search).toArray(function(err, items) {
			res.send(items);
		});		
	}
}


exports.addEmployee = function(req, res) {
	var person = req.body;
	console.log('adding person:' + JSON.stringify(person));
	db.testemployees.insert(person, {safe:true}, function(err, result) {
		if (err) {
			res.send({'error': 'an error happened'});
		} else {
			console.log('success' + JSON.stringify(result[0]));
			res.send(result[0])
		}
	});
}
exports.delEmployee = function(req, res){
	var id = req.query.id;
	console.log(id);
    db.testemployees.remove({_id: mongojs.ObjectId(req.query.id) }, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
	
}
exports.updateEmployee = function (req, res) {
	var id = req.query.id;
	var person = req.body;
	console.log('updating person'+ id);
	console.log(JSON.stringify(person));
	person._id = mongojs.ObjectId(id);
	db.testemployees.save(person)
	res.send('person saved')
}