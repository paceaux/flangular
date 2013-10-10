var factory = require('../app/personFactory'),
 databaseUrl = "test",
 collections = ["employees", "testemployees", "skills"],
 mongojs = require("mongojs"),
 db = require("mongojs").connect(databaseUrl, collections);

exports.query = {
	filters: {
		nokids : {
			children: {
				$size: 0
			}
		}, 
		kids:  {
			children: {
				$ne: []
			}
		},
		noId: {
			id:0
		}, 
		all: {}
	},
	queryObj: function(query, cb) {
		db.skills.find(query).toArray(cb);
	},
	parentLoop: function(items, res) {
		var parents = [],
			orphans = [];
		//separate the entire list into parents and orphans
		items.forEach(function(branch, branchI){
			if(branch.children.length > 0){
				branch.childSkills = [];
				parents.push(branch);
			} else {
				orphans.push(branch);
			}
		});
		var orphansL = orphans.length, 
			parentsL = parents.length;
		//loop through the orphan list
		//we want to see if the orphans are actually children of the parents
		while(orphansL--){
			var orphan = orphans[orphansL],
				orphanId = orphan._id
			//w/i the orphan loop, loops the parents
			parents.forEach(function(parent, parentI) {
				//loop the children of the parents
				parent.children.forEach(function(child, childI) {
					if (child == orphanId){
						//add the item to the list of parents
						parent.childSkills.push(orphan)
						//remove the item from the list of orphans
						orphans.splice(orphansL,1)
					}//end if
				})//end parent-child loop
			}) //end parent loop
		}//end orphan loop

		//loop the parent list
		//we want to see if any of the parents in the list are also children
		while(parentsL--){
			var p = parents[parentsL],
				pId =p._id;
			//foreach the parents
			parents.forEach(function(adult, adultI) {
				//foreach the children of the parents
				var adultL = adult.children.length
				while(adultL--) {
					var teen = adult.children[adultL]
					if (teen == p._id) {
						//add the item to this parent's childskills
						adult.childSkills.push(p);
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
		if(req.query.id) {
			db.skills.findOne(
				{
					_id: mongojs.ObjectId(req.query.id)
				}, function(err, doc) {
					res.send(doc)
				}
			)
		} else {
			db.skills.find(function(err, docs) {
				res.send(docs);
			})
		}
	}, 
	filter: function (req, res) {
		var filter = req.body;
		db.skills.find({},filter).toArray(function(err, items){
			if (err) {
				res.send('some sort of error happened')
			} else {
				res.send(items);
			}
		});
	}, 
	tree: function(req, res) {
		console.log('tree query')
		var query = exports.query.filters.all;
		var results = exports.query.queryObj(query, function(err, items) {
			exports.query.parentLoop(items, res);
		})
	}
}

exports.controls = {
	add: function (req, res) {
		var skill = req.body;
		console.log('adding skill' + JSON.stringify(skill));
		db.skills.insert(skill, {safe:true}, function (err, result) {
			if (err) {
				res.send({'error': 'error adding skill'});
			} else {
				console.log(JSON.stringify(result[0]));
				res.send(result[0]);
			}
		})
	},
	updateParent: function (req, res, id) {
		id = id.toString();
		db.skills.update({"children": id},{$pull:{"children" : id}});
	},
	edit: function (req, res) {
		var id = req.query.id;
		var editData = req.body;
		console.log('editing skill'+id);
		id = mongojs.ObjectId(id);
		db.skills.update({_id: id}, editData);
		res.send(id + 'saved');
	},
	update: function (req, res) {
		var id = req.query.id;
		var skill = req.body;
		skill._id = mongojs.ObjectId(id);
		db.skills.save(skill);
		res.send(skill.name + 'saved');
	},
	remove: function (req, res) {
		var id = req.query.id;
		db.skills.remove({_id: mongojs.ObjectId(id)}, {safe:true}, function (err, result) {
			if(err) {
				res.send({'error': 'shit happened' + err})
			} else {
				console.log('' + result + 'docs deleted');
				exports.controls.updateParent(req, res, id);
				res.send(req.body);
			}
		})
	}
}