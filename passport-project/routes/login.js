var express = require('express');
var router = requir('express').Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(request, response, next){
  response.json(request.isAuthenticated());
  response.sendFile(path.resolve(__dirname, '../views/login.html'));
});

router.post('/',
  passport.authenticate('local', {
    successRedirect:'/views/success.html',
    failureRedirect:'/views/failure.html'
  })
);

module.exports = router;
