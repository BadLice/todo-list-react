var express = require('express');
var router = express.Router();

updateItems = (clientRequest,clientRes,callback) => {
	dbPool.query("SELECT id as \"key\",DATE_FORMAT(date,'%Y:%m:%d %H:%i:%s') as date ,name,priority,completed FROM task WHERE user_id = '"+clientRequest.session.userId+"'", ((err,result) => {
		callback(err,clientRes,result);
	}));
}

router.post('/', (req, res, next) => {
	if(req.body.sessionId === req.session.id) {
		updateItems(req,res,(err,clientRes,result) => {
			result = result.map(o => o = {...o,date: toJsonDate(o.date)});
			res.send(result);
			res.end();
		});
	}
	else {
		// console.log("session id err",req.body.sessionId,req.session.id)
		res.status(403).send({
		   status: 403
		});
	}
});

module.exports = router;
