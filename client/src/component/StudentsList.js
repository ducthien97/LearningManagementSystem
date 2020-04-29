import React from 'react'
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getStudents, deleteStudent} from '../actions/studentActions'

import PropTypes from 'prop-types'

class StudentList extends React.Component{
    componentDidMount(){
        this.props.getStudents()
    }
    static propTypes = {
        getStudents: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onDeleteClick = _id => {
        
        this.props.deleteStudent(_id)
    }
    render(){
        const {students} = this.props.student;
        console.log(students);              
        return(
            <Container>
                <ListGroup>
                

                    <h4>Student List</h4>
                    <TransitionGroup className = "student-list">
                        {students.map(({_id, name, studentID}) => 
                        <CSSTransition key = {_id} timeout = {500} classNames = "fade">
                            <ListGroupItem>
                                
                                <Button className = "remove-btn mr-2"
                                color = 'danger'
                                size = 'sm'
                                onClick = {this.onDeleteClick.bind(this, _id)}>
                                    Remove Student
                                </Button>
                                Student Name: {name}
                                    <br/>

                               <div className = "mt-2">
                                <Button className = "edit-btn mr-2 mb-2"                                
                                color = 'primary'
                                size = 'sm'
                                href = {'/' + _id}>
                                    View Student info
                                </Button>
                                Student ID: {studentID}
                                    <div className = "ml-12" >
                                        <img src = "data:image/jpeg;base64,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"
                                    ></img>
                                    </div>
                               </div>
                                  
                        
                            </ListGroupItem>
                        </CSSTransition>)}
                    </TransitionGroup>

                </ListGroup>
            </Container>
        )
    
    }
}
const mapStatetoProps = (state) => ({
    student :state.student,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {getStudents, deleteStudent})(StudentList);