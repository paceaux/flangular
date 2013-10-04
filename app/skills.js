var factory = require('../app/personFactory'),
 databaseUrl = "test",
 collections = ["employees", "testemployees", "skills"],
 mongojs = require("mongojs"),
 db = require("mongojs").connect(databaseUrl, collections);

exports.query = {
	all: function (req, res) {
		var search = {};
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