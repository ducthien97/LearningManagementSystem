const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const CourseSchema = require("./Course.js");
const CourseSchema = new Schema({
    courseName: {
        type: String,
        //required: true
    },
    scores:{
        type: [Number],
        //required: true
    },
    instructor:{
        type: String,
        default: "Staff"
    },
    courseAverage :{
        type: Number,
        
        
    }
})
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    studentID: {
        type: Number,
        required: true,
        unique: true
    },
    courses: [CourseSchema],
    semesterGPA: {
        type: Number
    }
    



})
module.exports = Course = mongoose.model("course", CourseSchema)
module.exports = Student = mongoose.model("student", StudentSchema)