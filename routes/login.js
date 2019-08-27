var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	if(req.body.username.length<=32 && req.body.username.length>4)
		fetchUserCredentials(req, res, (err,res,result) => {
			let valid = false;
			if(result) {
				if(result.length>0) {
					valid=true;
					req.session.userId = result[0].key;
				}
			}
			res.send({valid: valid, sessionId: req.session.id ? req.session.id : undefined});
			res.end();
		});
	else {
		res.send({valid: false, sessionId: undefined});	
		res.end();
	}
});

fetchUserCredentials = (clientRequest, clientResponse, callback) => {
	let sql = "SELECT id as \"key\", username, password FROM account WHERE username = '"+clientRequest.body.username+"' AND password = '"+clientRequest.body.password+"'";

	dbPool.query(sql, (err, result) => {
		callback(err,clientResponse,result);
	});
}

module.exports = router;
