 var Course = require("./Course.js");
 var Student = require('./Student');
 var Faculty = require('./Faculty.js');
 var Express = require("express");
 var BodyParser = require("body-parser");

 var app = Express();
 app.set("view engine", "ejs");
 app.use(BodyParser.urlencoded({ extended: true }));


 var faculty1 = new Faculty("John Smith", "0001", "smith.john@uhd.edu", "3247682172");
 var course1 = new Course("Computer 101", "CS101", 4.0, faculty1);
 var course3 = new Course("Computer 103", "CS103", 2.0, faculty1);
 var course2 = new Course("Computer 102", "CS102", 3.0, faculty1);

 var student = new Student("Tom", "1111", [course1, course2, course3]);
 
 var sumScore = 0;
 console.log(student.name);
 
 student.setName(student.name);
;  
 
 for (var i = 0 ; i < student.courses.length; i++){
     sumScore += student.courses[i].courseGrade;
 }




 app.get("/", function(req,res){
     res.render("index.ejs", {student:student});
 });
 app.listen(5000, function(err){
     console.log("route working");
 })

