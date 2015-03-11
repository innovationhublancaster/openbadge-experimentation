/*
* Module Dependancies
*/
//var __dirname = '/display'
var express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	getID = requre('getID')

var app = express()
function compile(str, path){
	return stylus(str)
		.set('filename', path)
		.use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
	}
))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req,res){
	res.render('index',
		{title: 'Display'})
})

console.write(getID.getJSON('stennett10@gmail.com'));
app.listen(3000)