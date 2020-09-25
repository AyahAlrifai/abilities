import express from 'express'
import dataBaseImplem from "./src/js/model/dataBaseImplem"
import * as DatabaseConfig from "./src/js/databaseConfig/config";

const dataBase=new dataBaseImplem(DatabaseConfig.user,DatabaseConfig.password,DatabaseConfig.host,DatabaseConfig.database);
const app = express()
const port = 8080


app.use(express.json())

app.get('/api/user',async (req, res) => {
  var user_id = req.param('id');
  var user=await dataBase.getUserProfile(user_id);
  res.send(user);
});

app.post('/api/user',async (req, res) => {
  var result=await dataBase.createUser(req.body);
  res.send(result);
});

app.delete('/api/user',async (req, res) => {
  var user_id = req.param('id');
  var user=await dataBase.deleteUser(user_id);
  res.send(user);
});

app.get('/api/user/type',async (req, res) => {
  var type = req.param('type');
  var users=await dataBase.getUsersByType(type);
  res.send(users);
});

app.put('/api/user',async (req, res) => {
  var result=await dataBase.updateListOfUsers(req.body);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
