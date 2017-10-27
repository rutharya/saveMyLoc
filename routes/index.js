var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
   var url = 'mongodb://nodeapp:apppwd@ds237815.mlab.com:37815/savemyloc';
           mongodb.connect(url, function (err, db) {
              if(err){
                console.log(err);
              }
            //  console.log(db);
                var collection = db.collection('gps');
                collection.find({}).toArray(function (err, results) {
                  if(err){console.log(err);}
                  res.json(results);
                });
            });

  //res.render('index', { title: 'savemyloc' });
});

router.post('/',function(req,res,next){
  console.log(req.body);
  var date = new Date();
  console.log(date.getTime());
})

module.exports = router;
