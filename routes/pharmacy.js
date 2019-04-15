var express = require('express');
var router = express.Router();

var Phar = require('../models/pharmacy')

router.get('/open', function(req, res){
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
    res.send(arr)
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
router.post('/login', (req, res)=> {
  Phar.findOne({username: req.body.username, password: req.body.password}, (err, data) =>{
    if (err) {
      console.log(err)
      res.status(400).send()}
      else{
        if(data == null){
          res.status(401).send()
        } else
      res.status(200).send({
        "name": data.name,
        "_id": data._id
      })
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
  Phar.findOne({ username: req.body.username }, (err, data) => {
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
  replay.bodyReplay = req.body.replay;
  replay.dateTime  = new Date();
  replay.pharmacist_id = req.body.ph_id;

  Phar.findOneAndUpdate({ _id: req.body.userID, "asks._id": req.body.askID }, {
    $push: {
      "asks.0.replays": replay
    }
  }, (err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(data)
    }
  })
})
module.exports = router;