
class Student {
    constructor(name, id, courses){
        this.name = name;
        var pName = name;
        this.getName = function(){
            return this.pName;
        }
        this.setName = function(n){
            this.pName = n;
        }
        this.id = id;
        this.courses = courses;
        
    }
}
module.exports = Student;