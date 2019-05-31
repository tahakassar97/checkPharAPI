var express = require('express');
var router = express.Router();

var User = require('../models/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((err, data) => {
    if (err) {
      res.status(400).send('error')
    } else {
      res.send(data)
    }
  })
});

router.post('/register', function(req, res) {
  User.findOne({ username: req.body.username }, (err, data) => {
    if (err) {
      res.status(400).send('error')
    } else {
      if (data == null) {
        new User(req.body)
        .save()
        .then((data) => {
          res.send(data)
        })
      .catch((err) => {
        res.send(err);
      })
      } else {
        res.send({
          'message':'already registered'
        })
      }
    }
  })
});

router.post('/login', function(req, res){
  User.findOne({username: req.body.username, password: req.body.password}, (err, data) =>{
    if (err) {
      console.log(err)
      res.status(400).send()}
      else{
        if(data == null){
          res.status(401).send()
        } else
      res.status(200).send({data})
      }
  })
})

router.post('/edit', function(req, res){
  User.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
    if (err) {
      res.status(400).send('error')}
      else{
        res.status(200).send(data)
      }
  })
})

router.get('/ask', function(req, res ) {
  User.find({}, ["name", "asks" ], (err, data) =>{
    if(err){
      res.status(400).send('error')
    }
    else{
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(data)
    }
  })
})

router.post('/newask', function(req, res){
  var ask = {};
  ask.questions = req.body.questions
  ask.dateTime = req.body.dateTime
  ask.Type = req.body.Type
  ask.replays = []
  
  User.findByIdAndUpdate(req.body.id, { $push: {asks: ask}}, (err, data)=>{
    if(err)
    res.status(400).send(err)
    else{
    res.status(200).send({data})
  }
  })
})
router.get('/', function(req, res, next) {
  User.find((err, data) => {
    if (err) {
      res.status(400).send('error')
    } else {
      res.send(data)
    }
  })
});

module.exports = router;
