var express = require('express');
var router = express.Router();

var adm = require('../models/admin')
var phar = require('../models/pharmacy')

router.post('/add', (req, res) => {
    new phar(req.body)
    .save()
    .then(done => {
      res.send(done)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

  router.get('/', function(req, res, next) {
    phar.find((err, data) => {
      if (err) {
        res.status(400).send('error')
      } else {
        res.send(data)
      }
    })
  })
  router.post('/editOpen/:id', (req, res) => {
    phar.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(data)
      }
    })
  })

  router.post('/login', (req, res)=> {
    adm.findOne({username: req.body.username, password: req.body.password}, (err, data) =>{
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
    adm.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
      if (err) {
        res.status(400).send('error')}
        else{
          res.status(200).send(data)
        }
    })
  })

  router.post('/register', function(req, res, next) {
    adm.findOne({ username: req.body.username }, (err, data) => {
      if (err) {
        res.status(400).send('error')
      } else {
        if (data == null) {
          new adm(req.body)
          .save()
          .then((data) => {
            res.send(data)
          })
        .catch((err) => {
          res.status(300).send(err);
        })
        } else {
          res.send('already registered')
        }
      }
    })
  })
  module.exports = router;