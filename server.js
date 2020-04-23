 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
 const db = "mongodb+srv://tduongIT:DUCthien97@cluster0-madns.mongodb.net/test?retryWrites=true&w=majority";
 //const courses = require("./routes/api/courses");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth")
const bodyParser = require("body-parser");
const students = require("./routes/api/students");
app.use(bodyParser.json());
 mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true} )
    .then(() => {
        console.log("Database hooked")
    })
    .catch(err => {
        console.log(err);
 })
//app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);
//app.use("/api/courses", courses);
app.use("/api/students", students);
 
 app.listen(5000, function(err){
     console.log("route working");
 })

