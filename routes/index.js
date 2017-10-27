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

router.get('/users/:username',function(req,res,next){
  var username = req.params.username;
  console.log(username);
  //user has to be a username,
  if(!username || username === ""){
    res.render('error',{message:'invalid username'});
  }
  var url = 'mongodb://nodeapp:apppwd@ds237815.mlab.com:37815/savemyloc';
          mongodb.connect(url, function (err, db) {
             if(err){
               console.log(err);
             }
           //  console.log(db);
               var collection = db.collection('gps');
               collection.find({user:username}).toArray(function (err, results) {
                 if(err){console.log(err);}
                 res.json(results);
               });
           });
});

router.post('/',function(req,res,next){
  console.log(req.body);

  var date = new Date();
  console.log(date.getTime());

  var newDate = new Date(1509135071183);
  console.log(newDate.getUTCDate());


  //chcek for errors in body data.
  if(!req.body){
    res.render('error',{message:'invalid body'});
  }
  else if(!req.body.user || req.body.user==""){
    res.render('error',{message:'invalid user'});
  }
  else if(!req.body.lat || !req.body.lng){
    res.render('error',{message:'invalid lat/lng'});
  }
  else if(req.body.lat === "" || req.body.lng ===""){
    res.render('error',{message:'invalid lat/lng'});
  }
  else{
    var url = 'mongodb://nodeapp:apppwd@ds237815.mlab.com:37815/savemyloc';
            mongodb.connect(url, function (err, db) {
               if(err){
                 console.log(err);
               }
             //  console.log(db);
                 var collection = db.collection('gps');
                 collection.insertOne(req.body,function (err, results) {
                   if(err){console.log(err);}
                   res.json(results);
                 });
             });
  }
});




module.exports = router;
