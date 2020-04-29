import React, {Component, Fragment} from 'react'
import {
    Alert, Button, Modal, ModalHeader,NavLink, ModalBody, Form,FormGroup, Label,Input, Nav, NavItem
} from 'reactstrap';
import{connect} from 'react-redux';
import {login} from '../../actions/authActions';
import  {clearError} from '../../actions/errorActions' 
import PropTypes from 'prop-types';
import Logout from './logout';




class LoginModal extends Component {
    state = {
        modal : false,
        email: '',
        password: '',
        msg : null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const{error, isAuthenticated} = this.props;
        if (error !=prevProps.error){
            if (error.id  === 'LOGIN_FAIL'){
                this.setState({
                    msg: error.msg.msg
                })
            }else {
                this.setState({msg: null})
            }
        }
        if (this.state.modal){
            if (isAuthenticated){
                this.toggle();
            }
        }
    
    }

    toggle = () => {
        this.props.clearError();
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    onSubmit = (event) => {
        event.preventDefault();
        const {email,password} = this.state;
        const user = {
            email,password
        } 
        this.props.login(user);
        
        
    }


    render (){
       
        
        return (
            <div>
                <NavLink onClick = {this.toggle} href = '#'>Log In</NavLink>
                <Modal
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >

                    <ModalHeader toggle = {this.toggle}>Log In</ModalHeader>
                        <ModalBody>
                        {this.state.msg ?
                         (<Alert color= 'danger'>{this.state.msg}</Alert>)
                          : null}
                            <Form onSubmit = {this.onSubmit}>
                                <FormGroup>
                                    <Label for = "email">Email</Label>
                                    <Input
                                       type = "email"
                                       name = "email"
                                       id = "email"
                                       placeholder = "Email Address"
                                       onChange ={this.onChange}
                                       className = "mb-3"

                                    ></Input>

                                    <Label for = "password">Password</Label>
                                    <Input
                                       type = "password"
                                       name = "password"
                                       id = "password"
                                       placeholder = "password"
                                       onChange ={this.onChange}
                                       className = "mb-3"

                                    ></Input>
                                </FormGroup>
                                <Button color="success" type = "submit">Log In</Button>
                            </Form>
                        </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    error: state.error,
    auth: state.auth
})



export default connect(mapStateToProps, {login, clearError})(LoginModal);