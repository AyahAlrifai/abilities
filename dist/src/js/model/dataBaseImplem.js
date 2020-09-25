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
    value: async function getUserProfile(user_id) {
      var _this = this;

      return new Promise(async function (resolve, reject) {
        try {
          _this.con.query("select UserProfile.user,UserProfile.display_name,UserProfile.email " + "from UserProfile inner join User ON User.id = UserProfile.user " + ("where UserProfile.user=" + user_id), function (err, result) {
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
    value: async function createUser(info) {
      var _this2 = this;

      return new Promise(async function (resolve, reject) {
        try {
          _this2.con.query("INSERT INTO User VALUES (" + info.id + ",'" + info.type + "');", async function (err, result) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              _this2.con.query("INSERT INTO UserProfile VALUES ('" + info.display_name + "','" + info.email + "'," + info.id + ");", function (err, result) {
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
    value: async function deleteUser(user_id) {
      var _this3 = this;

      return new Promise(async function (resolve, reject) {
        try {
          _this3.con.query("delete from UserProfile where UserProfile.user=" + user_id + "\n              and UserProfile.email is null;", function (err, result) {
            if (err) throw err;
            if (result.affectedRows > 0) {
              _this3.con.query("delete from User where User.id=" + user_id, function (err, result) {
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
    value: async function getUsersByType(type) {
      var _this4 = this;

      return new Promise(async function (resolve, reject) {
        try {
          await _this4.con.query("select UserProfile.user,UserProfile.display_name,UserProfile.email " + "from UserProfile inner join User ON User.id = UserProfile.user " + ("where User.type=" + type), function (err, result) {
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
    value: async function updateListOfUsers(users) {
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