var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

//Schemas
var scriptSchema = new Schema({
    name: String,
    body: String
});
var Script = mongoose.model('Script', scriptSchema);
//End Schemas
/* GET home page.*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/success', function(req, res, next) {
  res.render('success', {});
});
router.post('/addscript', function(req,res){
    var scriptName = req.body.ScriptName;
    var scriptBody = req.body.ScriptBody;

    var script = new Script({name: scriptName, body: scriptBody});
    console.log("successfully added" + " " + script.name);
    script.save()
    res.redirect('/success');


});
router.get('/listscripts', function(req , res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Script.find({}, function(err,docs){
        res.setHeader('Access-Control-Allow-Origin','*')
        // Request methods you wish to allow
        res.json(docs);
    });
});
module.exports = router;
