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



let allInfo = {
	error:"",
	todos:[]
}
app.get("/", function (req, res) {
  res.render('index', allInfo);
});

app.post("/complete",function (req, res) {
	let todoIndex = req.body.todoIndex

	allInfo.todos[todoIndex].isComplete = true;
	res.redirect('/')
});
app.post("/todo", function (req, res) {
	allInfo.error = "";
	req.checkBody("todo","cant be empty mang").notEmpty();
	if(req.validationErrors()){
		allInfo.error = req.validationErrors()[0].msg
	}
	if(!req.validationErrors()){
		let todo = {
			msg:req.body.todo,
			index:(allInfo.todos.length),
			isComplete:false
		};
	  	allInfo.todos.push(todo);
	}
  res.redirect('/');
});
app.listen(3000, function(){
	console.log("running on port 3000");
});    