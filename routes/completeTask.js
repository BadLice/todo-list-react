var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	let sql = "UPDATE task SET completed = NOT completed WHERE id = '"+req.body.key+"' AND user_id = '"+req.session.userId+"'";
	dbPool.query(sql, function (err, result) {
		if(err) {
			console.log(err);
			throw err;
		}
	});
		res.end();
});

module.exports = router;
