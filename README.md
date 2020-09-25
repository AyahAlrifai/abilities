what tools you need to run it:

1-nodejs

2-npm

3-mysql
////////////////////////////////////////////////////////////////////////////////////////
to run API in local machine:

1-in CMD >> mysql -u userName -p databaseName < ./database/database.26.2ep.2020.sql

2- update ./src/js/databaseConfig/config.js  data with your data

3-in CMD >> npm run start
/////////////////////////////////////////////////////////////////////////////////////////
how to use API:

1-get user profile by user id

URL >> GET localhost:8081/api/user?id=user_id
result >> {
  "id":user_id,
  "type":"ADMIN" OR "NORMAL",
  "display_name":user_name,
  "email":user_email
}
_______________________________________________________________________________________________
2-create user

URL >> POST localhost:8081/api/user
        body {
          "id":user_id,
          "type":"ADMIN" OR "NORMAL",
          "display_name":user_name,
          "email":user_email
        }
__________________________________________________________________________________________________
3-delete user by user name

URL >> DELETE localhost:8081/api/user?id=user_id
____________________________________________________________________________________________________
4-get users by type

URL >> GET localhost:8081/api/user/type?type=type

result >>[{
  "id":user_id,
  "type":"ADMIN" OR "NORMAL",
  "display_name":user_name,
  "email":user_email
},......]
____________________________________________________________________________________________________
5-update list of users
URL >> PUT localhost:8081/api/user
        body [{
          "id":user_id,
          "type":"ADMIN" OR "NORMAL",
          "display_name":user_name,
          "email":user_email
        },....]
