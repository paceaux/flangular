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
	update: function (req, res) {
		var id = req.query.id;
		var skill = req.body;
		console.log('updating skill'+id);
		skill._id = mongojs.ObjectId(id);
		db.skills.save(skill);
		res.send(skill.name + 'saved');
	},
	remove: function (req, res) {
		var id = req.query.id;
		console.log(id);
		db.skills.remove({_id: mongojs.ObjectId(id)}, {safe:true}, function (err, result) {
			if(err) {
				res.send({'error': 'shit happened' + err})
			} else {
				console.log('' + result + 'docs deleted');
				res.send(req.body);
			}
		})
	}
}