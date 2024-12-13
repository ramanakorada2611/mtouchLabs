const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "student_detail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          message: "Name must be unique",
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      className: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rollNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "student_detail",
      timestamps: true,
    }
  );
  return User;
};
