var express = require('express');
var router = express.Router();

var Phar = require('../models/pharmacy')
var user = require('../models/users')

router.post('/open', function(req, res){
  Phar.find((err, data) => {
    if(err) {
    res.status(400).send('error')
  }else{
    var arr = [];
    for (var phar = 0; phar < data.length; phar++) {
      if (data[phar].openDay.length > 0) {
        arr.push(data[phar])
      }
    }
    res.status(200).send(arr)
  }
})
})


router.post('/login', (req, res)=> {
  Phar.findOne({username: req.body.username, password: req.body.password},
    ['name', '_id', 'pharmacist_name', 'location', 'mobile', 'phone', 'username', 'openDay']
    , (err, data) =>{
    if (err) {
      console.log(err)
      res.status(400).send()}
      else{
        if(data == null){
          res.status(401).send()
        } else {
      res.status(200).send(data)
        }
    }
})
})
router.post('/edit', function(req, res){
  Phar.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
    if (err) {
      res.status(400).send('error')}
      else{
        res.status(200).send(data)
      }
  })
})

router.post('/register', function(req, res, next) {
  Phar.findOne({ username: req.body.username, name: req.body.name }, (err, data) => {
    if (err) {
      res.status(400).send('error')
    } else {
      if (data == null) {
        new Phar(req.body)
        .save()
        .then((data) => {
          res.send(data)
        })
      .catch((err) => {
        res.send(err);
      })
      } else {
        res.send('already registered')
      }
    }
  })
});

router.post('/newreplay', function(req, res){
  var replay = {};
  replay.bodyReplay = req.body.bodyreplay;
  replay.dateTime  = req.body.dateTime;
  replay.pharmacist_id = req.body.pharmacist_id;
  replay.pharmacist_name = req.body.pharmacist_name;

  user.findOneAndUpdate({ _id: req.body._id, "asks._id": req.body.askID }, {
    $push: {
      "asks.$.replays": replay
    }
  }, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send({data})
    }
  })
})


router.post('/near', (req, res) => {
  var r = []
  Phar.find((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      data.forEach(element => {
        var d = Math.sqrt((req.body.x- element.x)*(req.body.x- element.x) + (req.body.y- element.y)*(req.body.y- element.y))
        if(d <= req.body.n)
        r.push(element)
      });
      res.send(r)
    }
  })
})

module.exports = router;