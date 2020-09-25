import Mysql from 'mysql';

export default class dataBaseImplem {

  constructor(user,password,host,database) {
    this.con = Mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
      multipleStatements:true
    });

    this.con.connect((err)=>{
      if (err) throw err;
      console.log("Connected!");
    });
  }

  async getUserProfile(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
          this.con.query(`select UserProfile.user,UserProfile.display_name,UserProfile.email `+
            `from UserProfile inner join User ON User.id = UserProfile.user `+
            `where UserProfile.user=${user_id}`
              ,(err, result)=>{
            if (err){
              throw err;
            } else if(result.length==1) {
              resolve(result);
            } else {
              resolve({"status":"400","message":"user with this id does not exists in database"})
            }
          });
      } catch (err) {
        reject(err);
      }
    });
}

  async createUser(info) {
    return new Promise(async (resolve, reject) => {
      try {
        this.con.query(`INSERT INTO User VALUES (${info.id},'${info.type}');`
            ,async (err, result)=> {
          if (err) throw err;
          if(result.affectedRows>0) {
            this.con.query(`INSERT INTO UserProfile VALUES ('${info.display_name}','${info.email}',${info.id});`
                ,(err, result)=> {
              if (err) throw err;
              resolve({"status":"200OK","message":"user added to database"});
            });
          } else {
            resolve({"status":"400","message":"user with id ${user_id},already exists"});
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteUser(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        this.con.query(`delete from UserProfile where UserProfile.user=${user_id}
              and UserProfile.email is null;`
            ,(err, result)=> {
          if (err) throw err;
          if(result.affectedRows>0) {
            this.con.query(`delete from User where User.id=${user_id}`
                ,(err, result)=> {
              if (err) throw err;
              resolve({"status":"200OK","message":"user deleted from database"});
            });
          } else {
            resolve({"status":"400","message":"user id not found or email is not null"});
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUsersByType(type) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.con.query(`select UserProfile.user,UserProfile.display_name,UserProfile.email `+
          `from UserProfile inner join User ON User.id = UserProfile.user `+
          `where User.type=${type}`
            ,(err, result)=>{
          if (err) throw err;
          if(result.length>0) {
            resolve(result);
          } else {
            resolve({"status":"200","message":"no users with this type in database"})
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateListOfUsers(users) {
    var sql="";
    for(var i=0;i<users.length;i++) {
      sql+=`update UserProfile set display_name="${users[i].display_name}",email="${users[i].email}" where user=${users[i].id};`
    }
    return new Promise(async (resolve, reject) => {
      try {
          await this.con.query(sql,(err, result)=>{
            if (err) throw err;
            resolve({"status":"200OK","message":"Update all users "})
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  
}
