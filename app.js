var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

// start
var app = express();


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));


// crud server methods

app.get('/', function (req, res) {
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
  })


})

app.post('/users/add', function (req, res) {
  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }

  console.log(req.body);

  db.users.insert(newUser, function (err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  })
})

app.delete('/users/delete/:id', function (req, res) {
  db.users.remove({
      _id: ObjectId(req.params.id)
    },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    }
  );
})




app.listen(3000, () => console.log('Server started on port 3000!'));