import http from 'http';
import url from 'url';
import fs from 'fs';
import Mysql from 'mysql';

var con = Mysql.createConnection({
  host: "localhost",
  user: "abilitiez",
  password: "123412345",
  database:"Abilitiez"
});

con.connect((err)=>{
  if (err) throw err;
  console.log("Connected!");
  con.query("Create table User(id Varchar(255) Primary key NOT NULL,type ENUM('NORMAL', 'ADMIN') NOT NULL);", function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });
});
