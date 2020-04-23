// const express = require("express");
// const router = express.Router();
// const auth = require("../../middleware/auth");

// const Course = require("../../models/Course");

// router.get("/", (req,res) => {
//     Course.find()
//     .sort({name: -1})
//     .then(courses => res.json(courses))
// });

// // router.post("/", auth, (req,res) =>{
//     const NewCourse = new Course({
//         name: req.body.name,
//         score: req.body.score,
//         instructor: req.body.instructor
//     });
//     NewCourse.save()
//     .then(course => res.json(course));
// });

// router.delete("/:id", auth, (req, res) => {
//     Course.findById(req.params.id)
//     .then(course => course.remove()
    
//         .then(() => res.json({
//         sucess: "true"
//     })))
//     .catch(err => res.status(404).json({sucess: "false"}))
// })
// module.exports = router;