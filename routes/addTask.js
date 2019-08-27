var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let item = req.body.newItem;
	let sql = "INSERT INTO task (id, date, name, priority, completed, user_id)  VALUES ('"+item.key+"', '"+toMySqlDate(item.date)
+"', '"+item.name+"', '"+item.priority+"', "+item.completed+",'"+req.session.userId+"')"

	dbPool.query(sql, function (err, result) {
		if(err) {
			console.log(err);
			throw err;
		}
	});
		res.end();
});

module.exports = router;
