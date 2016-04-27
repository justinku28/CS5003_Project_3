/**
* April 2016, CS5003, St Andrews MSc
* server.js
* Authors: Bernard, Justin, Oliver and Oat.
*
**/

var http = require('http');
var express = require('express');
var json = require('express-json');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// You will also need to replace the server name with the details given by
// couchdb. Will need to include password and user name if this is setup in couchdb
// "http://user:password@addressToCouchdb"
var nano = require('nano')('http://127.0.0.1:5984');

var qa_db = nano.db.use(''); // Reference to the database storing the data
var user_db = nano.db.use(''); //Reference to the database storing 