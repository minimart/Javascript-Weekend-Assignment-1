var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(request, response, next){
  response.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response, next){
  Users.create(request.body, function(error, post){
    if(error){
      next(error);
    } else {
      response.redirect('/');
    }
  });
});

module.export = router;
