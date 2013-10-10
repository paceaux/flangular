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
	filters: {
		noskills: {
			skills: 0
		}
	},
	queryObj: function(query, cb) {
		var filter = exports.query.filters.noskills;
		db.testemployees.find(query, filter).toArray(cb);
	},
	parentLoop: function(items, res) {
		var parents = [],
			orphans = [];
		//separate the entire list into parents and orphans
		items.forEach(function(branch, branchI){
			if(branch.subordinates.length > 0){
				branch.subordinateObjs = [];
				parents.push(branch);
			} else {
				orphans.push(branch);
			}
		});
		var orphansL = orphans.length, 
			parentsL = parents.length;
		//loop through the orphan list
		//we want to see if the orphans are actually subordinates of the parents
		while(orphansL--){
			var orphan = orphans[orphansL],
				orphanId = orphan._id
			//w/i the orphan loop, loops the parents
			parents.forEach(function(parent, parentI) {
				//loop the subordinates of the parents
				parent.subordinates.forEach(function(child, childI) {
					if (child == orphanId){
						//add the item to the list of parents
						parent.subordinateObjs.push(orphan)
						//remove the item from the list of orphans
						orphans.splice(orphansL,1)
					}//end if
				})//end parent-child loop
			}) //end parent loop
		}//end orphan loop

		//loop the parent list
		//we want to see if any of the parents in the list are also subordinates
		while(parentsL--){
			var p = parents[parentsL],
				pId =p._id;
			//foreach the parents
			parents.forEach(function(adult, adultI) {
				//foreach the subordinates of the parents
				var subordinateL = adult.subordinates.length
				while(subordinateL--){
					var teen = adult.subordinates[subordinateL]
					if (teen == p._id) {
						//add the item to this parent's subordinates
						adult.subordinateObjs.push(p);
						//remove the item from the list of parents
						parents.splice(parentsL, 1)
					}//end if
				//end parent child loop
				}
			})//end parent loop
		}
		//merge the parents and the orphans
		var families = parents.concat(orphans);
		res.send(families);
	},
	all: function (req, res) {
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
	filter: function(req, res) {
		var filter = req.body;
		db.testemployees.find({}, filter).toArray(function(err, items){
			if (err){
				res.send('error occurred')
			} else {
				res.send(items)
			}
		});
	},
	tree: function(req, res) {
		console.log('tree query')
		var query = exports.query.filters.all;
		var results = exports.query.queryObj(query, function(err, items) {
			exports.query.parentLoop(items, res);
		})
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
exports.controls = {
	add: function(req, res) {
		var person = req.body;
		db.testemployees.insert(person, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error': 'an error happened'});
			} else {
				res.send(result[0])
			}
		});
	},
	updateParent: function (req, res, id) {
		id = id.toString();
		db.skills.update({"children": id},{$pull:{"children" : id}});
	},
	edit: function(req, res) {
		var id = req.query.id;
		var person = req.body;
		person._id = mongojs.ObjectId(id);
		db.testemployees.save(person)
		res.send('person saved')

	}, 
	update: function(req, res) {
		console.log("I'M UPDATING!!!!")
		var id = req.query.id;
		var person = req.body;
		console.log(req.query);
		person._id = mongojs.ObjectId(id);
		console.log(req.body);
		db.testemployees.save(person)
		res.send('person saved')
	},
	remove: function(req, res) {
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
}