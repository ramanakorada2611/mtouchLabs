const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().required("name is required"),
  age: Joi.number().required("age is required"),
  className: Joi.string().required("className is required"),
  rollNumber: Joi.string().required("rollNumber is required"),
  section: Joi.string().required("section is required"),
  photo: Joi.string().optional().allow(null, ""),
});

module.exports = userValidationSchema;
