import http from 'http';
import url from 'url';
import fs from 'fs';
import Mysql from 'mysql';

var con = Mysql.createConnection({
  host: "localhost",
  user: "abilitiez",
  password: "123412345"
});

con.connect((err)=>{
  if (err) throw err;
  console.log("Connected!");
  con.query("create database abilitiez", function (err, result) {
    if (err) throw err;
    console.log("database created");
  });
});
