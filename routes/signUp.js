var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
	if(req.body.username.length<=32 && req.body.username.length>4)
		signUpUser(req,res, (res,responseMsg) => {
			res.send({err: responseMsg});
			res.end();
		});
	else
		res.end();
});

signUpUser = (clientRequest, clientResponse, callback) => {
	let sql = "INSERT INTO account(id, username, password) VALUES (UUID(),'"+clientRequest.body.username+"','"+clientRequest.body.password+"')";

	dbPool.query(sql, (err, result) => {
		let responseMsg = "ok";
		if(err)
			responseMsg = "usr_alr_exs";
		callback(clientResponse,responseMsg,result);
	});
}

module.exports = router;
