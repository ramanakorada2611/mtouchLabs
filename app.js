const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./route/index");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Student Management API",
//       version: "1.0.0",
//       description: "A simple student management API",
//     },
//     servers: [{ url: "http://localhost:3000" }],
//   },
//   apis: ["./route/index.js"],
// };

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "A simple student management API",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Student: {
          type: "object",
          required: [
            "name",
            "age",
            "className",
            "section",
            "rollNumber",
            "photo",
          ],
          properties: {
            name: { type: "string", description: "The name of the student" },
            age: { type: "integer", description: "The age of the student" },
            className: {
              type: "string",
              description: "The class of the student",
            },
            section: {
              type: "string",
              description: "The section of the student",
            },
            rollNumber: {
              type: "integer",
              description: "The roll number of the student",
            },
            photo: {
              type: "string",
              format: "url",
              description: "A URL pointing to the student's photo",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./route/index.js"], // Path to your API routes file
};

const swaggerSep = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSep));

app.use("/api", userRouter);
app.all("*", (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

module.exports = app;
