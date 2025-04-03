const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Department = require("../models/departmentModel");
const Subject = require("../models/subjectModel");

// @desc    Create a new student
// @route   POST /api/students
// @access  Private (Admin/Authorized users)
const createStudent = asyncHandler(async (req, res) => {
    const { name, email, department, rollno, semester, subjects } = req.body;

    if (!name || !email || !department || !rollno || !semester) {
        res.status(400);
        throw new Error("All required fields must be provided.");
    }

    // Check if department   exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
        res.status(400);
        throw new Error("Invalid department ID.");
    }
    let subjectsArray;
    if(!Array.isArray(subjects))
    subjectsArray=subjects.split(' ')
    else
    subjectsArray=subjects;
    //console.log(subjectsArray);
    //res.json({message:"sucess"});
    // Validate subjects if provided
    
    for(let i=0;i<subjectsArray.length;i++){
      const subjectValid=await Subject.findById(subjectsArray[i]);
      if(!subjectValid){
        res.status(400);
        throw new Error("One of the subjects dont exist");
      }
    }

    // Check if roll number already exists
    const existingStudent = await Student.findOne({ rollno });
    if (existingStudent) {
        res.status(400);
        throw new Error("Roll number already exists.");
    }

    const student = await Student.create({ name, email, department, rollno, semester, subjects:subjectsArray });

    res.status(201).json({ message: "Student created successfully", student });
});

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find()
        .populate("department", "name")
        .populate("subjects", "name subjectCode");

    res.status(200).json(students);
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id)
        .populate("department", "name")
        .populate("subjects", "name subjectCode");

    if (!student) {
        res.status(404);
        throw new Error("Student not found.");
    }

    res.status(200).json(student);
});

// @desc    Update student details
// @route   PUT /api/students/:id
// @access  Private (Admin/Authorized users)
const updateStudent = asyncHandler(async (req, res) => {
    const { name, department, rollno, semester, subjects } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
        res.status(404);
        throw new Error("Student not found.");
    }

    // Validate department if provided
    if (department) {
        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            res.status(400);
            throw new Error("Invalid department ID.");
        }
        student.department = department;
    }

    // Validate subjects if provided
    let subjectsArray;
    if(!Array.isArray(subjects))
    subjectsArray=subjects.split(' ')
    else
    subjectsArray=subjects;
    for(let i=0;i<subjectsArray.length;i++){
      const subjectValid=await Subject.findById(subjectsArray[i]);
      if(!subjectValid){
        res.status(400);
        throw new Error("One of the subjects dont exist");
      }
    }

    student.name = name || student.name;
    student.rollno = rollno || student.rollno;
    student.semester = semester || student.semester;
    student.subjects=subjectsArray;
    const updatedStudent = await student.save();
    res.status(200).json({ message: "Student updated successfully", updatedStudent });
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Admin/Authorized users)
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        res.status(404);
        throw new Error("Student not found.");
    }

    await student.deleteOne();
    res.status(200).json({ message: "Student deleted successfully." });
});


// @desc Import students from Excel file
// @route POST /api/students/importExcel
const importStudentsFromExcel = asyncHandler(async (req, res) => {
  if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded.");
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(req.file.buffer);
  const worksheet = workbook.worksheets[0];
  //console.log(worksheet);
  const students = [];
  worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      let [name, department, rollno, semester] = row.values.slice(1);

      if (!name || !department || !rollno || !semester) {
          res.status(400);
          throw new Error(`Missing required fields at row ${rowNumber}`);
      }

      students.push({
          name,
          department: department, // Convert to ObjectId
          rollno: rollno.toString(),
          semester: parseInt(semester),
      });
  });

  await Student.insertMany(students);

  res.status(201).json({ message: "Students imported successfully", students });
});

const studentCountHandler = asyncHandler(async (req,res) => {
    const count = await Student.countDocuments({});
    return res.status(200).json({count});
});


module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  importStudentsFromExcel,
  studentCountHandler
};
