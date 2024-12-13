const { Sequelize } = require("sequelize");
const User = require("./user");
const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

db.sequelize = sequelize;
db.User = User(sequelize, Sequelize);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("The database is connected");
  })
  .catch((error) => {
    console.error("Error syncing the model:", error);
  });

module.exports = db;
