'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var con = _mysql2.default.createConnection({
  host: "localhost",
  user: "abilitiez",
  password: "123412345",
  database: "Abilitiez"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("Create table User(id Varchar(255) Primary key NOT NULL,type ENUM('NORMAL', 'ADMIN') NOT NULL);", function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });
});