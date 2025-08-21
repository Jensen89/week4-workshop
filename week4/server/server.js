const express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/../www'));
app.use(express.json());