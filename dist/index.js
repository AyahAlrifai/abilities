"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dataBaseImplem = require("./src/js/model/dataBaseImplem");

var _dataBaseImplem2 = _interopRequireDefault(_dataBaseImplem);

var _config = require("./src/js/databaseConfig/config");

var DatabaseConfig = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataBase = new _dataBaseImplem2.default(DatabaseConfig.user, DatabaseConfig.password, DatabaseConfig.host, DatabaseConfig.database);
var app = (0, _express2.default)();
var port = 8080;

app.use(_express2.default.json());

app.get('/api/user', async function (req, res) {
  var user_id = req.param('id');
  var user = await dataBase.getUserProfile(user_id);
  res.send(user);
});

app.post('/api/user', async function (req, res) {
  var result = await dataBase.createUser(req.body);
  res.send(result);
});

app.delete('/api/user', async function (req, res) {
  var user_id = req.param('id');
  var user = await dataBase.deleteUser(user_id);
  res.send(user);
});

app.get('/api/user/type', async function (req, res) {
  var type = req.param('type');
  var users = await dataBase.getUsersByType(type);
  res.send(users);
});

app.put('/api/user', async function (req, res) {
  var result = await dataBase.updateListOfUsers(req.body);
  res.send(result);
});

app.listen(port, function () {
  console.log("Example app listening at http://localhost:" + port);
});