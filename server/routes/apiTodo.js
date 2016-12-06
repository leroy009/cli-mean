/**
 * Created by Leroys on 2016/12/06.
 */
const express = require('express');
const router = express.Router();

//Connecting to Mongo
var mongojs = require('mongojs')
var db = mongojs('mongodb://localhost:27017/todos', ['todos'])

//Get API listing.
router.get('/', function (req,res) {
  res.send('api works');
})

//Get all Todos inside MongoDB
router.get('/todos',function (req,res,next) {
//  Getting Mongo Data
  db.todos.find(function (err, todos) {
    if(err){
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});


//Get Single Todos
//url, function
router.get('/todos/:id', function (req, res, next) {
  db.todos.findOne({
    _id : mongojs.ObjectId(req.params.id)
  }, function (err, todos) {
    if(err){
      res.send(err);
    } else {
      res.json(todos);
    }
  });
});

//Saving Todo
router.post('/todos', function (req,res, next) {
  var todo = req.body;
//    Validation
  if(!todo.text || !(todo.IsCompleted + '')){
    res.status(400);
    res.json({
      "error" : "Invalid Data"
    });
  } else {
    db.todos.save(todo, function (err, result) {
      if(err){
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

// Update Todo
router.put('/todos/:id', function (req,res, next) {
  var todo = req.body;
  var updatedObject = {};

  if(todo.IsCompleted){
    updatedObject.IsCompleted = todo.IsCompleted;
  }
  if(todo.text){
    updatedObject.text = todo.text;
  }

//    Validation
  if(!updatedObject){
    res.status(400);
    res.json({
      "error" : "Invalid Data"
    });
  } else {
    db.todos.update({
      _id: mongojs.ObjectId(req.params.id)
    },updatedObject, {},function (err, result) {
      if(err){
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});


//Delete Todo
router.delete('/todos/:id', function (req, res,next) {
  db.todos.remove({
    _id: mongojs.ObjectId(req.params.id)
  },"", function (err, result) {
    if(err){
      res.send(err);
    } else {
      res.json(result);
    }
  });
});




module.exports = router;
