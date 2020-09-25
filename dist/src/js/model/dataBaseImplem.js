"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataBaseImplem = function () {
  function dataBaseImplem(user, password, host, database) {
    _classCallCheck(this, dataBaseImplem);

    this.con = _mysql2.default.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      multipleStatements: true
    });
    this.con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }

  _createClass(dataBaseImplem, [{
    key: "getUserProfile",
    value: function getUserProfile(user_id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          var sql = "select UserProfile.user,UserProfile.display_name,UserProfile.email " + "from UserProfile inner join User ON User.id = UserProfile.user " + ("where UserProfile.user=" + user_id);
          _this.con.query(sql, function (err, result) {
            if (err) {
              throw err;
            } else if (result.length == 1) {
              resolve(result);
            } else {
              resolve({ "status": "400", "message": "user with this id does not exists in database" });
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }, {
    key: "createUser",
    value: function createUser(info) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        try {
          var sql = "INSERT INTO User VALUES (" + info.id + ",'" + info.type + "');";
          _this2.con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              sql = "INSERT INTO UserProfile VALUES ('" + info.display_name + "','" + info.email + "'," + info.id + ");";
              _this2.con.query(sql, function (err, result) {
                if (err) throw err;
                resolve({ "status": "200OK", "message": "user added to database" });
              });
            } else {
              resolve({ "status": "400", "message": "user with id ${user_id},already exists" });
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(user_id) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        try {
          var sql = "delete from UserProfile where UserProfile.user=" + user_id + " and UserProfile.email is null;";
          _this3.con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              sql = "delete from User where User.id=" + user_id;
              _this3.con.query(sql, function (err, result) {
                if (err) throw err;
                resolve({ "status": "200OK", "message": "user deleted from database" });
              });
            } else {
              resolve({ "status": "400", "message": "user id not found or email is not null" });
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }, {
    key: "getUsersByType",
    value: function getUsersByType(type) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        try {
          var sql = "select UserProfile.user,UserProfile.display_name,UserProfile.email " + "from UserProfile inner join User ON User.id = UserProfile.user " + ("where User.type=" + type);
          _this4.con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
              resolve(result);
            } else {
              resolve({ "status": "200", "message": "no users with this type in database" });
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }, {
    key: "updateListOfUsers",
    value: function updateListOfUsers(users) {
      var _this5 = this;

      var sql = "";
      for (var i = 0; i < users.length; i++) {
        sql += "update UserProfile set display_name=\"" + users[i].display_name + "\",email=\"" + users[i].email + "\" where user=" + users[i].id + ";";
      }
      return new Promise(async function (resolve, reject) {
        try {
          await _this5.con.query(sql, function (err, result) {
            if (err) throw err;
            resolve({ "status": "200OK", "message": "Update all users " });
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }]);

  return dataBaseImplem;
}();

exports.default = dataBaseImplem;