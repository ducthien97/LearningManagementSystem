import React, {Component} from 'react'
import {
    Alert, Button, Modal, ModalHeader,NavLink, ModalBody, Form,FormGroup, Label,Input, Nav
} from 'reactstrap';
import{connect} from 'react-redux';
import {register} from '../../actions/authActions';
import  {clearError} from '../../actions/errorActions' 
import PropTypes from 'prop-types';




class RegisterModal extends Component {
    state = {
        modal : false,
        name: '',
        email: '',
        password: '',
        msg : null
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        const{error, isAuthenticated} = this.props;
        if (error !=prevProps.error){
            if (error.id  == 'REGISTER_FAIL'){
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
        const {name, email , password} = this.state;
        //Create user
        const newUser = {
            name, email, password
        }
        this.props.register(newUser);

        
        
    }


    render (){
        return (
            <div>
                <NavLink onClick = {this.toggle} href = '#'>Register</NavLink>
                <Modal
                    isOpen = {this.state.modal}
                    toggle = {this.toggle}
                >

                    <ModalHeader toggle = {this.toggle}>Register New User</ModalHeader>
                        <ModalBody>
                        {this.state.msg ?
                         (<Alert color= 'danger'>{this.state.msg}</Alert>)
                          : null}
                            <Form onSubmit = {this.onSubmit}>
                                <FormGroup>

                                    <Label for = "name">Name</Label>
                                    <Input
                                       type = "text"
                                       name = "name"
                                       id = "name"
                                       placeholder = "Name"
                                       onChange ={this.onChange}
                                       className = "mb-3"
                                    ></Input>

                                    <Label for = "email">Email</Label>
                                    <Input
                                       type = "text"
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
                                <Button color="success" type = "submit">Enter Item</Button>
                            </Form>
                            <p>*must log in to register a new administrator</p>
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



export default connect(mapStateToProps, {register, clearError})(RegisterModal);