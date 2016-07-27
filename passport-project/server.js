var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('./models/user');
var path = require('path');
var register = require('./routes/register');
var login = require('./routes/login');



//Mongo Setup
var mongoURI = "mongodb://localhost:27017/prime_example_passport";
var mongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(error){
  console.log('MongoDB connection error: ', err);
});
MongoDB.once('open', function (){
  console.log('MongoDB connection open.');
});
app.use(session({
  secret:'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/register', register);
app.use('/login', login);
app.get('/', function(request, response, next){
  response.sendFile(path.resolve(__dirname, '/public/views/login.html'));
});

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findbyID(id, function(error, user){
    if(error){
      return done(error);
    }
    done(null,user);
  });
});
passport.use('local', new localStrategy({
  passReqToCallback : true,
  usernameField: 'username'
},
function(request, username, password, done){
  User.findOne({ username: username }, function(error, user){
    if(error){
      throw error
    };
    if(!user) {
      return done(null, false, {message:'Incorrect username and password.'});
    }
    user.comparePassword(password, function(error, isMatch){
      if(error){
        throw error;
      }
      if (isMatch) {
        return done(null, user);
      } else {
        done(null, false, { message: 'Incorrect username and password.' });
      }
    });
  });
}));




var server = app.listen(3000, function(){
  var port = server.address().portl
  console.log('The server is listening on port ', port);
})
