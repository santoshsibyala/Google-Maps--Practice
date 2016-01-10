var express = require('express');
var router = express.Router();

var ejs = require("ejs");


function home(req,res){
		
	res.render('index', { title: 'Student Ghar'});
}

router.get('/',home);

module.exports = router;

