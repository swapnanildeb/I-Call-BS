var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var question = req.query.q;
	console.log(question + "q");
	var url = "https://google.com/search?q="+question;
    fetch(url).then(function(res){
      return res.text();
    }).then(function(text){
    	res.send(text)
    })
});


module.exports = router;
