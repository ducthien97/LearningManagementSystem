import React from 'react'
import {Container, ListGroup, ListGroupItem, Button, FormGroup, Form, Input, Label} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {addStudent, deleteStudent} from '../actions/studentActions'

import PropTypes from 'prop-types'


class NewStudentForm extends React.Component{
    
    // componentDidMount(){
    //     console.log(this.props.match.params.id)
    //     this.props.getOneStudent(this.props.match.params.id)
    // }
    state = {
        name: '',
        studentID: '',
        
        msg : null,
        courses : [{
            scores : [0]
        }]
        
    }
    static propTypes = {
        addStudent: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onSubmit = (event) => {
        event.preventDefault();
        
        const {name,studentID,courses} = this.state;
        const student = {
            name, studentID, courses
        } 
        this.props.addStudent(student);
        }

    onChange = (event) => {
            this.setState({[event.target.name] : event.target.value})
    }

    
    render(){                            
        
        return(
            <Container>
                <div className = "form-group">
                    <Form onSubmit = {this.onSubmit}>
                        <FormGroup>
                            <Label for = "name">Email</Label>
                            <Input
                                name = "name"
                                id = "name"
                                placeholder = "Student Name"
                                className = "mb-7"
                                onChange = {this.onChange}
                                >
                            </Input>
                            
                            <Label className = "" for = "studentID">Student ID </Label>
                            <Input
                                name = "studentID"
                                id = "studentID"
                                placeholder = "Student ID"
                                className = "mb-7"
                                onChange = {this.onChange}
                            ></Input>
                            
                            
                        </FormGroup>
                        <Button color = "success" type = "submit">Submit</Button>
                    </Form>

                </div>  
           </Container>
        )
    
    }
}
const mapStatetoProps = (state) => ({
    student :state.student,
    error : state.error,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {addStudent})(NewStudentForm);