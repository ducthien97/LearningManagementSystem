const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const Course = require("../../models/Student");
//Get all Student
router.get("/", (req,res) => {
    Student.find()
    .sort({name: -1})
    .then(students => res.json(students))
});

//Show one student
router.get("/:id", (req,res) => {
    Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(404).json({
        success: false
    }))
});

//New Student Route
 router.post("/", auth, (req,res) =>{
    const NewStudent = new Student(req.body);
    //console.log(NewStudent.courses[0])
    var sumCourses = 0
    var courses = [...(NewStudent.courses)]
    for (var j = 0; j < NewStudent.courses.length; j++){
        var scores = [...(NewStudent.courses[j].scores)];
        var sum = 0;
        //console.log(scores)
            for (var i = 0; i < scores.length; i++){
                sum += scores[i];
            }
        //console.log("sum: " + sum)
        var average = sum / scores.length
        //console.log("average:" + average)
        NewStudent.courses[j].courseAverage = (average.toFixed(2))
        //console.log(NewStudent.courses[j].courseAverage)
        
        sumCourses += (NewStudent.courses[j].courseAverage)

    }
    console.log(sumCourses);
    var gpa = ((sumCourses / courses.length).toFixed(2))
    NewStudent.semesterGPA = (((gpa/100) * 4).toFixed(2))
    console.log(NewStudent)
    NewStudent.save()
    .then(student => res.json(student));
    
});

//New Course Route
router.post("/:id", (req,res) => {
    var newCourse = {
        courseName : req.body.courseName,
        scores: req.body.scores,
        instructor: req.body.instructor
    }
    Student.findById(req.params.id, function(err, student){
        student.courses.push(newCourse)
        student.save()
        res.json(student)

    })
})
// //Edit Course Route
// router.put("/:id/:course_id", (req,res) => {
//     var newCourse = {
//         courseName : req.body.courseName,
//         scores: req.body.scores,
//         instructor: req.body.instructor
//     }
//     Student.findOne(req.params.id,(err, student) => {
//         if (err){
//             res.status(500).json({msg: "Fail to find student"})
//         }
//         else{
//             Student.findByIdAndUpdate(req.params.course_id, {set: $newCourse}, function(err, course){
//                 if (err){
//                     res.status(500).json({status: "failed to update"})
//                 }
//                 else{
//                     res.json(course);
//                     res.json({status: "course updated"})
//                 }
//             })
//         }

//     })


    
// })











//Edit Student Route
router.put("/:id", (req,res) => {
    
    var newData = req.body
    var sumCourses = 0
    var courses = [...(newData.courses)]
    for (var j = 0; j < newData.courses.length; j++){
        var scores = [...(newData.courses[j].scores)];
        var sum = 0;
                        //console.log(scores)
            for (var i = 0; i < scores.length; i++){
                sum += scores[i];
        }
                        //console.log("sum: " + sum)
        var average = (sum / scores.length)
                        //console.log("average:" + average)
        newData.courses[j].courseAverage = Math.round(average.toFixed(2)) ;                       //console.log(NewStudent.courses[j].courseAverage)
                        
        sumCourses += (newData.courses[j].courseAverage)

    }
                    //console.log(sumCourses);
    var gpa = (sumCourses / courses.length)
    newData.semesterGPA = ((gpa/100) * 4) 
    Student.findOneAndUpdate(req.params.id, {$set: newData}, function(err, student){
        if (err){
            res.status(500).json({err: err})
            
        } else {
            
            
            res.json({update: "Success"})
        }
    });

})




//Delete Student Route
router.delete("/:id", auth, (req, res) => {
    Student.findById(req.params.id)
    .then(student => student.remove()
        .then(() => res.json({success: true})))
    .catch((err) =>  res.status(404).json({success: false}))
})







module.exports = router;