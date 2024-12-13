const express = require("express");
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
} = require("../controllers/user");
const middleware = require("../middleware");

const router = express.Router();

// router.post("/create-student", [middleware.validateUser], createStudent);
// router.put("/update-student", [middleware.jwtVerify], updateStudent);
// router.delete("/delete-student", [middleware.jwtVerify], deleteStudent);
// router.get("/student-list", [middleware.jwtVerify], getStudent);
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - className
 *         - section
 *         - rollNumber
 *         - photo
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the student
 *         age:
 *           type: integer
 *           description: The age of the student
 *         className:
 *           type: string
 *           description: The class of the student
 *         section:
 *           type: string
 *           description: The section of the student
 *         rollNumber:
 *           type: integer
 *           description: The roll number of the student
 *         photo:
 *           type: string
 *           format: url
 *           description: A URL pointing to the student's photo
 *       example:
 *         name: "Korad1"
 *         age: 24
 *         className: "Node.js"
 *         section: "A"
 *         rollNumber: 21
 *         photo: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Best-Nature-Full-HD-Images-For-Desktop.jpg"
 */

/**
 * @swagger
 * /api/student-list:
 *   get:
 *     summary: Retrieve a list of all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 */

/**
 * @swagger
 * /api/create-student:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - className
 *               - section
 *               - rollNumber
 *               - photo
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               className:
 *                 type: string
 *               section:
 *                 type: string
 *               rollNumber:
 *                 type: integer
 *               photo:
 *                 type: string
 *                 format: url
 *             example:
 *               name: "Korad1"
 *               age: 24
 *               className: "Node.js"
 *               section: "A"
 *               rollNumber: 21
 *               photo: "https://www.pixelstalk.net/wp-content/uploads/2016/08/Best-Nature-Full-HD-Images-For-Desktop.jpg"
 *     responses:
 *       201:
 *         description: The student was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid input data.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 */

router.post("/create-student", [middleware.validateUser], createStudent);

/**
 * @swagger
 * /api/update-student:
 *   put:
 *     summary: Update an existing student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was successfully updated.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Student not found.
 */
router.put("/update-student", [middleware.jwtVerify], updateStudent);

/**
 * @swagger
 * /api/delete-student:
 *   delete:
 *     summary: Delete a student by roll number
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: rollNumber
 *         schema:
 *           type: integer
 *         required: true
 *         description: The roll number of the student to delete
 *     responses:
 *       200:
 *         description: The student was successfully deleted.
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 *       404:
 *         description: Student not found.
 */
router.delete("/delete-student", [middleware.jwtVerify], deleteStudent);

/**
 * @swagger
 * /api/student-list:
 *   get:
 *     summary: Retrieve a paginated list of all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of students per page
 *     responses:
 *       200:
 *         description: A paginated list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of students
 *                 page:
 *                   type: integer
 *                   description: The current page number
 *                 limit:
 *                   type: integer
 *                   description: The number of students per page
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized. Token is missing or invalid.
 */

router.get("/student-list", [middleware.jwtVerify], getStudent);

module.exports = router;
