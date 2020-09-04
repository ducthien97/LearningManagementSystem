import React, { Fragment } from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import RegisterModal from './auth/register'
import LoginModal from './auth/login'
import Logout from "./auth/logout";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
class AppNavBar extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen : false
        }
    }
    
    static propTypes = {
        auth : PropTypes.object.isRequired
    } 
    
    toggle(){
        this.setState(prevState => {
            return {isOpen: !prevState.isOpen}
        })
    }

    render(){
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <Fragment>
                <span className = 'navbar-text mr-3'>Welcome {user ? user.name : null}</span>
                <NavItem>
                    <Logout></Logout>
                </NavItem>
                <NavItem>
                    <NavLink href = "/newStudentForm">
                        Create Student
                    </NavLink>
                </NavItem>
                
            </Fragment>

        )
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginModal></LoginModal>
                </NavItem>
               
                <NavItem>
                    <RegisterModal></RegisterModal>        
                </NavItem>
            </Fragment>
        )
        return(
        <div>
            <Navbar color ="dark" dark expand ="sm" className = "mb-5" >
                <Container>
                    <NavbarBrand href="/">Learning Management System</NavbarBrand>
                    <NavbarToggler onClick = {this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className = "ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                            <NavItem>
                                <NavLink href = "https://github.com/ducthien97">
                                    GitHub
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>)
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps, null)(AppNavBar)