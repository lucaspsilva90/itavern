const path = require('path');
//trazendo as info do .env
require('dotenv').config();
module.exports = {
    "development": {
       "username": "lucas1",
       "password": "#Jacare1",
       "database": "itavern",
       "host": "127.0.0.1",
       "dialect": "mysql",
     }
}
// module.exports = {
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: "mysql"
// }
// module.exports = {
//   "development": {
//     "username": "lucas1",
//     "password": "#Jacare1",
//     "database": "itavern",
//     "host": "127.0.0.1",
//     "dialect": "mysql",

//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql",

//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql",

//   }
// }
