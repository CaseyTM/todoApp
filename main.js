const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static('public'));

app.engine('mustache',mustacheExpress())
app.set('views', './views');
app.set('view engine', 'mustache');


const todos = [
  "Wash the car"
];

app.get("/", function (req, res) {
  res.render('index', { todos: todos });
});

app.post("/", function (req, res) {

  	todos.push(req.body.todo);
  res.redirect('/');
});
app.listen(3000, function(){
	console.log("running on port 3000");
}) 