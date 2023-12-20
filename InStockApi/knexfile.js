require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    charset: "utf8",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
};
