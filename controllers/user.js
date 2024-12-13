const { User } = require("../model/index");
const db = require("../model/index");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const haversine = require("haversine");
const { Op, where } = require("sequelize");
// const validateUser = require("../validation");
const moment = require("moment");
const { message } = require("../validation");
exports.createStudent = async (req, res) => {
  try {
    const { name, age, className, section, rollNumber, photo } = req.body;

    const token = jwt.sign(
      { name, age, className, section, rollNumber },
      process.env.SECRET_KEY
    );
    // console.log("token", token);
    // const encrypted = await bcrypt.hash(password, 10);
    // console.log(encrypted, "encrypted");
    const data = await User.create({
      name: name.trim(),
      age,
      className,
      section,
      rollNumber,
      photo,
    });
    req.res.status(201).json({
      success_code: "201",
      message: "The student has created successfully!",
      data: data,
      token,
    });
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { name, age, className, section, rollNumber, photo } = req.body;

    const id = req.body.id * 1;
    // console.log(id);
    const findStudentId = await User.findOne({ where: { id: id } });
    // console.log("findStudentId", findStudentId);
    if (!findStudentId) {
      return res.status(400).json({
        success_code: "400",
        message: "Invalid student id",
      });
    }
    const user = await User.update(
      {
        name: name,
        age: age,
        className: className,
        section: section,
        rollNumber: rollNumber,
        photo: photo,
      },
      {
        where: { id: findStudentId.id },
      }
    );
    res.status(200).json({
      success_code: "200",
      message: "student data has updated successfully!",
      data: user,
    });
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    // const query = `SELECT * FROM student_detail where limit ${limit} offset ${
    //   (page - 1) * limit
    // };`;

    // const data = await db.sequelize.query(query, {
    //   type: db.sequelize.QueryTypes.SELECT,
    // });

    const data = await User.findAll({
      offset: (page - 1) * limit,
      limit: limit,
    });
    res.status(200).json({
      success: true,
      message: "The student data has been feteched successfully",
      data,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.body.id * 1;
    console.log(id);
    const findStudentId = await User.findOne({ where: { id: id } });
    // console.log("findStudentId", findStudentId);
    if (!findStudentId) {
      return res.status(400).json({
        success_code: "400",
        message: "Invalid student id",
      });
    }
    const data = await User.destroy({ where: { id: findStudentId.id } });

    res.status(200).json({
      success_code: "200",
      message: "The student data has been deleted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success_code: "500",
      message: "Internal Server Error",
    });
  }
};
