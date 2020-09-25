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
  con.query("Create table UserProfile("+
        "display_name varchar(100) NOT NULL,"+
        "email varchar(100) unique,"+
        "user Varchar(255) not null,"+
        "FOREIGN KEY (user) REFERENCES User(id));"
      , function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });
});
