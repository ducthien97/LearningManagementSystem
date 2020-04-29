import React from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getOneStudent, deleteStudent} from '../actions/studentActions'

import PropTypes from 'prop-types'


class StudentInfo extends React.Component{
    
    componentDidMount(){
        console.log(this.props.match.params.id)
        this.props.getOneStudent(this.props.match.params.id)
    }
    static propTypes = {
        getOneStudent: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onDeleteClick = _id => {
        
        this.props.deleteStudent(_id)
    }
    render(){
        const {students} = this.props.student;
        
        const {courses} = this.props.student.students;
        
        if (courses){
            console.log(courses[0])
        }
        console.log(courses)
        return(
            <Container>
                <TransitionGroup className = "student-info">
                   <CSSTransition  timeout = {500}>
                   <ListGroupItem>
                   
                            Student Name: {students.name}<br/>
                            Student ID: {students.studentID}<br/>
                            Student GPA: {students.semesterGPA}<br/>
                            {courses ? 
                                <div>                          
                                Student Courses: {students.courses.map(({_id,scores,instructor, courseName, courseAverage})=>
                                <ul key= {_id}>
                                    <h6>Course Name: {courseName}</h6>
                                    <li>Instructor: {instructor}</li>
                                    
                                    <li>Course Grades:
                                       <div>
                                       <ul>
                                           {scores.map((n) => 
                                           <li>{n}</li>
                                           )}
                                       </ul>
                                       </div>

                                    </li>
                                    
                                    
                                    <li>Course Average Score: {courseAverage}</li>
                                </ul>

                            )}
                                </div>
                            :
                            null
                            }
                                                
                    </ListGroupItem>  
                   </CSSTransition>
                  
                   
                </TransitionGroup>
            </Container>
        )
    
    }
}
const mapStatetoProps = (state) => ({
    student :state.student,
    
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {getOneStudent, deleteStudent})(StudentInfo);